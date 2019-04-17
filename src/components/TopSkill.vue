<template>
  <div>
      <v-container>

          <v-layout>
                        <v-flex
                grow
                pa-1
            >
                <v-card
                flat
                >
                <v-card-text>Industry Distribution Pie Chart</v-card-text>
                <pie-chart :data='industryDistrb' suffix="%"></pie-chart>
                </v-card>
            </v-flex>
              <v-flex
                shrink
                pa-1
            >
          <v-select
              v-model="selectedIndustry"
              :menu-props="{ auto: true }"
              :items="industries"
              label="Choose an industry"
              placeholder="E-commerce"
              attach="dropdown"
            ></v-select>
            </v-flex>

        </v-layout>
        <v-layout>
          <v-flex pa-1 xs3 v-for="skill in skills" >
            <v-card>
              <v-card-title primary-title>{{skill}}</v-card-title>
                <v-card-text><b>{{industrySkillCompan[selectedIndustry][skill]}}%</b> companies requested this skill</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
import db from "@/firebase";

export default {
  name: "TopSkill",
  data() {
    return {
        selectedIndustry:'E-commerce',
      list: [
        {
          name:'Python'
        },
        {
          name:'Hadoop'
        },
        { name:'SQL'},
        {
          name:'Java'
        }
      ],
      industries:['E-commerce', 'Finance', 'Technology', 'Healthcare'],
      industryDistrb:[
        ['E-commerce', 26],
        ['Finance', 22],
        ['Technology', 32],
        ['Healthcare', 15],
        ['Others', 5]
      ],
      industryDetail:{
        'E-commerce':{'skills':['SQL', 'Hadoop', 'Python', 'R'],'numbCompany':[90, 65, 95, 60]},
        'Finance':{'skills':['VBA', 'SQL', 'Python', 'JAVA'],'numbCompany':[85, 60, 90, 75]},
        'Technology':{'skills':['JAVA', 'C++', 'Javascript','Python'],'numbCompany':[95, 80, 92, 95]},
        'Haelthcare':{'skills':['SQL', 'Python', 'R', 'Matlab'],'numbCompany':[70, 95, 90, 65]}
      },
      industrySkillCompan:{
        'E-commerce':{'SQL':90, 'Hadoop':65, 'Python':95, 'R':60},
        'Finance':{'VBA':85, 'SQL':60, 'Python':90, 'Java':75},
        'Technology':{'Java':95, 'C++':80, 'Javascript':92, 'Python':95},
        'Healthcare':{'SQL':70, 'Python':95, 'R':90, 'Matlab':65}
      },
    };
  },
  computed:{
      skills(){
          console.log(this.recommendation.topSkill)
          return this.recommendation.topSkill[this.selectedIndustry]
      }
  },
  firebase:{
      recommendation:{
        source:db.ref('recommendation'),
        asObject:true}
  }
};
</script>