import table from './packages/table'
import tableColumn from './packages/table-column'
import tableColumnGroup from './table-column-group'
export default {
  inheritAttrs: false,
  name: 'v-grid',
  render () {
    const tableProps = {
      props: this.$attrs,
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
