<template>
  <div class="senex__template senex__theme--senex">
    <div class="senex__template__header">
      <Header></Header>
    </div>

    <div class="senex__template__body">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss">
@use "/assets/scss/senex.scss";
</style>

<script setup lang="ts">
</script>
