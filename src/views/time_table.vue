<template lang="html">
  <div>
    <div class="sidebar"><sidebar /></div>
    <div class="selection">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
              v-model="moduleList"
              :menu-props="{ auto: true }"
              :items="modules"
              label="Add Modules to TimeTable"
              placeholder="Module Code"
              attach="dropdown"
            ></v-select>
            <v-btn block color="teal lighten-2" dark @click="addModule();"
              >Add Module</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn color="teal lighten-2" dark @click="changeLayout();"
        >Change Layout</v-btn
      >
      <v-btn color="teal lighten-2" dark @click="switchTable();">{{
        table.text
      }}</v-btn>
      <v-btn color="teal lighten-2" dark @click="clearTable();"
        >Clear TimeTable</v-btn
      >
    </div>
    <div class="horizontal_timetable" v-show="empty_horizontal">
      <JqxScheduler :theme="'material'" ref="myScheduler"
        :width="getWidth" :height="500" :source="dataAdapter" :date="date"  :view="'weekView'" :showLegend="true"
        :appointmentDataFields="appointmentDataFields" :views="views"  :resources="resources" 
      />
    </div>
    <div class="exam_table" v-show="examtable">
      <img src=../assets/examtable.png width="600px" height="150px" />
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";

export default {
  name: "time_table",
  data() {
    return {
      table: {
        text: "Exam Table"
      },
      horizontal: true,
      moduleAdded: false,
      examtable: false,
      moduleList: [],
      modules: [
        "BT3101 Business Analytics Capstone Project",
        "BT3102 Computational Methods for Business Analytics",
        "BT3103 Application Systems Development for Business Analytics"
      ],
      getWidth: '700',
      date: new jqx.date(2019, 8, 12),
      appointmentDataFields: 
                {
                    from: 'start',
                    to: 'end',
                    id: 'id',
                    description: 'description',
                    location: 'place',
                    subject: 'subject',
                    resourceId: 'calendar'
                },
      resources:
                {
                    colorScheme: 'scheme05',
                    dataField: 'calendar',
                    source: new jqx.dataAdapter(this.source)
                },
      views:
                [
                    { type: 'dayView', appointmentsRenderMode: 'exactTime' },
                    { type: 'weekView', appointmentsRenderMode: 'exactTime' },
                    { type: 'monthView', appointmentsRenderMode: 'exactTime' }
                ]
    };
  },
  components: {
    sidebar,
    JqxScheduler
  },
  methods: {
    addModule: function() {
      this.moduleAdded = true;
    },
    changeLayout: function() {
      this.horizontal = !this.horizontal;
    },
    switchTable: function() {
      this.examtable = !this.examtable;
      this.table.text = this.examtable ? "Time Table" : "Exam Table";
      this.moduleAdded = !this.moduleAdded;
    },
    clearTable: function() {
      this.horizontal = true;
      this.moduleAdded = false;
    }
  },
  computed: {
    empty_horizontal() {
      return this.horizontal && !this.moduleAdded && !this.examtable;
    }
  },
  beforeCreate: function () {
            const generateAppointments =  function () {
                const appointments = new Array();
                const appointment1 = {
                    id: 'id1',
                    description: 'Probability and statistics',
                    location: 'Utown-Audi2',
                    subject: 'ST2334',
                    calendar: 'CORE',
                    start: new Date(2019, 8,12, 10, 0, 0),
                    end: new Date(2019, 8, 12, 12, 0, 0)
                };
                const appointment2 = {
                    id: 'id2',
                    description: 'Global Environmental Issues',
                    location: 'LT1',
                    subject: 'GEH1025',
                    calendar: 'URL',
                    start: new Date(2019,8,12, 14, 0, 0),
                    end: new Date(2019,8, 12, 16, 0, 0)
                }
                appointments.push(appointment1);
                appointments.push(appointment2);
                return appointments;
            }
            this.source =
                {
                    dataType: 'array',
                    dataFields: [
                        { name: 'id', type: 'string' },
                        { name: 'description', type: 'string' },
                        { name: 'location', type: 'string' },
                        { name: 'subject', type: 'string' },
                        { name: 'calendar', type: 'string' },
                        { name: 'start', type: 'date' },
                        { name: 'end', type: 'date' }
                    ],
                    id: 'id',
                    localData: generateAppointments()
                };
            this.dataAdapter = new jqx.dataAdapter(this.source);
        },
        mounted: function () {
            this.$refs.myScheduler.ensureAppointmentVisible('id1');    
        }
};
</script>

<style scoped>
.sidebar {
  background-color: #ffffff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 20%;
  float: left;
}

.horizontal_timetable {
  display: flex;
  justify-content: left;
  align-items: left;
  list-style-type: none;
  flex: 1;
}
</style>
