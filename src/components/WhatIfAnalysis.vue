<template>
  <div>
    <div class="text-xs-center">
      <v-container fluid>
        <v-layout row>
          <v-flex xs4 v-for="reqtype of byModuleTypeProgress" :key="type">
            {{ reqtype.type }}
            <br>
            <br>
            <v-progress-circular
              :rotate="360"
              :size="100"
              :width="15"
              :value="reqtype.percentage"
              color="teal"
            >{{ reqtype.earned }}/{{ reqtype.number }} MC</v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div>
      <v-container>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card>
              <v-card-title>Table of All Modules
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table :headers="headers" :items="allModules" :search="search">
                <template slot="items" slot-scope="props">
                  <tr @dblclick="addModule(props.item)" :title="addModuleMSG">
                    <td class="text-xs-right">{{ props.item.moduleCode }}</td>
                    <td class="text-xs-right">{{ props.item.moduleType }}</td>
                    <td class="text-xs-right">{{ props.item.modularCredits }}</td>
                  </tr>
                </template>
                <v-alert
                  v-slot:no-results
                  :value="true"
                  color="error"
                  icon="warning"
                >Your search for "{{ search }}" found no results.</v-alert>
              </v-data-table>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card>
              <v-card-title>Table of Selected Modules
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search2"
                  append-icon="search2"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="[
                    { text: 'Module Code', value: 'moduleCode' },
                    { text: 'Module Type', value: 'moduleType' }
                  ]"
                :items="whatIf.moduleList"
                :search="search2"
              >
                <template slot="items" slot-scope="props">
                  <tr @dblclick="removeModule(props.item)" :title="removeModuleMSG">
                    <td class="text-xs-right">{{ props.item.moduleCode }}</td>
                    <td class="text-xs-right">{{ props.item.moduleType }}</td>
                  </tr>
                </template>
                <v-alert
                  v-slot:no-results
                  :value="true"
                  color="error"
                  icon="warning"
                >Your search for "{{ search }}" found no results.</v-alert>
              </v-data-table>
            </v-card>
          </v-flex>
          <v-flex xs10 offset-xs1></v-flex>
          <v-fab-transition>
            <v-btn
              v-show="!hidden"
              color="pink"
              dark
              absolute
              bottom
              right
              fab
              :title="runWhatIfMSG"
              @click="runWhatIf"
            >
              <v-icon>check_circle</v-icon>
            </v-btn>
          </v-fab-transition>
          <v-flex v-if="showWhatIf">
            <v-alert
              :value="graduationStatisfied"
              color="green"
            >Congratulations! All requirements have been met.</v-alert>
            <v-alert
              :value="!graduationStatisfied"
              color="orange"
            >Sorry. You have not met all graduation requirements.</v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import db from "@/firebase";

