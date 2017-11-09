import table from './packages/table'
import tableColumn from './packages/table-column'
import tableColumnGroup from './table-column-group'
import $ from 'jquery'
import 'nicescroll'
import StickyTable from './StickyTable'
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
    },
    sticky: {
      type: Boolean,
      default:false
    },
    stickyConfig:{
      type: Object
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
    },
    initSticky(){
      this.stickyTable = new StickyTable(this,this.stickyConfig)
    },
    refreshSticky(){
      this.stickyTable&&this.stickyTable.refresh()
    },
    destroySticky(){
      if (this.stickyTable) {
        this.stickyTable.destory()
        this.stickyTable = null
        delete this.stickyTable
      }
    }
  },
  mounted () {
    this.$on('frame-done', () => {
      this.initScroll()
    })
    if(this.sticky){
      this.$on('frame-done', () => {
        this.initSticky()
      })
    }
  },
  updated () {
    this.$nextTick(() => {
      this.resizeScroll()
    })
    if(this.sticky){
      this.$nextTick(() => {
        this.refreshSticky()
      })
    }
  },
  beforeDestroy () {
    this.destroyScroll()
    if(this.sticky){
      this.destroySticky()
    }
  }
}
