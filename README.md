# vue-grid-ele
extension of element table

##  features
1. support multi table head by props
2. support custom table cell by render function
3. support custom scroll
4. support sticky table head
5. fix safari layout error
6. remove unnecessary dom and vue component to decrease memory usage
7. add render delay to avoid splash screen when render large data with render funciton


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
whether sticky table head

### stickyConfig:`<object>`
```js
left: 0,//fixed to screen
top: 0,//fixed to screen
fixedZIndex: 9,
zIndex: 8
offset:0//offset trigger sticky
```