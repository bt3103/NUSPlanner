<template>
  <div>
    <div class="sidebar"><sidebar /></div>
    <div><WhatIfAnalysis /></div>
  </div>
</template>

<script>
import WhatIfAnalysis from "@/components/WhatIfAnalysis.vue";
import sidebar from "@/components/Sidebar.vue";

export default {
  name: "what_if_analysis",
  components: {
    WhatIfAnalysis,
    sidebar
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #ffffff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 15%;
  float: left;
}
</style>
