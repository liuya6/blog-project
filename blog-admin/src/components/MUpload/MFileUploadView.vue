<template>
  <upload
    name="file"
    v-model:file-list="fileList"
    :accept="accept"
    :multiple="multiple"
    :customRequest="customRequest"
    @remove="handleRemove"
  >
    <a-button>
      <upload-outlined />
      点击上传
    </a-button>
  </upload>
</template>
<script lang="ts">
  import { defineComponent, unref, watch, computed } from 'vue';

  import { Upload } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { fileRemove, fileUpload, formatFileBeanList } from './UploadControl';

  export default defineComponent({
    name: 'MFileUploadView',
    components: {
      UploadOutlined,
      Upload,
    },
    props: {
      accept: {
        type: String,
        default: '.apk',
      },
      value: {
        type: String,
        default: '',
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      filePath: {
        type: String,
        default: '',
      },
    },
    emits: ['change'],
    setup(props, { emit, attrs }) {
      let fileList = formatFileBeanList(props).fileList;

      const getProps = computed(() => {
        return { ...props, ...attrs };
      });

      watch(
        () => props,
        () => {
          fileList.value = unref(formatFileBeanList(props).fileList);
        },
        {
          deep: true,
        },
      );

      //移除监听
      const handleRemove = (file: any) => {
        fileRemove(file, emit, fileBeanList);
      };

      let fileBeanList: any[] = [];
      //自定义上传
      const customRequest = async (value: any) => {
        await fileUpload(
          value,
          emit,
          fileBeanList,
          fileList,
          props.accept,
          unref(getProps).filePath,
          process,
        );
      };

      function process(value: number) {
        fileList.value.map((item: any) => {
          if (item.status === 'uploading') {
            item.percent = value;
          }
        });
      }

      return {
        handleRemove,
        customRequest, //自定义上传
        fileList,
      };
    },
  });
</script>
