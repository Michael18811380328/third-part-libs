export default function warn(msg) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(msg);
    }
  }
}

// export default function warn(message) {
//   if (process.env.NODE_ENV !== 'producion') {
//     if (typeof console !== 'undefined' && console.warn) {
//       console.warn(message);
//     }
//   }  
// }
