export default function get<T = any>(entity: any, path: (string | number)[]) {
  let current = entity;

  for (let i = 0; i < path.length; i += 1) {
    if (current === null || current === undefined) {
      return undefined;
    }

    current = current[path[i]];
  }

  return current;
}

// export default function get<T = any>(entity: any, path: (string | number)[]) {
//   let current = entity;
//   for (let i = 0; i < path.length; i++) {
//     // 因为每次 current 都在变化，所以每次都需要判断
//     if (current === null || current === undefined) {
//       return undefined;
//     }
//     current = current[path[i]];
//   }
//   return current;
// }
