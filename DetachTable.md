# DetachTable
分离表头
## usage
```js
import {DetachTable} from '@vue/table'
const detachTable = new DetachTable(this.$refs.table,{
  left:0,
  top:0,
  fixedZIndex:9,
  zIndex:8
})
detachTable.detach() //分离表头
detachTable.restore() //恢复表头
```
