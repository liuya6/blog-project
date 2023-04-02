<template>
  <Select
    @dropdown-visible-change="handleFetch"
    v-bind="$attrs"
    @change="handleChange"
    :options="getOptions"
    v-model:value="state"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
    </template>
  </Select>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, watchEffect, computed, unref, watch } from 'vue';
  import { Select } from 'ant-design-vue';
  import { isFunction } from '/@/utils/is';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { get, omit } from 'lodash-es';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { propTypes } from '/@/utils/propTypes';
  import { useDebounceFn } from '@vueuse/core';

  type OptionsItem = { label: string; value: string; disabled?: boolean };

  export default defineComponent({
    name: 'ApiSelect',
    components: {
      Select,
      LoadingOutlined,
    },
    inheritAttrs: false,
    props: {
      value: [Array, Object, String, Number],
      numberToString: propTypes.bool,
      api: {
        type: Function as PropType<(arg?: Recordable) => Promise<OptionsItem[]>>,
        default: null,
      },
      // api params
      params: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      // support xxx.xxx.xx
      resultField: propTypes.string.def(''),
      labelField: propTypes.string.def('label'),
      valueField: propTypes.string.def('value'),
      immediate: propTypes.bool.def(true),
      alwaysLoad: propTypes.bool.def(false),
    },
    emits: ['options-change', 'change'],
    setup(props, { emit }) {
      const options = ref<OptionsItem[]>([]);
      const loading = ref(false);
      const isFirstLoad = ref(true);
      const emitData = ref<any[]>([]);
      const attrs = useAttrs();
      const { t } = useI18n();

      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);

      const getOptions = computed(() => {
        const { labelField, valueField, numberToString } = props;

        return unref(options).reduce((prev, next: Recordable) => {
          if (next) {
            const value = next[valueField];
            prev.push({
              ...omit(next, [labelField, valueField]),
              label: next[labelField],
              value: numberToString ? `${value}` : value,
            });
          }
          return prev;
        }, [] as OptionsItem[]);
      });

      const debounceFetch = useDebounceFn(fetch, 300);

      watchEffect(() => {
        props.immediate && !props.alwaysLoad && debounceFetch();
      });

      watch(
        () => props.params,
        () => {
          !unref(isFirstLoad) && debounceFetch();
        },
        { deep: true },
      );

      async function fetch() {
        const api = props.api;
        if (!api || !isFunction(api)) return;
        options.value = [];
        try {
          loading.value = true;
          const res = await api(props.params);
          isFirstLoad.value = false;
          if (Array.isArray(res)) {
            options.value = res;
            emitChange();
            return;
          }
          if (props.resultField) {
            const result: Recordable = get(res, props.resultField);
            if (result.data) {
              options.value = get(result, props.resultField) || [];
            } else {
              options.value = get(res, props.resultField) || [];
            }
          }
          emitChange();
        } catch (error) {
          console.warn(error);
        } finally {
          loading.value = false;
        }
      }

      async function handleFetch(visible) {
        if (visible) {
          if (props.alwaysLoad) {
            await fetch();
          } else if (!props.immediate && unref(isFirstLoad)) {
            await fetch();
            isFirstLoad.value = false;
          }
        }
      }

      function emitChange() {
        emit('options-change', unref(getOptions));
      }

      function handleChange(_, ...args) {
        emitData.value = args;
      }

      return { state, attrs, getOptions, loading, t, handleFetch, handleChange };
    },
  });
</script>
