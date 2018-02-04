// const cookie = {
//     defaultDays: 50,
//     set(prop, value = '', expiresDay = this.defaultDays) {
//         let date = new Date();
//         date.setTime(date.getTime() + (expiresDay*24*60*60*1000));
//         document.cookie += `${prop}=${value}; expires=${date.toUTCString()}`
//     },
//     get(prop){
//         const all = document.cookie.split('; ');
//         let result = null;
//         for (var i = 0; i < all.length; i++) {
//             let current = all[i];
//             if (current.split('=')[0] == prop) {
//                 result = current.split('=')[1]
//             }
//         }
//         return result;
//     }
// }

const cookie = require('cookies-js');

export default cookie;
