<template>
  <div>
    <div class="sidebar"><sidebar /></div>
    <div class="dropdown">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
              v-model="e1"
              :menu-props="{ auto: true }"
              :items="internship"
              label="Time for compulsory internship"
              placeholder="Year 3 Sem 1"
              attach="dropdown"
            ></v-select>
            <v-select
              v-model="e2"
              :menu-props="{ auto: true }"
              :items="sep"
              label="Time for SEP"
              placeholder="Year 3 Sem 1"
              attach="dropdown"
            ></v-select>
            <v-select
              v-model="e3"
              :menu-props="{ auto: true }"
              :items="minors"
              label="Minor to take"
              placeholder="Finance"
              attach="dropdown"
            ></v-select>
            <v-select
              v-model="e4"
              :menu-props="{ auto: true }"
              :items="specs"
              label="Specialisation to take"
              placeholder="Financial Analytics"
              attach="dropdown"
            ></v-select>
            <v-select
              v-model="e5"
              :menu-props="{ auto: true }"
              :items="skills"
              label="Technical Skills Focus"
              placeholder="Python Programming"
              attach="dropdown"
            ></v-select>
            <v-btn block color="secondary" dark @click="isSubmitted()">Submit</v-btn>
            <v-btn block color="secondary" dark @click="isCreate()">Create</v-btn>
            <v-btn block color="secondary" dark @click="isReset()">Reset</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="studyplan_blank" v-show="submitted==1">
    <img src="https://imgur.com/gpP6YQX.png" width="700px" height="500px" />
    </div>
    <div class="studyplan" v-show="submitted==2">
    <img src="https://imgur.com/zl27RE8" width="700px" height="500px" />
    </div>
    <div class="studyplan" v-show="submitted==3">
    <img src="https://imgur.com/sCCHsyw.png" width="700px" height="500px" />
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";

export default {
  name: "four_year_plan",
  components: {
    sidebar
  },
  data() {
    return {
      submitted: 3,
      e1: [],
      e2: [],
      e3: [],
      e4: [],
      e5: [],
      internship: [
        "Year 2 Sem 2",
        "Year 3 Sem 1",
        "Year 3 Sem 2",
        "Year 4 Sem 1"
      ],
      sep: [
        "Year 2 Sem 1",
        "Year 2 Sem 2",
        "Year 3 Sem 1",
        "Year 3 Sem 2",
        "Year 4 Sem 1",
        "Not Going"
      ],
      minors: [
        "Business",
        "Computer Science",
        "Economics",
        "Math",
        "Finance",
        "Statistics",
        "No Plan"
      ],
      specs: [
        "Financial Analytics",
        "Marketing Analytics",
        "No Plan"
      ],
      skills: [
        "Python Programming",
        "Statistical Modelling",
        "Business Acumen"
      ]
    };
  },
  methods: {
    isSubmitted: function()
    {
      this.submitted =1;
    },
    isReset: function()
    {
      this.submitted = 3;
    },
    isCreate: function()
    {
      this.submitted = 3;
    }
  }
};
</script>

<style scoped>
#four_year_plan {
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
