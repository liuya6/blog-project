<script lang="tsx">
  import { defineComponent } from 'vue';

  import { useModal } from '/@/components/Modal';
  import { MTextTip } from '/@/components/MTips';

  import VideoModal from './VideoModal.vue';

  export default defineComponent({
    props: {
      src: {
        type: String,
      },
    },
    setup(props) {
      const [register, { openModal }] = useModal();

      return () => (
        <div class="mVideo">
          <MTextTip
            isLink
            text={props.src}
            onClick={() => {
              openModal();
            }}
          />
          <VideoModal onRegister={register} src={props.src} />
        </div>
      );
    },
  });
</script>
