<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: "App",
  fetch({ redirect }) {
    redirect("/dashboard");
  }
};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>