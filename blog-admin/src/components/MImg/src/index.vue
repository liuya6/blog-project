<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Image } from 'ant-design-vue';

  import { TableDataTips } from '/@/components/MTips';

  const PreviewGroup = Image.PreviewGroup;

  export default defineComponent({
    components: {
      PreviewGroup,
    },
    props: {
      imgData: {
        type: [String, Array],
      },
      text: {
        type: String,
      },
    },
    setup(props) {
      if (!props.imgData) {
        console.warn('图片地址为空');
      }
      const imgList: any[] = props.imgData
        ? typeof props.imgData === 'string'
          ? [props.imgData]
          : props.imgData
        : ['x'];

      return () => (
        <div
          {...{
            class: {
              imgBox: true,
              notText: !props.text,
            },
            on: {
              click: (e: Event) => {
                e.stopPropagation();
              },
            },
          }}
        >
          <div class="left">
            <PreviewGroup>
              {imgList.map((item: any) => (
                <Image width={22} src={item} />
              ))}
            </PreviewGroup>
          </div>
          {props.text ? <TableDataTips text={props.text} placeholderWidth={22} /> : null}
        </div>
      );
    },
  });
</script>

<style scoped lang="less">
  .imgBox {
    line-height: 22px;
    &.notText {
      .left {
        float: inherit;
      }
    }
    .left {
      height: 22px;
      float: left;
      overflow: hidden;
      :deep(.ant-image) {
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }
</style>