export default {
  name: "WhatIfAnalysis",
  data() {
    return {
      showWhatIf: false,
      showWhatIfTable: false,
      tableMessage: "Click to sort",
      whatIfClicked: false,
      graduationStatus: "Unsatisfied",
      graduationStatisfied: false,
      expectedGrade: 0,
      selected: [],
      addModuleMSG: "Double Click to Add Module",
      removeModuleMSG: "Double Click to Remove Module",
      runWhatIfMSG: "Click to run What-If Analysis",
      whatIf: [
        {
          moduleList: []
        }
      ],
      search: "",
      search2: "",
      headers: [
        { text: "Module Code", value: "moduleCode" },
        { text: "Module Type", value: "moduleType" },
        { text: "MC", value: "MC" }
      ],
      fab: false
    };
  },
  firebase: {
    bzamodules: {
      source: db.ref("BZACurrModules")
    },
    person: {
      source: db.ref("A0123456B"),
      asObject: true
    },
    degreq: {
      source: db.ref("DegreeRequirements"),
      asObject: true
    },
    nusmodules: {
      source: db.ref("nusModules")
    }
  },
  computed: {
    byModuleTypeProgress() {
      var dic = this.degreq.BusinessAnalytics;
      for (var index in dic) {
        var currType = dic[index].type;
        var count = 0;
        for (var id in this.person.modulesTaken) {
          var currMod = this.person.modulesTaken[id];
          if (currMod.moduleType == currType) {
            count += currMod.modularCredits;
          }
        }
        dic[index].earned = count;
        dic[index].percentage = (dic[index].earned / dic[index].number) * 100;
      }
      console.log(this.person);
      return dic;
    },
    allModules() {
      var all = [];
      var allMod = this.nusmodules;
      var bzaMod = this.bzamodules;
      var isbza = false;
      for (var module of allMod) {
        for (var bzaModule of bzaMod) {
          if (module.moduleCode == bzaModule.moduleCode) {
            all.push(bzaModule);
            isbza = true;
          }
        }
        if (!isbza) {
          if (
            ["GEH", "GEM", "GET", "GEQ", "GER"].includes(
              module.moduleCode.slice(0, 3)
            )
          ) {
            var newMod = {
              moduleCode: module.moduleCode,
              moduleType: "University Level Requirements",
              modularCredits: parseInt(module.modularCredit)
            };
            all.push(newMod);
          } else {
            var newMod = {
              moduleCode: module.moduleCode,
              moduleType: "Unrestricted Electives",
              modularCredits: parseInt(module.modularCredit)
            };
            all.push(newMod);
          }
        }
        isbza = false;
      }
      console.log(all[10]);
      return all;
    }
  },
  methods: {
    addModule(moduleObj) {
      console.log(moduleObj.moduleCode);
      console.log(this.whatIf.moduleList);
      if (this.whatIf.moduleList) {
        var count = 0;
        for (var module of this.whatIf.moduleList) {
          if (moduleObj.moduleCode == module.moduleCode) {
            count += 1;
          }
        }
        console.log(count);
        if (count == 0) {
          this.whatIf.moduleList.push({
            moduleCode: moduleObj.moduleCode,
            moduleType: moduleObj.moduleType,
            MC: moduleObj.modularCredits,
            PEGroup: moduleObj.PEGroup,
            expectedGrade: 5
          });
        } else {
          alert("You have already added this moduel!");
        }
      } else {
        this.whatIf.moduleList = [
          {
            moduleCode: moduleObj.moduleCode,
            moduleType: moduleObj.moduleType,
            MC: moduleObj.modularCredits,
            PEGroup: moduleObj.PEGroup,
            expectedGrade: 5
          }
        ];
      }
      // show what-if module table only when there is module added
      console.log(this.whatIf.moduleList);
      if (this.whatIfClicked) {
        this.runWhatIf();
      }

    },
    removeModule(moduleObject) {
      console.log(moduleObject);
      if (!this.whatIf.moduleList) {
        alert("You have not added any modules yet.");
      } else {
        var hasMod = false;
        for (var index in this.whatIf.moduleList) {
          if (
            this.whatIf.moduleList[index].moduleCode === moduleObject.moduleCode
          ) {
            hasMod = true;
            this.whatIf.moduleList.splice(index, 1);
            console.log(!this.whatIf.moduleList);
            // hide what-if module table if all modules have been removrd
            if (!this.whatIf.moduleList.length) {
              this.showWhatIfTable = false;
            }
          }
        }
        if (!hasMod) {
          alert("You have not added this module.");
        }
      }
      console.log(moduleObject);
      if (this.whatIfClicked) {
        this.runWhatIf();
      }
    },
    runWhatIf() {
      //some simple logic here that decides whether graduatable using only MCs taken
      //check that satisfied
      //1. all cores
      //2. 1 GEM, 1 GER, 1 GEQ, 1 GES, 1 GEH
      //3. 12 MC internship / dissertation
      //4. at least 2 PE.A, at least 2 PE.B, at least 5 modules level 4
      var requirements = {
        GES: 4,
        GEH: 4,
        GER: 4,
        GET: 4,
        GEQ: 4,
        Core: 72,
        PEA: 8,
        PEB: 8,
        PE4: 20,
        PE: 24,
        internship: 12,
        total: 160
      };
      var finished = {
        GES: 0,
        GEH: 0,
        GER: 0,
        GET: 0,
        GEQ: 0,
        Core: 0,
        PEA: 0,
        PEB: 0,
        PE4: 0,
        PE: 0,
        internship: 0,
        total: 0
      };
      function getModule(moduleCode) {
        var module = [];
        for (var mod of this.bzamodules) {
          if ((mod.moduleCode = moduleCode)) {
            module = mod;
          }
        }
        return module;
      }
      this.showWhatIf = true;
      var currModules = person.modulesTaken;
      currModules = currModules.push(this.whatIf.moduleList);
      // check each of the modules
      for (var currMod of currModules) {
        var module = getModule(currMod.moduleCode);
        var currType = module.moduleType;
        var PEGroup = module.PEGroup;
        var MC = module.modularCredits;
        var modGroup = currMod.moduleCode.slice(0, 3);
        var modLevel = currMod.moduleCode.slice(3, 4);
        if (currType == "University Requirements") {
          finished[modGroup] += MC;
        } else if (currType == "Programme Electives") {
          if (PEGroup == "A") {
            finished.PEA += MC;
          } else if (PEGroup == "B") {
            finished.PEB += MC;
          } else {
            finished.PEC += MC;
          }
          if (modLevel == "4") {
            finished.PE4 += MC;
          }
          finished.PE += MC;
        } else if (currType == "Core Modules") {
          finished.Core += MC;
        } else {
          finished.internship += MC;
        }
        finished.total += MC;
      }
      var allFinished = false;
      for (var cat of finished) {
        if (finished.cat == required.cat) {
          allFinished = true;
        } else {
          allFinished = false;
        }
      }
      if (allFinished) {
        this.graduationStatus = "Satisfied";
      } else {
        this.graduationStatus = "Satisfied";
      }
      this.graduationStatisfied = allFinished;
    },
    checkfirebase() {
      console.log(this.bzamodules);
    }
  }
};
</script>
