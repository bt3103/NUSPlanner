<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex grow pa-1>
          <v-card flat>
            <v-card-text>Trend in proportion of students taking a minor</v-card-text>
            <line-chart :data="minorProportionData" suffix="%"></line-chart>
          </v-card>
        </v-flex>
        <v-flex shrink pa-1>
          <v-card flat>
            <v-card-text>Minor distribution pie chart</v-card-text>
            <pie-chart :data="minorDistrb" suffix="%"></pie-chart>
          </v-card>
        </v-flex>
      </v-layout>
      <!--       <v-layout>
        <v-flex pa-1 xs3 v-for="skill in list" :key="skill.name">
          <v-card>
            {{skill.name}}
            <br>+ line chart showing # students over the years
            <br>+ avg MCs taken
          </v-card>
        </v-flex>
      </v-layout>-->
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
      ],
      minorProportionData: [
        [2010, 45],
        [2011, 42],
        [2012, 43],
        [2013, 51],
        [2014, 50],
        [2015, 53],
        [2016, 55],
        [2017, 56],
        [2018, 57]
      ],
      minorDistrb: [
        ["Economics", 31.9],
        ["Statistics", 28.2],
        ["Finance", 20.4],
        ["Healthcare Analytics", 15.6],
        ["Others", 3.9]
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