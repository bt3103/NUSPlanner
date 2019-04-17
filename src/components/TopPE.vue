<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex grow pa-1>
          <v-card flat>
            <v-card-text>Specialisation distribution pie chart</v-card-text>
            <pie-chart :data="minorDistrib" suffix="%"></pie-chart>
          </v-card>
        </v-flex>
        <v-flex shrink pa-1>
          <v-select
            v-model="selectedSpecialisation"
            :menu-props="{ auto: true }"
            :items="specialisations"
            label="Choose a specialisation"
            placeholder="No Specialisation"
            attach="dropdown"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex pa-1 xs3 v-for="mod in modules">
          <v-card>
            <v-card-title>{{mod}}</v-card-title>
            <v-card-text>
              Average Class Size: {{minorModule[selectedSpecialisation][mod]['number']}}
              <br>
              Workload: {{minorModule[selectedSpecialisation][mod]['workload']}}
            </v-card-text>
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
      selectedSpecialisation: "No Specialisation",
      minorDistrib: [
        ["No Specialisation", 35],
        ["Financial Analytics", 40],
        ["Marketing Analytics", 25]
      ],
      minorModule: {
        "No Specialisation": {
          BT4222: { number: 72, workload: "3-0-0-3-4" },
          BT4016: { number: 27, workload: "2-1-0-3-4" },
          CS3244: { number: 100, workload: "2-1-0-3-4" },
          BT4212: { number: 36, workload: "3-0-0-3-4" }
        },
        "Financial Analytics": {
          BT4012: { number: 30, workload: "2-1-0-3-4" },
          BT4221: { number: 63, workload: "3-0-0-3-4" },
          BT4222: { number: 72, workload: "3-0-0-3-4" },
          IS4302: { number: 57, workload: "2-1-0-3-4" }
        },
        "Marketing Analytics": {
          BT4015: { number: 25, workload: "2-1-0-3-4" },
          BT4221: { number: 63, workload: "3-0-0-3-4" },
          BT4014: { number: 20, workload: "2-1-0-3-4" },
          IS4241: { number: 47, workload: "2-1-0-3-4" }
        }
      }
    };
  },
  computed: {
    modules() {
      console.log(this.minorModule[this.selectedSpecialisation]);
      var moduledic = this.minorModule[this.selectedSpecialisation];
      var res = [];
      for (var key in moduledic) {
        res.push(key);
      }
      console.log(res);
      return res;
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