// import { ref } from 'vue'

// export default function useLoading(initValue = false) {
//   const loading = ref(initValue)
//   const setLoading = (value: boolean) => {
//     loading.value = value
//   }
//   const toggle = () => {
//     loading.value = !loading.value
//   }
//   return {
//     loading,
//     setLoading,
//     toggle,
//   }
// }

import { ref } from 'vue';

// 初始加载，设置加载状态，切换加载状态
export default function useLoading(initValue = false) {
  const loading = ref(initValue);
  const setLoading = (value: boolean) => {
    loading.value = value;
  }
  const toggle = () => {
    loading.value = !loading.value;
  }
  return { loading, setLoading, toggle };
}
