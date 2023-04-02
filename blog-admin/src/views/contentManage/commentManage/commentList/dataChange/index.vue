<script lang="tsx">
  import { defineComponent, nextTick, computed } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';

  import { schemas } from './config';
  import { contentService } from '/@/api';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ResultEnum } from '/@/enums/httpEnum';

  export default defineComponent({
    components: {
      BasicModal,
    },
    props: {
      isEdit: Boolean,
      reload: Function,
    },
    setup(props, { attrs }) {
      let editData: any = {};
      const { createMessage } = useMessage();
      const isEdit = computed(() => {
        return props.isEdit;
      });
      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: schemas(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });
      const [register, { closeModal }] = useModalInner((data) => {
        onDataReceive(data);
      });

      return () => (
        <div>
          <BasicModal
            {...attrs}
            onRegister={register}
            title={isEdit.value ? '编辑视频' : '新增视频'}
            onOk={onOk}
            onVisibleChange={handleVisibleChange}
          >
            <div>
              <BasicForm onRegister={registerForm} />
            </div>
          </BasicModal>
        </div>
      );

      async function onOk() {
        try {
          const result = await validate();
          result.dostatus = result.dostatus ? 0 : 1;
          // let fn = contentService.contentVideoEdit;
          // if (isEdit.value) {
          //   fn = contentService.contentVideoEdit;
          //   result.id = editData.id;
          // }
          // const data = await fn(result);
          result.id = editData.id;
          const data = await contentService.contentVideoEdit(result);
          if (data.code === ResultEnum.SUCCESS) {
            // createMessage.success(isEdit.value ? '编辑成功' : '创建成功');
            createMessage.success('编辑成功');
            props.reload && props.reload();
          }
          closeModal();
        } catch (e) {
          console.warn(e);
        }
      }

      function onDataReceive(data) {
        const result = data ? data : {};
        const schemasList = schemas();
        const fieldList = schemasList.map((item: FormSchema) => item.field);
        const obj = {};
        for (const fieldListKey in result) {
          if (fieldList.includes(fieldListKey)) {
            if (fieldListKey === 'dostatus') {
              obj[fieldListKey] = result[fieldListKey] * 1 === 0;
            } else {
              obj[fieldListKey] = result[fieldListKey];
            }
          }
        }
        setFieldsValue(obj);
        editData = result;
      }

      function handleVisibleChange(v) {
        !v && nextTick(() => resetFields());
      }
    },
  });
</script>

<style scoped lang="less"></style>
