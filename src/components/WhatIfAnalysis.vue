<template>
  <div :style="{ 'padding-left': '230px', width: '95%' }" >
    <div class="text-xs-center">
      <v-container fluid >
        <v-btn block @click='clickProgress'>Current Progress ({{progressMessage}})</v-btn>
        <v-layout row v-if='progressShown'>
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
        <v-layout>
          <v-flex xs12>
        <v-btn block @click="runWhatIf">
          Click To Run What-If &emsp; 
        </v-btn>
        </v-flex>
        </v-layout>
        <v-layout v-if='showWhatIf'>
          <v-flex v-if="showWhatIf">
            <v-btn block
              v-if="graduationStatisfied"
              color="green"
              @click='clickToExpandWhatIf'
            >Congratulations! All requirements have been met. {{message}}</v-btn>
            <v-btn block
              v-if="!graduationStatisfied"
              color="orange"
              @click='clickToExpandWhatIf'
            >Sorry. You have not met all graduation requirements.{{message}}</v-btn>
          </v-flex>
          </v-layout>
          <v-layout row wrap v-if='detailsExpanded'>
          <v-flex xs4 pa-1>
            <v-card >
              <v-card-title primary-title>
                Programme Requirements
                </v-card-title>
                <v-card-text>
                  <div v-for='i of program'>
                    <div v-if='requirementsSatisfaction[i]["satisfied"]==true'>
                      <v-icon color='green'>far fa-check-circle</v-icon> {{i}}
                      </div>
                      <div v-else>
                        <v-icon color='red'>far fa-times-circle</v-icon> {{i}}, {{requirementsSatisfaction[i]['needed']}} more MCs needed
                        </div>
                    </div>
                  </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 pa-1>
            <v-card >
              <v-card-title primary-title>
                University Level Requirements
                </v-card-title>
                <v-card-text>
                  <div v-for="i of ulr">
                    <div v-if='requirementsSatisfaction[i]["satisfied"]==true'>
                      <v-icon color='green'>far fa-check-circle</v-icon> {{i}}
                      </div>
                      <div v-else>
                        <v-icon color='red'>far fa-times-circle</v-icon> {{i}}, {{requirementsSatisfaction[i]['needed']}} more MCs needed
                        </div>
                    </div>
                  </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs4 pa-1>
            <v-card >
              <v-card-title primary-title>
                Overall Requirements
                </v-card-title>
                <v-card-text>
                  <div v-for='i of overall'>
                    <div v-if='requirementsSatisfaction[i]["satisfied"]==true'>
                      <v-icon color='green'>far fa-check-circle</v-icon> {{i}}
                      </div>
                      <div v-else>
                        <v-icon color='red'>far fa-times-circle</v-icon> {{i}}, {{requirementsSatisfaction[i]['needed']}} more MCs needed
                        </div>
                    </div>
                  </v-card-text>
            </v-card>
          </v-flex>
          </v-layout>
        <v-layout row wrap>
          
          <v-flex xs6 pa-1>
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
                    <td class="text-xs-right">{{ props.item.modularCredit }}</td>
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
          <v-flex xs6 pa-1>
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
<!--           <v-fab-transition>
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
              <v-icon>far fa-play-circle</v-icon>
            </v-btn>
          </v-fab-transition> -->

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
      progressMessage:'Click to hide',
      progressShown:true,
      selected: [],
      message:' Click to see details.',
      addModuleMSG: "Double Click to Add Module",
      removeModuleMSG: "Double Click to Remove Module",
      runWhatIfMSG: "Click to run What-If Analysis",
      ulr:['GEH', 'GES', 'GER', 'GET', 'GEQ'],
      program:['Core','Internship', 'PE Group A', 'PE Group B', 'PE Level 4', 'PE Total'],
      overall:['Overall'],
      detailsExpanded:false,
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
        { text: "MC", value: "modularCredit" }
      ],
      requirementsSatisfaction:[],
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
    },
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
            count += currMod.modularCredit;
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
      var bzaMod = [];
      var allMod = [];
      for(var mod of this.nusmodules){
        allMod.push(mod)
      }
      for(var mod of this.bzamodules){
        bzaMod.push(mod)
      }
      
      for (var module of allMod) {
        var isbza = false;
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
              modularCredit: parseInt(module.modularCredit)
            };
            all.push(newMod);
          } else {
            var newMod = {
              moduleCode: module.moduleCode,
              moduleType: "Unrestricted Electives",
              modularCredit: parseInt(module.modularCredit)
            };
            all.push(newMod);
          }
        }
      }
      console.log(all[10]);
      console.log(this.bzamodules)
      return all;
    },
    simplifiedBAMod(){
      var data = {}
      for(var mod of this.bzamodules){
        var modCode = mod.moduleCode
        var modType = mod.moduleType
        var pegroup = mod.PEGroup
        var mc = mod.modularCredit
        if(pegroup){
          data[modCode]=['PE'+pegroup, mc]
        }else if(modType == 'Core Modules'){
          data[modCode]=['Core',mc]
        }else if(modType == 'Internship Requirements'){
          data[modCode]=['Internship',mc]
        }
      }
      return data
    }
  },
  methods: {
    clickToExpandWhatIf(){
      if(this.detailsExpanded){
        this.detailsExpanded = false
        this.message = ' Click to see details.'
      }else{
        this.detailsExpanded=true
        this.message=' Click to hide details.'
      }
    },
    clickProgress(){
      if(this.progressShown){
        this.progressShown = false;
        this.progressMessage='Click to show'
      }else{
        this.progressShown = true;
        this.progressMessage = 'Click to hide'
      }
    },
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
            modularCredit: moduleObj.modularCredit,
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
            modularCredit: moduleObj.modularCredit,
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
      console.log(this.bzamodules)
      if(this.requirementsSatisfaction){
        this.requirementsSatisfaction = []
      }
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
        Internship: 12,
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
        Internship: 0,
        total: 0
      };
      
      this.showWhatIf = true;
      var currModules = []
      for(var i of this.person.modulesTaken){
          currModules.push(i)
      }
      console.log(currModules)
      console.log('retrieved current modules')
      console.log(this.whatIf.moduleList)
      if(this.whatIf.moduleList){
        for(var mod of this.whatIf.moduleList){
          console.log(mod)
        currModules.push(mod);}}
      
      // check each of the modules
      console.log('pushed whatif modules')
      console.log(currModules)
      function getModule(moduleCode, moduleList) {
        console.log('get module')
        var module = '';
        for (var mod of moduleList) {
          if ((mod.moduleCode = moduleCode)) {
            module = mod;
            
          }
        }
        return module;
      }
      for (var currMod of currModules) {
        //var module = getModule(currMod.moduleCode, this.bzamodules);
        //console.log(module)
        var currModCode = currMod.moduleCode
        var currType = ''
        if(currModCode in this.simplifiedBAMod){
          currType = this.simplifiedBAMod[currModCode][0];
          console.log(currType)
          var MC=this.simplifiedBAMod[currModCode][1];
        }else{
          var MC=currMod.modularCredit
        }
        var modGroup = currMod.moduleCode.slice(0, 3);
        var modLevel = currMod.moduleCode.slice(3, 4);
        if (modGroup.slice(0,2) == 'GE') {
          finished[modGroup] += MC;
        } else if (currType) {
          finished[currType] += MC;
          if (currType.slice(0,2) == 'PE'){
            finished.PE += MC;
            if(modLevel == "4"){
              finished.PE4 += MC;
            }
          } 
        }
        finished.total += MC;
      }
      console.log('updating done')
      console.log(finished)

      for(var key in requirements){
        console.log(requirements[key] + ' '+finished[key])
        var temp=''
        if(key == 'PEA'){
          temp = 'PE Group A'
        }else if(key == 'PEB'){
          temp = 'PE Group B'
        }else if(key == 'PE4'){
          temp = 'PE Level 4'
        }else if(key == 'PE'){
          temp = 'PE Total'
        }else if(key=='total'){
          temp = 'Overall'
        }else{
          temp = key
        }
        if( (requirements[key] <= finished[key])){
          this.requirementsSatisfaction[temp]={'satisfied':true}
        }else{
          var needed = requirements[key] - finished[key]
          this.requirementsSatisfaction[temp]={'satisfied':false,'needed': needed}
        }
      }
      console.log('has taken')
      console.log(this.requirementsSatisfaction)

      var allFinished = false;
      for (var cat of finished) {
        if (finished[cat] == requrequirements[cat]) {
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
  }
};
</script>
