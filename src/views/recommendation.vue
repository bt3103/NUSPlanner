<template>
  <div>
    <div class="sidebar"><sidebar /></div>
    <div class="menus">
      <div class="d-flex justify-between align-center mb-3">
        <v-btn @click="all">Display All</v-btn>
        <v-btn @click="none">Hide ALL</v-btn>
      </div>

      <v-expansion-panel v-model="panel" expand>
        <v-expansion-panel-content v-for="item in items" :key="item.title">
          <div slot="header">{{ item.title }}</div>
          <v-card>
            <v-card-text>{{ item.text }}</v-card-text>
            {{ item.component }}
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";
import list from "@/components/PeList.vue";

export default {
  name: "recommendation",
  components: {
    sidebar
  },
  data() {
    return {
      panel: [],
      items: [
        {
          title: "Popular Program Electives",
          text: "Top Ten Chosen PE modules",
          components: list
        },
        {
          title: "Common Minors Taken",
          text: "Top Three Minors Selected"
        },
        {
          title: "Most Sorted Hard Skills",
          text: "Technical Skills Industry Rank"
        }
      ]
    };
  },
  methods: {
    all() {
      this.panel = [...Array(this.items.length).keys()].map(_ => true);
    },
    none() {
      this.panel = [];
    }
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
.menus {
  width: 80%;
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
