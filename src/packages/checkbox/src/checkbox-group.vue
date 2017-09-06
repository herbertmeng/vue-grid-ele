<script>
  import Emitter from '../../../src/mixins/emitter';

  export default {
    name: 'VCheckboxGroup',

    componentName: 'VCheckboxGroup',

    mixins: [Emitter],

    props: {
      value: {},
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },

    watch: {
      value(value) {
        this.dispatch('VFormItem', 'el.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="v-checkbox-group">
    <slot></slot>
  </div>
</template>
