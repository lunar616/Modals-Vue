<template>
  <transition name="modal">
    <div class="modal__wrapper" @mousedown.self="$emit('close')">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title"> {{ title }} </span>
          <span class="button-close" @click="$emit('close')">×</span>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  created() {
    document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) this.$emit('close');
    });
  },
};
</script>

<style lang="scss" scoped>
@import './Modal.module.scss';
</style>