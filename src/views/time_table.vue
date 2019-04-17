<template lang="html">
  <div>
    <div class="sidebar"><sidebar /></div>
    <div class="table" v-show="show_plantable">

    <template>
  <v-layout>
    <v-flex>
      <v-sheet height="400">
        <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          color="primary"
          type="week"
        >

          <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
            <template v-for="event in eventsMap[date]">
              <!-- timed events -->
              <div
                v-if="event.time"
                :key="event.title"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                class="my-event with-time"
                @click="open(event);locate(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>
</div>
    <div class="exam_table" v-show="show_examtable">
      <template>
      <v-data-table :headers="headers" :items="modulelist" item-text="title" class="examtable">
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
          <template v-slot:activator="{ on }">
          <span v-on="on">{{ props.header.text }}</span>
        </template>
        <span>{{ props.header.text }}</span>
      </v-tooltip>
    </template>
    <template v-slot:items="props">
      <td class="text-xs-middle">{{ props.item.title}}</td>
      <td class="text-xs-middle">{{ props.item.venue }}</td>
      <td class="text-xs-middle">{{ props.item.exam }}</td>
    </template>
        </v-data-table>
      </template>
    </div>
    <div class="selection">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>

            <v-select
              v-model="module"
              :menu-props="{ auto: true }"
              :items="newmodules"
              item-text="title"
              label="Add Modules to TimeTable"
              placeholder="Module Code"
              attach="dropdown"
            >
            </v-select>
            <v-btn color="teal lighten-2" dark @click="addModule(module)"
              >Add Module</v-btn
            >
            <v-btn color="teal lighten-2" dark @click="switchTable();">{{
            table.text
            }}</v-btn>
            <v-btn color="teal lighten-2" dark @click="removeModule(module_locate)"
              >Remove Module</v-btn
            >

          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";
import db from "@/firebase";

export default {
  name: "time_table",
  firebase: {
    newmodules: {
      source: db.ref("newmodules")
    },
    modulelist: {
      source: db.ref("wkplan")
    }
  },
  data() {
    return {
      today: "2019-04-16",
      newmodules: [],
      modulelist: [],
      module_locate: "",
      module: "BT3103",
      table: {
        text: "Exam Table"
      },
      horizontal: true,
      moduleAdded: false,
      show_examtable: false,
      show_plantable: true,
      headers: [
        {
          text: "exam modules",
          align: "middle",
          sortable: false,
          value: "title"
        },
        { text: "venue", value: "venue" },
        { text: "date/time", value: "exam" }
      ]
    };
  },
  components: {
    sidebar
  },
  methods: {
    open(event) {
      alert(event.title + "\n" + event.venue + "\n" + event.time);
    },
    locate(event){
      this.module_locate = event.title;
      //console.log(this.module_locate);
    },
    getnewMod(module) {
      for (var mod in this.newmodules) {
        if (this.newmodules[mod]["title"] == module) {
          //console.log(this.newmodules[mod])
          //console.log(this.newmodules[mod]["exam"])
          return this.newmodules[mod];
        }
      }
    },
    getoldMod(module) {
      for (var mod in this.modulelist) {
        if (this.modulelist[mod]["title"] == module) {
          //console.log(this.newmodules[mod])
          //console.log(this.newmodules[mod]["exam"])
          return this.modulelist[mod];
        }
      }
    },
    removeModule: function(module_locate) {
      var mod = this.getoldMod(module_locate);
      var title = mod["title"];
      //console.log(title);
      for (var i = 0; i < this.modulelist.length; i++) {
        if (this.modulelist[i].title == title) {
          //console.log(this.modulelist[i].title)
          //console.log(this.modulelist.length);
          alert(" You have removed module "+module_locate +" !");
          this.modulelist.splice(i,1);
          //console.log(this.modulelist.length);
          break;
        }
      }
    },

    addModule: function(module) {
      //check exam first
      var flag = true;
      var mod = this.getnewMod(module);
      //console.log(mod)
      var title = mod["title"];
      var exam = mod["exam"];
      var date = mod["date"];
      var time = mod["time"];
      var key = mod[".key"];
      //console.log(key);
      for (var i = 0; i < this.modulelist.length; i++) {
        if (this.modulelist[i].title == title) {
          //console.log(this.modulelist[i].title)
          alert(module + " already existed in timetable!");
          flag = false;
          break;
        }
        if (
          (this.modulelist[i].exam != "no exam") &
          (this.modulelist[i].exam == exam)
        ) {
          //console.log(this.modulelist[i].title)
          alert(
            module + " exam time clash with " + this.modulelist[i].title + "!"
          );
          flag = false;
          break;
        }
        if (
          (this.modulelist[i].date == date) &
          (this.modulelist[i].time == time)
        ) {
          alert(
            module +
              " lecture time clash with " +
              this.modulelist[i].title +
              "!"
          );
          flag = false;
          break;
        }
        if ((flag == true) & (i == this.modulelist.length - 1)) {
          //console.log(this.modulelist.length);
          //console.log(mod);
          this.modulelist.push(mod);
          alert(
            module + " has been successfully added !"
          );
          //console.log(this.modulelist.length);
          break;
        }
      }
    },

    switchTable: function() {
      this.show_examtable = !this.show_examtable;
      this.show_plantable = !this.show_plantable;
      this.table.text = this.show_examtable ? "Time Table" : "Exam Table";
    }
  },
  computed: {
    empty_horizontal() {
      return this.horizontal && !this.moduleAdded && !this.examtable;
    },
    eventsMap() {
      const map = {};
      this.modulelist.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
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

.exam_table {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
</style>
<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;

  &.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
}
</style>
