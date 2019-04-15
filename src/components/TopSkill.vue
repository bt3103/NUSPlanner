<template>
  <div>
      <v-container>
          <v-layout>
              <v-flex
                grow
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
            <v-flex
                shrink
                pa-1
            >
                <v-card
                dark
                color="green darken-1"
                >
                <v-card-text>Pie chart to show industry distribution</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout>
          <v-flex pa-1 xs3 v-for="skill in skills" >
            <v-card>{{skill}}
                <br />+ # companies required this skill
                <br />+ avg time spent on acquiring the skill
                <br />+ # NUS modules relevant to the skill
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
      industries:['E-commerce', 'Finance', 'Technology', 'Healthcare']
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