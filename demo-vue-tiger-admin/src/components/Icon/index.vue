<script lang="ts">
// 图标组件，这几个 API 不熟悉
import { h, resolveDynamicComponent, type VNode } from 'vue';

function Icon(props: any) {
  const Component = resolveDynamicComponent(props.type);
  return h(Component as VNode)
}

export default Icon;
</script>
