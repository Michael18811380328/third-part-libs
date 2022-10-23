// guid 全局唯一标识符（GUID，Globally Unique Identifier）
// 时间戳 + 序列号（确保全局唯一）
let seed = 0;
export default function guid() {
  return `${Date.now()}_${seed++}`;
}

// let seed = 0;
// export default function guid() {
//   return `${Date.now()}_${seed++}`;
// }
