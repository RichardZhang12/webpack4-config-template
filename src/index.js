import './public/css/aaa.css';
import $ from 'jquery';
import 'bootstrap';
import moment from 'moment';
// import 'moment/locale/zh-cn'
// console.log(window.$);
// console.log(1);
let str = null;



// $.ajax({
//   type: 'get',
//   url: 'http://yapi.agotoz.com/mock/217/v1/access-point/all',
//   data: {
//     type: 5,
//   },  
//   // contentType: 'application/json',
//   success: (data) => {
//     console.log(data,111)
//   },
//   error: (err) => {
//     console.log(err)
//   }
// })
let p = new Promise((resolve, reject) => {
  reject({ code: 900, message: '错误' })
})
p.then(data => {
  console.log(data)
}, err => {
  console.log(err, 'err')
  //在处理err的reject中再次return一个promise.resolve
  //在之后的then调用依然可以。
  return Promise.resolve({ code: 0, message: '处理后' })
}).then(res => {
  console.log(res, 'res')
}, err => {
  console.log(err, 'err1')
})

let arr = [1, 2, 3, 3, 4, 5, 4, 43];
let num = arr.length / 2;
for (let i; i++; i <= num) {
}
arr.slice(0, 2)(2, 4)(4, 6)(6, 8)(8, 10)
arr.map((item, index) => {
  let a = [];
  console.log(11,item,index);
  console.log(item,index)
})
