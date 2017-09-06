import VTableColumn from '../table/src/table-column';

/* istanbul ignore next */
VTableColumn.install = function(Vue) {
  Vue.component(VTableColumn.name, VTableColumn);
};

export default VTableColumn;
