<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex grow pa-1>
          <v-select
            v-model="selectedSpecialisation"
            :menu-props="{ auto: true }"
            :items="specialisations"
            label="Choose a specialisation"
            placeholder="No Specialisation"
            attach="dropdown"
          ></v-select>
        </v-flex>
        <v-flex shrink pa-1>
          <v-card dark color="green darken-1">
            <v-card-text>Pie chart to show specialisation distribution</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex pa-1 xs3 v-for="mod in modules">
          <v-card>
            {{mod}}
            <br>+ cohort size line chart
            <br>+ whether have exam
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase";

export default {
  name: "TopPE",
  data() {
    return {
      specialisations: [
        "No Specialisation",
        "Financial Analytics",
        "Marketing Analytics"
      ],
      selectedSpecialisation: "No Specialisation"
    };
  },
  computed: {
    modules() {
      console.log(this.recommendation.topPE);
      
      return this.recommendation.topPE[this.selectedSpecialisation];
    }
  },
  firebase: {
    recommendation: {
      source: db.ref("recommendation"),
      asObject: true
    }
  }
};
</script>