# vue-table
扩展element-table
<http://element.eleme.io/#/zh-CN/component/table>

## props
### columns
#### render:function
定制化表格内容

    render:function(h,{row, column, $index, store}){
      const props = {
        attrs:{row, column, $index, store}
      }
      return <component {...props}/>
    }

#### children:Array
多级表头
