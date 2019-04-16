<template>
  <div>
    <br>
    <br>
    <div class="academicProgress" :style="{ 'padding-left': '210px', width: '95%' }">
      <v-card>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="teal lighten-3" class="white--text">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      src="https://pbs.twimg.com/media/C9XyZz0VYAElz7z.jpg"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{ person.personalInfo.name }}</div>
                        <div>
                          <v-icon>fas fa-birthday-cake</v-icon>
                          {{ person.personalInfo.birthday }}
                        </div>
                        <div>
                          <v-icon>fas fa-at</v-icon>
                          {{ person.personalInfo.email }}
                        </div>
                        <div>
                          <v-icon>fas fa-mobile</v-icon>
                          {{ person.personalInfo.contactNumber }}
                        </div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-text class="pa-3">
                  <v-spacer></v-spacer>
                  <div>
                    <p>Cohort: {{ person.personalInfo.cohortYear }}</p>
                    <p>Home Faculty: {{ person.personalInfo.homeFaculty1 }}</p>
                    <p>Academic Major: {{ person.personalInfo.academicMajor1 }}</p>
                    <p>Degree: {{ person.personalInfo.academicDegree1 }}</p>
                    <p
                      v-if="!person.personalInfo.academicMajor2 == ''"
                    >Second Major: {{ person.personalInfo.academicMajor2 }}</p>
                    <p
                      v-if="!person.personalInfo.academicMinor == ''"
                    >Academic Minor: {{ person.personalInfo.academicMinor }}</p>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <button class="collapsible" @click="clickOverallProgress">Overall Progress</button>
      <v-card class="mx-auto" max-width="980" v-if="showOverall">
        <v-card-title>
          <div class="subheading font-weight-light grey--text">By Semester CAP</div>
        </v-card-title>
        <v-sheet class="v-sheet--offset mx-auto" color="white" max-width="calc(100% - 72px)">
          <!--          <v-sparkline
            :labels="bySemCAP[0]"
            :value="bySemCAP[1]"
            color="white"
            line-width="2"
            padding="16"
            show-labels
            auto-draw
          ></v-sparkline>
          -->
          <chart
            :data="bySemCAP[1]"
            :label="bySemCAP[0]"
            :background="someRandomColor[2]"
            :options="{ responsive: true, maintainAspectRatio: false }"
          ></chart>
        </v-sheet>
        <v-divider class="my-2"></v-divider>
        <v-icon class="mr-2" small>mdi-clock</v-icon>
        <v-card-text class="pt-0">
          <v-container>
            <v-layout>
              <v-flex xs6>
                <div class="subheading font-weight-light grey--text">Current CAP
                  <div class="container">
                    <!--               <div
                :style="{
                  'background-color': someRandomColor[1],
                  width: (currentCAP / 5.0) * 100 + '%'
                }"
                    >{{ currentCAP }}/5.0</div>-->
                    <div>{{currentCAP}}/5.0</div>
                  </div>
                </div>
              </v-flex>
              <v-divider class="mx-3" inset vertical></v-divider>
              <v-flex xs6>
                <div class="subheading font-weight-light grey--text">Degree Progress
                  <div class="container">
                    <div>{{ totalMCEarned }}/{{ totalMCRequired }} Modular Credits</div>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <br>
      <br>
      <br>
      <br>
      <div class="moduleInfo">
        <button class="collapsible" @click="clickGrades">Grades Breakdown</button>
        <v-card>
          <v-data-table
            :headers="moduleCats"
            :items="person.modulesTaken"
            class="elevation-1"
            v-if="showGrades"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.moduleCode }}</td>
              <td class="text-xs-right">{{ props.item.moduleName }}</td>
              <td class="text-xs-right">{{ props.item.modularCredit }}</td>
              <td class="text-xs-right">{{ props.item.gradeEarned }}</td>
              <td class="text-xs-right">{{ props.item.whetherSU }}</td>
              <td class="text-xs-right">{{ props.item.moduleType }}</td>
              <td class="text-xs-right">{{ props.item.semesterTaken }}</td>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import chart from "/function/chart.js";
import SortedTablePlugin from "vue-sorted-table";
import Vue from "vue";
import db from "@/firebase";
Vue.use(SortedTablePlugin);

