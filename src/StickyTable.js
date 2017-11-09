import DetachTable from './DetachTable'
import 'waypoints/lib/jquery.waypoints'
import $ from 'jquery'
export default class StickyTable extends DetachTable {
  constructor(tableVm, config) {
    super(tableVm, config)
    this.bindSticky()
  }

  handleHead() {
    super.handleHead()
    const height = this.$head.css('height')
    const style = {
      marginTop: height
    }
    this.detachStyle(this.$body, style)
    this.detachStyle(this.$fixedBody, style)
  }

  bindSticky() {
    [this.waypoint] = this.$head.waypoint(this.handleSticky.bind(this), {
      offset: this.config.offset
    })
  }

  handleSticky(direction) {
    if (direction === 'up') {
      this.restore()
    } else if (direction === 'down') {
      this.detach()
    }
  }

  destory(){
    this.waypoint.destroy()
  }

  refresh(){
    window.Waypoint.refreshAll()
  }

}
