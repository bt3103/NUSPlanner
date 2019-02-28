<template>
  <div>
    <div class="sidebar"><sidebar /></div>

  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";

export default {
  name: "recommendation",
  components: {
    sidebar
  }
};
</script>

<style scoped>
#recommendation {
  background-color: #ffffff;
  margin: auto;
  width: 100%;
}
.sidebar {
  background-color: #ffffff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 20%;
  float: left;
}
.dropdown {
  width: 20%;
  float: left;
}
.studyplan .studyplan_blank {
  width: 50%;
  float: left;

}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
