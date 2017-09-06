import VTag from './src/tag';

/* istanbul ignore next */
VTag.install = function(Vue) {
  Vue.component(VTag.name, VTag);
};

export default VTag;
