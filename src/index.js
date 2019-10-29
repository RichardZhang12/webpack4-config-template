import './public/css/aaa.css';
import $ from 'jquery';
import 'bootstrap';
import moment from 'moment';
// import 'moment/locale/zh-cn'
console.log(window.$);
// console.log(1);
let str = null;
let foo = () => {
  // console.log('箭头')
}
foo();

console.log(moment().format('ll'));

$.ajax({
  type: 'get',
  url: 'http://yapi.agotoz.com/mock/217/v1/access-point/all',
  data: {
    type: 5,
  },  
  // contentType: 'application/json',
  success: (data) => {
    console.log(data,111)
  },
  error: (err) => {
    console.log(err)
  }
})