<template>
  <div>
    <headerDesktop />

    <div class="container">
      <sidebar />
      <contentInner />
    </div>

    <footerDesktop />
  </div>
</template>

<script>
import headerDesktop from "@/components/v-header.vue";
import footerDesktop from "@/components/v-footer.vue";
import sidebar from "@/components/v-sidebar.vue";
import contentInner from "@/components/v-content.vue";

export default {
  name: "Main",
  components: {
    headerDesktop,
    footerDesktop,
    sidebar,
    contentInner,
  },
};
</script>

<style lang="scss">
.container {
  position: relative;
  width: 100%;
  max-width: 1160px;
  margin: 45px auto 0;
  height: 100vh;
}
</style>
