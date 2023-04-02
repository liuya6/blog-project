<script lang="tsx">
  import { defineComponent, ref, unref, nextTick } from 'vue';

  import { BasicTree, TreeActionType } from '/@/components/Tree';
  import { difference } from 'lodash-es';

  import { permissionService } from '/@/api';
  import { RouterItem } from '/@/router/types';
  import { parseTreeData } from '/@/utils/tools';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    components: {
      BasicTree,
    },
    props: {
      defaultValue: Array,
    },
    emits: ['change'],
    setup(props, { emit }) {
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const routeList = ref<Partial<RouterItem[]>>([]);
      const treeLoading = ref(true);
      const { t } = useI18n();

      getAllRoute();

      return () => (
        <div class="treeBox">
          <BasicTree
            ref={treeRef}
            loading={treeLoading.value}
            treeData={unref(routeList) as any}
            checkable={true}
            showLine={true}
            halfChoice={true}
            onCheck={treeCheck}
          />
        </div>
      );

      function treeCheck() {
        emit('change', {
          checkKeys: getTree().getCheckedKeys(),
          halfCheckedKeys: getTree().getHalfCheckedKeys(),
        });
      }

      async function getAllRoute() {
        if (!routeList.value.length) {
          const { data } = await permissionService.getMenuList();
          routeList.value = parseTreeData(data, t);
          treeLoading.value = false;
        }
        nextTick(() => {
          setDefaultValue();
        });
      }

      function setDefaultValue() {
        const parentKeys = getParentKey(routeList.value);
        const defaultList = props.defaultValue
          ? props.defaultValue.map((item) => Number(item))
          : [];
        const result = difference(defaultList, parentKeys);
        if (result && result.length) {
          getTree().setCheckedKeys(result);
          getTree().expandAll(true);
        }
      }

      function getParentKey(routes: Partial<RouterItem[]>, arr: any[] = []) {
        routes.forEach((item: RouterItem) => {
          if (item && item.children && item.children.length) {
            arr.push(item.key);
            getParentKey(item.children, arr);
          }
        });
        return arr;
      }

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }
    },
  });
</script>

<style scoped lang="less">
  .treeBox {
    min-height: 150px;
  }
</style>
