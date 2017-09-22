import _ from 'lodash'
import table from './packages/table'
import tableColumn from './packages/table-column'
import tableColumnGroup from './table-column-group'
export default {
  inheritAttrs: false,
  name: 'v-grid',
  render () {
    const tableProps = {
      attrs: _.omit(this.$attrs, _.keys(this.$props)),
      on: this.$listeners
    }
    return (<v-table {...tableProps}>
      <table-column-group columns={this.columns} />
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
    tableColumn: tableColumn,
    tableColumnGroup: tableColumnGroup
  }
}
