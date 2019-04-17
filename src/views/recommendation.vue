<template>
  <div>
    <div class="sidebar">
      <sidebar/>
    </div>
    <div>
      <v-container>
        <v-layout row wrap>
          <v-flex xs4>
            <v-btn block flat @click="clickTab(0)" :disabled='showMinor'>Top Chosen Minors</v-btn>
          </v-flex>
          <v-flex xs4>
            <v-btn block flat @click="clickTab(1)" :disabled='showPE'>Top Chosen Programme Elective Modules</v-btn>
          </v-flex>

          <v-flex xs4>
            <v-btn block flat @click="clickTab(2)" :disabled='showSkill'>Most Sort-after Skills in Industry</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div v-if="showPE">
      <toppe/>
    </div>
    <div v-if="showMinor">
      <topminor/>
    </div>
    <div v-if="showSkill">
      <topskill/>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";
import toppe from "@/components/TopPE.vue";
import topminor from "@/components/TopMinor.vue";
import topskill from "@/components/TopSkill.vue";

export default {
  name: "recommendation",
  components: {
    sidebar,
    toppe,
    topminor,
    topskill
  },
  data() {
    return {
      showPE: false,
      showMinor: true,
      showSkill: false,
      tabClicked:[true, false, false]
    };
  },
  methods: {
    clickTab(n) {
      console.log(n);
      if (n == 0) {
        this.showPE = false;
        this.showMinor = true;
        this.showSkill = false;
        console.log('minor')
      } else if (n == 1) {
        this.showPE = true;
        this.showMinor = false;
        this.showSkill = false;
        console.log('pe')
      } else if(n==2){
        this.showPE = false;
        this.showMinor = false;
        this.showSkill = true;
        console.log('skill')
      }else{}
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
