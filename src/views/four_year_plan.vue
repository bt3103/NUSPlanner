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
    <div class="studyplan" v-show="submitted==1">
    <img src='https://firebasestorage.googleapis.com/v0/b/nusplanner.appspot.com/o/studyplans%2Fstudyplan_1.PNG?alt=media&token=e2ce8915-01f0-456a-8d53-388e0aaec44f' width="700px" height="500px" />
    </div>
    <div class="studyplan" v-show="submitted==2">
    <img src='https://firebasestorage.googleapis.com/v0/b/nusplanner.appspot.com/o/studyplans%2Fstudyplan_2.PNG?alt=media&token=eb8998e0-1c6b-4be7-8eb7-090060941ea4' width="700px" height="500px" />
    </div>
    <div class="studyplan_blank" v-show="submitted==0">
    <img src="https://firebasestorage.googleapis.com/v0/b/nusplanner.appspot.com/o/studyplans%2Fstudyplan_blank.PNG?alt=media&token=29d0dfad-3735-4e13-9fc2-10011f19f8dd" width="700px" height="500px" />
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
      submitted: 0,
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
      if(this.e1=="Year 3 Sem 1" && this.e2 == "Year 3 Sem 2" && this.e3 =="Economics" 
      && this.e4 =="Financial Analytics" && this.e5 == "Business Acumen"){
        this.submitted = 1;
      }else{
        alert("We are sorry, there is no study plan for this combination. Please reselect or create your own plan");
        this.submitted = 0;
      }
    },
    isReset: function()
    {
      this.submitted = 0;
    },
    isCreate: function()
    {
      this.submitted = 0;
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
