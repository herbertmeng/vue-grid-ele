import _ from 'lodash'
import table from 'element-ui/lib/table'
import tableColumn from 'element-ui/lib/table-column'
const createHead = function (columns) {
  const h = this.$createElement // eslint-disable-line
  return columns.map((col, index) => {
    let children, scopedSlots
    if (_.size(col.children)) {
      children = createHead.call(this, col.children)
    }
    if (col.render) {
      scopedSlots = {
        default: function (props) {
          return col.render(h, props)
        }
      }
    }
    const colProps = {
      attrs: _.omit(col, 'render')
    }
    return (<el-table-column key={col.label || index} scopedSlots={scopedSlots} {...colProps}>
      {children}
    </el-table-column>)
  })
}
export default {
  inheritAttrs: false,
  name: 'v-table',
  render () {
    const tableProps = {
      attrs: _.omit(this.$attrs, _.keys(this.$props))
    }
    return (<el-table {...tableProps}>
      {createHead.call(this, this.columns)}
    </el-table>)
  },
  props: {
    columns: {
      type: Array,
      default: []
    }
  },
  components: {
    [table.name]: table,
    [tableColumn.name]: tableColumn
  }
}
