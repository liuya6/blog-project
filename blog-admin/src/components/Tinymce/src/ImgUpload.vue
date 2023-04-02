<template>
  <div :class="[prefixCls, { fullscreen }]">
    <Upload
      name="file"
      multiple
      @change="handleChange"
      :customRequest="customRequest"
      :showUploadList="false"
      accept=".jpg,.jpeg,.gif,.png,.webp"
    >
      <a-button type="primary" v-bind="{ ...getButtonProps }">
        {{ t('component.upload.imgUpload') }}
      </a-button>
    </Upload>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';

  import { Upload } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { alioss } from '/@/utils/alioss';

  export default defineComponent({
    name: 'TinymceImageUpload',
    components: { Upload },
    props: {
      fullscreen: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      filePath: {
        type: String,
        default: '',
      },
    },
    emits: ['uploading', 'done', 'error'],
    setup(props, { emit, attrs }) {
      const getProps = computed(() => {
        return { ...props, ...attrs };
      });

      let uploading = false;

      const { t } = useI18n();
      const { prefixCls } = useDesign('tinymce-img-upload');

      const getButtonProps = computed(() => {
        const { disabled } = props;
        return {
          disabled,
        };
      });

      function handleChange(info: Recordable) {
        const file = info.file;
        const status = file?.status;
        const url = file?.response?.url;
        const name = file?.name;

        if (status === 'uploading') {
          if (!uploading) {
            emit('uploading', name);
            uploading = true;
          }
        } else if (status === 'done') {
          emit('done', name, url);
          uploading = false;
        } else if (status === 'error') {
          emit('error');
          uploading = false;
        }
      }

      const customRequest = async (value: any) => {
        let url = await alioss.postFile(value.file, () => {}, unref(getProps).filePath);
        emit('done', value.file.name, url);
        uploading = false;
      };

      return {
        prefixCls,
        handleChange,
        t,
        getButtonProps,
        customRequest,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-tinymce-img-upload';

  .@{prefix-cls} {
    position: absolute;
    top: 4px;
    right: 10px;
    z-index: 20;

    &.fullscreen {
      position: fixed;
      z-index: 10000;
    }
  }
</style>
