<template>
  <div>
    <div class="sidebar">
      <sidebar/>
    </div>
    <div>
      <v-container>
        <v-layout row wrap>
          <v-flex xs4>
            <v-btn block flat @click="clickTab(0)">Top Chosen Minors</v-btn>
          </v-flex>
          <v-flex xs4>
            <v-btn block flat @click="clickTab(1)">Top Chosen Programme Elective Modules</v-btn>
          </v-flex>

          <v-flex xs4>
            <v-btn block flat @click="clickTab(2)">Most Sort-after Skills</v-btn>
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

    <!-- <div class="menus">
      <div class="d-flex justify-between align-center mb-3">
        <v-btn @click="all">Display All</v-btn>
        <v-btn @click="none">Hide ALL</v-btn>
      </div>
      <v-expansion-panel v-model='panel'>
        <v-expansion-panel-content>
          <div slot="header">{{ popularPE.title }}</div>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <template v-for="i in popularPE.list">
                <v-flex xs3>
                  <v-card>
                    <v-img src="i.picture"></v-img>
                    <v-card-title primary-title>&nbsp &nbsp &nbsp {{ i.moduleCode }}</v-card-title>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </v-container>
        </v-expansion-panel-content>
        <v-expansion-panel-content><div slot="header">2</div></v-expansion-panel-content>
        <v-expansion-panel-content><div slot="header">3</div></v-expansion-panel-content>
        </v-expansion-panel> 

      <v-expansion-panel v-model="panel" expand focusable light>
        <v-expansion-panel-content v-for="item in items" :key="item.title">
          <div slot="header">{{ item.text }}</div>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <template v-for="i in item.list">
                <v-flex xs3>
                  <v-card>
                    <v-img src="i.picture"></v-img>
                    <v-card-title primary-title>&nbsp &nbsp &nbsp {{ i.message }}</v-card-title>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </v-container>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex v-for="i in 4" :key="`3${i}`" xs3>
                <v-card>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  aspect-ratio="2.75"
                ></v-img>
                </v-card>
          <v-card-text class="px-0">3</v-card-text>
        </v-card>
      </v-flex>
      </v-layout>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>-->
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
      panel: [],
      popularPE: [
        {
          title: "Top Four Chosen PE Modules",
          list: [
            {
              moduleCode: "BT4013",
              moduleName: "Analytics for Capital Market Trading and Investment",
              pastCohort: [
                {
                  sem: "AY18/19S2",
                  cohortSize: 50
                }
              ]
            },
            {},
            {},
            {}
          ]
        }
      ],
      items: [
        {
          title: "Popular Program Electives",
          text: "Top Four Chosen PE modules",
          list: [
            {
              message:
                "BT4013 Analytics for Capital Market Trading and Investment"
            },
            { message: "BT4016 Risk Analytics for Financial Services" },
            //{ message: "BT4211 Data-Driven Marketing" },
            { message: "BT4212 Search Engine Optimization and Analytics" },
            { message: "IS4241 Social Media Network Analysis" }
          ]
        },
        {
          title: "Common Minors Taken",
          text: "Top Four Minors Selected",
          list: [
            { message: "Statistic" },
            { message: "Computer Science" },
            { message: "Finance" },
            { message: "Health Analytics" }
          ]
        },
        {
          title: "Most Sorted Hard Skills For Data Analytics",
          text: "Technical Skills Industry Rank",
          list: [
            {
              message: "Python",
              picture:
                "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjj96-t2snhAhUT63MBHVcmD1UQjRx6BAgBEAU&url=https%3A%2F%2Fwww.kisspng.com%2Fpng-computer-icons-python-anaconda-python-logo-downloa-5395363%2F&psig=AOvVaw21UVzk45ZDuBXVeXHGvjJ7&ust=1555129317821790"
            },
            { message: "SQL", picture: "" },
            { message: "Hadoop", picture: "" },
            //{ message: "R" },
            { message: "Java", picture: "" }
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
    },
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
