##




## props

### columns
#### render:`<function>`
custom table cell content

    render:function(h,{row, column, $index, store}){
      const props = {
        attrs:{row, column, $index, store}
      }
      return <component {...props}/>
    }

#### children:`<array:[]>`
multilayer table head with colspan and rowspan

### renderDelay:`<number:1000>`

### sticky:`<boolean:false>`
是否挂起表头

### stickyConfig:`<object>`
```js
left: 0,//挂起位置
top: 0,//挂起位置
fixedZIndex: 9,//固定列zIndex
zIndex: 8//非固定列zIndex
offset:0//触发挂起偏移量
```