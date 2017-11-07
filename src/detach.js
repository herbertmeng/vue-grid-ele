import $ from 'jquery'
import _ from 'lodash'
class DetachTable {
  constructor (table, config) {
    const defaultConfig = {
      left: 0,
      top: 0,
      fixedZIndex: 9,
      zIndex: 8
    }
    this.config = _.merge(defaultConfig, config)
    this.$table = $(table)
    this.$fixed = this.$table.find('div.v-table__fixed')
    this.$fixedHead = this.$table.find('div.v-table__fixed-header-wrapper')
    this.$head = this.$table.find('div.v-table__header-wrapper')
    this.$fixedBody = this.$table.find('div.v-table__fixed-body-wrapper')
    this.$body = this.$table.find('div.v-table__body-wrapper')
    this.cache = []
    this.detached = false
  }
  detach () {
    if (!this.detached) {
      this.handleFixedBody()
      this.handleFixedHead()
      this.handleHead()
      this.detached = true
    }
  }
  restore () {
    if (this.detached) {
      while (this.cache.length) {
        this.cache.pop()()
      }
      this.detached = false
    }
  }
  cacheStyle ($el, css) {
    const style = _.keys(css).reduce((cache, key) => {
      cache[key] = $el.css(key)
      return cache
    }, {})
    this.cache.unshift(() => {
      $el.css(style)
    })
  }
  detachStyle ($el, css) {
    this.cacheStyle($el, css)
    $el.css(css)
  }
  handleFixedBody () {
    this.detachStyle(this.$fixedBody, {
      top: 0
    })
  }
  handleFixedHead () {
    this.cacheStyle(this.$fixedHead)
    const width = parseFloat(this.$fixed.css('width')) + 2 + 'px'
    this.detachStyle(this.$fixedHead, {
      position: 'fixed',
      overflow: 'hidden',
      zIndex: this.config.fixedZIndex,
      left: this.config.left,
      top: this.config.top,
      width
    })
    this.handleFixedBorder()
  }
  handleHead () {
    const width = this.$body.css('width')
    this.detachStyle(this.$head, {
      position: 'fixed',
      overflow: 'hidden',
      zIndex: this.config.zIndex,
      left: this.config.left + 1,
      top: this.config.top,
      width
    })
  }
  handleFixedBorder () {
    const borderColor = this.$fixedHead.find('th').css('borderRightColor')
    const border = `1px solid ${borderColor}`
    this.detachStyle(this.$fixedHead, {
      borderLeft: border,
      borderRight: border
    })
  }
}
export default DetachTable
