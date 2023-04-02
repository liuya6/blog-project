<script lang="tsx">
  import { defineComponent, ref, unref, nextTick } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  export default defineComponent({
    components: { BasicModal },
    props: {
      src: {
        type: String,
      },
    },
    setup(props, { attrs }) {
      const modalRef = ref(null);
      const videoRef = ref(null);
      const initWidth = ref(520);

      return () => (
        <BasicModal
          {...attrs}
          width={unref(initWidth)}
          title="视频预览"
          onVisibleChange={handleVisibleChange}
          ref={modalRef}
        >
          <div class="videoBox">
            <video
              ref={videoRef}
              class="myVideo"
              src={props.src}
              controls
              onCanplay={canplay}
            ></video>
          </div>
        </BasicModal>
      );

      function canplay() {
        if (unref(modalRef)) {
          nextTick(() => {
            const videoWidth = (unref(videoRef) as any).offsetWidth;
            if (videoWidth && videoWidth < 520 - 28) {
              initWidth.value = videoWidth + 50;
            }
            (unref(modalRef) as any).resetModalHeight();
          });
        }
      }

      function handleVisibleChange(v) {
        if (!v && videoRef.value) {
          (videoRef.value as any).pause();
        }
      }
    },
  });
</script>

<style lang="less">
  .videoBox {
    display: flex;
    justify-content: center;
  }

  .myVideo {
    max-height: 500px !important;
  }
</style>
