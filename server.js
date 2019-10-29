let express = require('express');
let webpack = require('webpack');
let middle = require('webpack-dev-middleware');
//*  */
let fs = require('fs');
let path = require('path');

let app = express();
let allwan = JSON.parse(fs.readFileSync('./allwan.json', 'utf-8')).docs;
let cpe = JSON.parse(fs.readFileSync('./CPE.json', 'utf-8')).docs;
let yun = JSON.parse(fs.readFileSync('./yun.json', 'utf-8')).docs;
let liebao = JSON.parse(fs.readFileSync('./liebao.json', 'utf-8')).docs;

let sumArr = [...allwan, ...cpe, ...yun,...liebao];
//01读取文件
//第一阶段，将嵌套json处理为同一纬度
let stepHandle1 = (docs) => {
  // 存放第一层处理出的数据
  //02处理数据第一步 将小幺鸡中children嵌套的全提到同一层
  let dealData1 = (docs) => {
    let firstArr = [];
    docs.forEach((item, index) => {
      // JSON.parse(item.children[0].content)
      if (item.children.length > 0) {
        item.children.forEach((item01, index01) => {
          if (item01.children.length > 0) {
            item01.children.forEach((item02, index02) => {
              if (item02.children.length > 0) {
                item02.children.forEach((item03, index03) => {
                  console.log(item03)
                  firstArr.push(item03)
                })
              } else {
                firstArr.push(item02);
              }
            })
          } else {
            firstArr.push(item01)
          }
        })
      }
    });
    return firstArr;
  }
  let data1 = dealData1(docs);
  fs.writeFileSync('./json/sum.json', JSON.stringify(data1));
}
// stepHandle1(sumArr);

let formatResReq = (data) => {
  let body = {
    properties: {}
  };
  data.forEach((item, index) => {
    body.properties[item.name] = {};
    body.properties[item.name].type = item.type;
    if (!!~item.type.indexOf('array[object]')) {
      body.properties[item.name].type = 'array';
      body.properties[item.name].items = formatResReq(item.children);
      body.properties[item.name].items.type = 'object'
    } else if (!!~item.type.indexOf('object')) {
      body.properties[item.name] = formatResReq(item.children)
    } else {
      body.properties[item.name].description = item.description || ''
    }
  })
  return body;
}
//第二阶段 格式化json
let stepHandle2 = () => {
  let fsapi = [{
    index: 0,
    name: "fs",
    desc: null,
    add_time: 1567161067,
    up_time: 1567161129,
    list: []
  }];
  let ht = [{
    index: 0,
    name: "ht",
    desc: null,
    add_time: 1567161067,
    up_time: 1567161129,
    list: []
  }];
  let crm = [{
    index: 0,
    name: "crm",
    desc: null,
    add_time: 1567161067,
    up_time: 1567161129,
    list: []
  }];
  let emo = [{
    index: 0,
    name: "emo",
    desc: null,
    add_time: 1567161067,
    up_time: 1567161129,
    list: []
  }];
  let ali = [{
    index: 0,
    name: "yun",
    desc: null,
    add_time: 1567161067,
    up_time: 1567161129,
    list: []
  }];
  let tencent = [{
    index: 0,
    name: "yun",
    desc: null,
    add_time: 1567161067,
    up_time: 1567161129,
    list: []
  }];
  let cpe = [{
    index: 0,
    name: "linker",
    desc: null,
    add_time: 1567161067,
    up_time: 1567161129,
    list: []
  }];
  let otherconfig = [{
    index: 0,
    name: "配置下发",
    desc: null,
    add_time: 1567161067,
    up_time: 1567161129,
    list: []
  }];
  let liebao = [{
    index: 0,
    name: "猎豹api",
    desc: null,
    add_time: 1567161067,
    up_time: 1567161129,
    list: []
  }];


  let jsonData = fs.readFileSync('./json/sum.json', 'utf-8');
  jsonData = JSON.parse(jsonData);
  jsonData.forEach((item, index) => {
    if (!item.content) return;
    if (index == 0) {
      console.log(JSON.parse(item.content));
    }

    try {
      let parseItem = JSON.parse(item.content);
      let res_body = formatResReq(parseItem.responseArgs);
      res_body.type = 'object'
      let req_body_other = formatResReq(parseItem.requestArgs)
      req_body_other.type = 'object';
      // parseItem.responseArgs.forEach((item01, index01) => {
      //   res_body.properties[item01.name] = {};
      //   res_body.properties[item01.name].type = item01.type;
      //   res_body.properties[item01.name].description = item01.description || '';
      // });

      // parseItem.requestArgs.forEach((item01, index01) => {
      //   req_body_other.properties[item01.name] = {};
      //   req_body_other.properties[item01.name].type = item01.type;
      //   req_body_other.properties[item01.name].description = item01.description || '';
      // })

      let single = {
        edit_uid: 0,
        status: "undone",
        type: "static",
        req_body_is_json_schema: true,
        res_body_is_json_schema: true,
        api_opened: false,
        index: 0,
        tag: [],
        _id: 10,
        catid: 24,
        project_id: 13,
        uid: 11,
        add_time: 1567161059,
        up_time: 1571193300,
        res_body_type: "json",
        req_body_form: [],
        __v: 0,
        desc: "",
        markdown: "",
        req_body_type: "json",
        method: parseItem.requestMethod,
        req_params: [],
        query_path: {
          path:'/' + parseItem.url.substring(parseItem.url.lastIndexOf('$') + 1),
          params: []
        },
        title: item.name,
        path: '/' + parseItem.url.substring(parseItem.url.lastIndexOf('$') + 1),
        req_headers: [{
          required: "1",
          _id: "5da7d89e17a7ea2cfab297e9",
          name: "Content-Type",
          value: "application/json"
        }],
        req_query: [], //get请求
        req_body_other: JSON.stringify(req_body_other), //post body
        res_body: JSON.stringify(res_body)

      };
      //分情况收集
      if (!!~parseItem.url.indexOf('$ares') || !!~parseItem.url.indexOf('crm')) {
        crm[0].list.push(single)
      };
      if (!!~parseItem.url.indexOf('$zeus') || !!~parseItem.url.indexOf('ht')) {
        ht[0].list.push(single)
      };
      if (!!~parseItem.url.indexOf('$poros') || !!~parseItem.url.indexOf('fs')) {
        fsapi[0].list.push(single)
      };
      if (!!~parseItem.url.indexOf('$poseidon') || !!~parseItem.url.indexOf('emo')) {
        emo[0].list.push(single)
      }
      if (!!~parseItem.url.indexOf('$cpe')) {
        cpe[0].list.push(single);
      }
      if (!!~parseItem.url.indexOf('ali')) {
        ali[0].list.push(single);
      }
      if (!!~parseItem.url.indexOf('tencent')) {
        tencent[0].list.push(single);
      }
      if (!!~parseItem.url.indexOf('$api')) {
        liebao[0].list.push(single);
      }

      if(!parseItem.url) {
        otherconfig[0].list.push(single)
      }
    } catch (err) {
      console.log(err)
      console.log(item)
      console.log(index);
    }

  });
  // console.log(yun)
  // console.log(newJson);
  fs.writeFileSync('./json/fs.json', JSON.stringify(fsapi))
  fs.writeFileSync('./json/emo.json', JSON.stringify(emo))
  fs.writeFileSync('./json/crm.json', JSON.stringify(crm))
  fs.writeFileSync('./json/ht.json', JSON.stringify(ht))
  fs.writeFileSync('./json/ali.json', JSON.stringify(ali))
  fs.writeFileSync('./json/tencent.json', JSON.stringify(tencent))
  fs.writeFileSync('./json/linker.json', JSON.stringify(cpe))
  fs.writeFileSync('./json/liebao.json', JSON.stringify(liebao))
  fs.writeFileSync('./json/otherconfig.json',JSON.stringify(otherconfig));

}

