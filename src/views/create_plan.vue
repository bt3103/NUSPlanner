<template lang="html">
<div>
 <div class="sidebar"><sidebar /></div>
 <div><table /></div>
</div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";
import table from "@/components/input_table.vue";

export default {
  name: "create_plan",
  data() {
    return {

    }
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #ffffff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 20%;
  float: left;
}
</style>