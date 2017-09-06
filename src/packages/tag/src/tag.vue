<template>
  <transition :name="closeTransition ? '' : 'v-zoom-in-center'">
    <span
      class="v-tag"
      :class="[type ? 'v-tag--' + type : '', {'is-hit': hit}]"
      :style="{backgroundColor: color}">
      <slot></slot>
      <i class="v-tag__close v-icon-close"
        v-if="closable"
        @click="handleClose"></i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 'VTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      closeTransition: Boolean,
      color: String
    },
    methods: {
      handleClose(event) {
        this.$emit('close', event);
      }
    }
  };
</script>
