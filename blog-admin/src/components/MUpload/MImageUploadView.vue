<template>
  <div class="clearfix">
    <upload
      list-type="picture-card"
      :accept="accept"
      :file-list="fileList"
      :customRequest="customRequest"
      @preview="handlePreview"
      @remove="handleRemove"
      @change="handleChange"
    >
      <div>
        <loading-outlined v-if="loading" />
        <plus-outlined v-else />
        <div class="ant-upload-text">上传</div>
      </div>
    </upload>
    <Modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </Modal>
  </div>
</template>
<script lang="ts">
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref, watch, unref, computed } from 'vue';
  import { Modal, Upload } from 'ant-design-vue';
  import { FileItem, formatFileBeanList, formatFileList } from './UploadControl';
  import { alioss } from '/@/utils/alioss';

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  export default defineComponent({
    components: {
      PlusOutlined,
      Upload,
      Modal,
      LoadingOutlined,
    },
    props: {
      accept: {
        type: String,
        default: 'image/*',
      },
      limit: {
        type: Number,
        default: 1,
      },
      value: {
        type: String,
        default: '',
      },
      filePath: {
        type: String,
        default: '',
      },
    },
    emits: ['change'],
    setup(props, { emit, attrs }) {
      const loading = ref(false);
      const { fileList } = formatFileBeanList(props);

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

      const previewVisible = ref<boolean>(false);
      const previewImage = ref<string | undefined>('');
      const handleCancel = () => {
        previewVisible.value = false;
      };
      const handlePreview = async (file: FileItem) => {
        if (!file.url && !file.preview) {
          file.preview = (await getBase64(file.originFileObj)) as string;
        }
        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
      };

      const handleRemove = (file: any) => {
        let choseIndex = 0;
        fileList.value.forEach((item: any, index: any) => {
          if (item.uid == file.uid) {
            choseIndex = index;
          }
        });
        fileList.value.splice(choseIndex, 1);
        emit('change', formatFileList(fileList.value));
      };

      const handleChange = () => {
        if ('limit' in unref(getProps) && fileList.value.length >= unref(getProps).limit) {
          fileList.value.shift();
        }
      };

      //自定义上传数据
      const customRequest = async (value: any) => {
        loading.value = true;
        let url = await alioss.postFile(value.file, process, unref(getProps).filePath);
        value.onSuccess();
        fileList.value.push({ url: url, uid: value.uid });
        emit('change', formatFileList(fileList.value));
        loading.value = false;
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
        customRequest,
        previewVisible,
        previewImage,
        fileList,
        handleCancel,
        handlePreview,
        handleChange,
        loading,
      };
    },
  });
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
