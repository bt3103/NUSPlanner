<template>
  <div>
    <div class="sidebar"><sidebar /></div>
    <div class="menus">
      <div class="d-flex justify-between align-center mb-3">
        <v-btn @click="all">Display All</v-btn>
        <v-btn @click="none">Hide ALL</v-btn>
      </div>

      <v-expansion-panel v-model="panel" expand focusable light>
        <v-expansion-panel-content v-for="item in items" :key="item.title">
          <div slot="header">{{ item.text }}</div>
          <v-card>
            <v-list>
              <template v-for="i in item.list">
                <v-list-tile-title
                  >&nbsp &nbsp &nbsp {{ i.message }}</v-list-tile-title
                >
              </template>
            </v-list>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";

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
          text: "Top Five Chosen PE modules",
          list: [
            {
              message:
                "BT4013 Analytics for Capital Market Trading and Investment"
            },
            { message: "BT4016 Risk Analytics for Financial Services" },
            { message: "BT4211 Data-Driven Marketing" },
            { message: "BT4212 Search Engine Optimization and Analytics" },
            { message: "IS4241 Social Media Network Analysis" }
          ]
        },
        {
          title: "Common Minors Taken",
          text: "Top Three Minors Selected",
          list: [
            { message: "Statistic" },
            { message: "Computer Science" },
            { message: "Finance" }
          ]
        },
        {
          title: "Most Sorted Hard Skills For Data Analytics",
          text: "Technical Skills Industry Rank",
          list: [
            { message: "Python" },
            { message: "SQL" },
            { message: "Hadoop" },
            { message: "R" },
            { message: "Java" }
          ]
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
