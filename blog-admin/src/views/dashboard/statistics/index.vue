<script lang="tsx">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    setup() {
      return () => (
        <PageWrapper>
          <div>数据总览</div>
        </PageWrapper>
      );
    },
  });
</script>