stepHandle2();
let atman = JSON.parse("{\"requestMethod\":\"GET\",\"dataType\":\"JSON\",\"contentType\":\"JSON\",\"requestArgs\":[],\"requestHeaders\":[],\"responseHeaders\":[],\"responseArgs\":[{\"children\":[],\"name\":\"code\",\"type\":\"number\",\"require\":\"true\",\"id\":\"ve44dp\",\"description\":\"错误码0成功1000\"},{\"children\":[{\"children\":[],\"name\":\"password\",\"type\":\"array[string]\",\"require\":\"false\",\"description\":\"密码不符合规则\",\"id\":\"n8ip7e\"},{\"id\":\"9505lq\",\"require\":\"false\",\"type\":\"array[string]\",\"children\":[],\"name\":\"username\",\"description\":\"用户名不符合规则\"}],\"name\":\"error_info\",\"type\":\"object\",\"require\":\"true\",\"id\":\"3dij83\",\"description\":\"错误信息\"},{\"id\":\"bqjm35\",\"require\":\"true\",\"children\":[{\"id\":\"p8zflt\",\"require\":\"true\",\"type\":\"string\",\"children\":[],\"name\":\"access_token\",\"description\":\"授权令牌\"}],\"type\":\"string\",\"name\":\"res_info\"}],\"url\":\"$ares$/users/login-out\",\"status\":\"有效\",\"description\":\"\",\"ignoreGHttpReqArgs\":true,\"example\":\"{\\n  \\\"errno\\\": 1000,\\n  \\\"error_info\\\": {\\n    \\\"password\\\": [\\n      \\\"用户名或密码错误.\\\"\\n    ]\\n  }\\n}\"}")
// console.log(atman)
//详细格式化请求和响应数据


// console.log(formatResReq(atman.responseArgs))
app.listen(8000);