import _ from 'lodash'
import tableColumn from './packages/table-column'
export default {
  name: 'tableColumnGroup',
  functional: true,
  props: {
    columns: {}
  },
  components: {
    tableColumn
  },
  render (h, context) {
    return context.props.columns.map((col, index) => {
      let scopedSlots
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
      const columnKey = _.uniqueId('table-column')
      if (_.size(col.children)) {
        return (<tableColumn key={columnKey} scopedSlots={scopedSlots} {...colProps}>
          <tableColumnGroup columns={col.children} />
        </tableColumn>)
      } else {
        return (<tableColumn key={columnKey} scopedSlots={scopedSlots} {...colProps} />)
      }
    })
  }
}