export default {
  name: "AcademicProgress",
  data() {
    return {
      showOverall: true,
      showGrades: false,
      tableMessage: "Click to sort",
      moduleCats: [
        { text: "Module Code", value: "moduleCode" },
        { text: "Module Name", value: "moduleName" },
        { text: "Modular Credits", value: "modularCredit" },
        { text: "Grade Obtained", value: "gradeEarned" },
        { text: "S/U Exercised?", value: "whetherSU" },
        { text: "Module Type", value: "moduleType" },
        { text: "Semester Taken", value: "semesterTaken" }
      ],
      moduleTableSortKey: "semesterTaken",
      moduleTableSortOrder: "asc",
      whatIf: [
        { newModuleCode: "" },
        { newModuleExpectedGrade: "" },
        {
          moduleList: []
        }
      ]
    };
  },
  firebase: {
    person: {
      source: db.ref("A0123456B"),
      asObject: true
    },
    degreq: {
      source: db.ref("DegreeRequirements"),
      asObject: true
    }
  },
  props: ["userName"],
  computed: {
    totalMCRequired() {
      var count = 0.0;
      for (var item in this.degreq.BusinessAnalytics) {
        count += this.degreq.BusinessAnalytics[item].number;
      }
      console.log("total MC required " + count);
      return count;
    },
    totalMCEarned() {
      var count = 0.0;
      for (var item in this.person.modulesTaken) {
        count += this.person.modulesTaken[item].modularCredit;
      }
      console.log("MC taken " + count);
      return count;
    },
    currentCAP() {
      var count = 0;
      var mc = 0;
      for (var item in this.person.modulesTaken) {
        var currMod = this.person.modulesTaken[item];
        if (currMod.whetherSU != "Y") {
          count +=
            this.person.modulesTaken[item].modularCredit *
            this.person.modulesTaken[item].gradeEarned;
          mc += this.person.modulesTaken[item].modularCredit;
        }
      }
      var cap = count / mc;
      console.log(cap);
      return cap.toFixed(2);
    },
    byModuleTypeProgress() {
      var dic = this.degreq.BusinessAnalytics;
      for (var index in dic) {
        var currType = dic[index].type;
        var count = 0;
        for (var id in this.modulesTaken) {
          var currMod = this.modulesTaken[id];
          if (currMod.moduleType == currType) {
            count += currMod.modularCredit;
          }
        }
        dic[index].earned = count;
        dic[index].percentage = (dic[index].earned / dic[index].number) * 100;
      }
      console.log(dic);
      return dic;
    },
    bySemCAP() {
      var res = {
        "Y1 S1": [],
        "Y1 S2": [],
        "Y2 S1": [],
        "Y2 S2": [],
        "Y3 S1": [],
        "Y3 S2": [],
        "Y4 S1": [],
        "Y4 S2": []
      };
      for (var index in this.person.modulesTaken) {
        var currMod = this.person.modulesTaken[index];
        var currSem = currMod.semesterTaken;
        var currCAP = currMod.gradeEarned;
        var currMC = currMod.modularCredit;
        res[currSem].push([currCAP, currMC]);
      }
      console.log(res);

      var res2 = [];
      for (var id in res) {
        var currSem = res[id];
        var totalGrade = 0;
        var totalMC = 0;
        for (var index in currSem) {
          var currMod = currSem[index];
          totalGrade += currMod[0] * currMod[1];

          totalMC += currMod[1];
        }
        if (totalMC != 0) {
          var currSAP = totalGrade / totalMC;
        } else {
          var currSAP = 0;
        }

        res2.push([id, currSAP.toFixed(2)]);
      }
      console.log(res2);
      var res3 = [[], []];
      for (var index in res2) {
        if (res2[index][1] != 0) {
          res3[0].push(res2[index][0]);
          res3[1].push(parseFloat(res2[index][1])).toFixed(2);
        }
      }
      console.log(res3);
      return res3;
    },
    randomColor() {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return "#" + randomColor;
    },
    someRandomColor() {
      var brightness = 150;
      function randomChannel(brightness) {
        var r = 255 - brightness;
        var n = 0 | (Math.random() * r + brightness);
        var s = n.toString(16);
        return s.length == 1 ? "0" + s : s;
      }
      return [
        "#" +
          randomChannel(brightness) +
          randomChannel(brightness) +
          randomChannel(brightness),
        "#" +
          randomChannel(brightness) +
          randomChannel(brightness) +
          randomChannel(brightness),
        "#" +
          randomChannel(brightness) +
          randomChannel(brightness) +
          randomChannel(brightness)
      ];
    }
  },
  methods: {
    clickOverallProgress() {
      if (this.showOverall == true) {
        this.showOverall = false;
      } else {
        this.showOverall = true;
      }
      var user = JSON.parse(this.userName);
      console.log(user);
    },
    clickGrades() {
      if (this.showGrades == true) {
        this.showGrades = false;
      } else {
        this.showGrades = true;
      }
    },
    updateSort(sortKey) {
      if (sortKey == this.moduleTableSortKey) {
        if (this.moduleTableSortOrder == "asc") {
          this.moduleTableSortOrder = "desc";
        } else {
          this.moduleTableSortOrder = "asc";
        }
      } else {
        this.moduleTableSortKey == sortKey;
        this.moduleTableSortOrder = "asc";
      }
    }
  },
  components: {
    chart
  }
};
</script>

<style>
.collapsible {
  background-color: #defcf3;
  color: dimgray;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.form-style-2 {
  max-width: 500px;
  padding: 20px 12px 10px 20px;
}
.form-style-2-heading {
  font-weight: bold;
  font-style: italic;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
  font-size: 15px;
  padding-bottom: 3px;
}
</style>
