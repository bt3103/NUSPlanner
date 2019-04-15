<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex grow pa-1>
          <v-card dark color="green darken-3">
            <v-card-text>line chart to show proportion taking minor over the years</v-card-text>
          </v-card>
        </v-flex>
        <v-flex shrink pa-1>
          <v-card dark color="green darken-1">
            <v-card-text>Pie chart to show minor distribution (avg)</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex pa-1 xs3 v-for="skill in list" :key="skill.name">
          <v-card>
            {{skill.name}}
            <br>+ line chart showing # students over the years
            <br>+ avg MCs taken
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase";

export default {
  name: "TopMinor",
  data() {
    return {
      list: [
        {
          name: "Economics"
        },
        {
          name: "Finance"
        },
        { name: "Statistics" },
        {
          name: "Healthcare Analytics"
        }
      ]
    };
  },
  firebase: {
    recommendation: {
      source: db.ref("recommendation"),
      asObject: true
    }
  }
};
</script>