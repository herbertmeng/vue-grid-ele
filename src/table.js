import table from './packages/table'
import tableColumn from './packages/table-column'
import tableColumnGroup from './table-column-group'
import $ from 'jquery'
import 'nicescroll'
export default {
  inheritAttrs: false,
  name: 'v-grid',
  render () {
    const tableProps = {
      props: this.$attrs,
      on: this.$listeners
    }
    return (<v-table {...tableProps} data={this.data}>
      <table-column-group columns={this.columns} />
    </v-table>)
  },
  props: {
    columns: {
      type: Array,
      default: []
    },
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    vTable: table,
    tableColumn: tableColumn,
    tableColumnGroup: tableColumnGroup
  },
  methods: {
    initScroll () {
      this.nicescroll = $(this.$el).find('.v-table__body-wrapper').niceScroll({
        cursorcolor: '#6496f2',
        cursorwidth: '6px',
        cursorborderradius: '3px'
      })
    },
    resizeScroll () {
      this.nicescroll && this.nicescroll.resize()
    },
    destroyScroll () {
      if (this.nicescroll) {
        this.nicescroll.remove()
        this.nicescroll = null
        delete this.nicescroll
      }
    }
  },
  mounted () {
    this.$on('frame-done', () => {
      this.initScroll()
    })
  },
  updated () {
    this.$nextTick(() => {
      this.resizeScroll()
    })
  },
  beforeDestroy () {
    this.destroyScroll()
  }
}
