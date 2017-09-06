import _ from 'lodash'
import table from './packages/table'
import tableColumn from './packages/table-column'
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
    return (<v-table-column key={col.label || index} scopedSlots={scopedSlots} {...colProps}>
      {children}
    </v-table-column>)
  })
}
export default {
  inheritAttrs: false,
  name: 'v-grid',
  render () {
    const tableProps = {
      attrs: _.omit(this.$attrs, _.keys(this.$props))
    }
    return (<v-table {...tableProps}>
      {createHead.call(this, this.columns)}
    </v-table>)
  },
  props: {
    columns: {
      type: Array,
      default: []
    }
  },
  components: {
    vTable: table,
    vTableColumn: tableColumn
  }
}
