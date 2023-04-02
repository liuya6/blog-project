<template>
  <span class="thumb">
    <img v-if="fileUrl" :src="fileUrl" width="50" />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    props: {
      fileUrl: propTypes.string.def(''),
      fileName: propTypes.string.def(''),
    },
  });
</script>
<style lang="less">
  .thumb {
    display: flex;
    justify-content: center;
  }
</style>
