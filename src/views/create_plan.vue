<template>
  <div>
    <div class="sidebar"><sidebar /></div>
    <div class='selfplan'>
      <v-data-table
        :headers="headers"
        :items="modules"
      >
        <template v-slot:items="props">
          <td>
            <v-edit-dialog
              :return-value.sync="props.item.semester"
              lazy
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            > {{ props.item.semester }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.semster"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td>
            <v-edit-dialog
              :return-value.sync="props.item.module1"
              lazy
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            > {{ props.item.module1 }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.module1"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td>
            <v-edit-dialog
              :return-value.sync="props.item.module2"
              lazy
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            > {{ props.item.module2 }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.module2"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td>
            <v-edit-dialog
              :return-value.sync="props.item.module3"
              lazy
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            > {{ props.item.module3 }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.module3"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td>
            <v-edit-dialog
              :return-value.sync="props.item.module4"
              lazy
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            > {{ props.item.module4 }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.module4"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td>
            <v-edit-dialog
              :return-value.sync="props.item.module5"
              lazy
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            > {{ props.item.module5 }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.module5"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
        </template>
      </v-data-table>
      <v-btn v-model="fab" color="teal lighten-2" :title="msg" dark fab @click="back()">
        <v-icon>keyboard_backspace</v-icon>
      </v-btn>
    </div>

    <!-- <v-modbar v-model="mod" :timeout="3000" :color="modColor">
      {{ modText }}
      <v-btn flat @click="mod = false">Close</v-btn>
    </v-modbar> -->
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";
import router from '@/router/index.js';

export default {
  name: "create_plan",
  components: {
    sidebar
  },
  data () {
      return {
        msg: "Back to Study Plan",
        mod: false,
        modColor: '',
        modText: '',
        max25chars: v => v.length <= 25 || 'Input too long!',
        pagination: {},
        headers: [
          {
            text: 'Semester',
            align: 'left',
            value: 'semester'
          },
          { text: 'Module 1',sortable: false, value: 'module1' },
          { text: 'Module 2', sortable: false, value: 'module2' },
          { text: 'Module 3', sortable: false, value: 'module3' },
          { text: 'Module 4', sortable: false, value: 'module4' },
          { text: 'Module 5', sortable: false, value: 'module5' },
          { text: 'Overload Modules',sortable: false,  value: 'overloadmods' }
        ],
        modules: [
          {
            semester: 'Frozen Yogurt',
            module1: 159,
            module2: 6.0,
            module3: 24,
            module4: 4.0,
            module5: '1%'
          },
          {
            semester: 'Ice cream sandwich',
            module1: 237,
            module2: 9.0,
            module3: 37,
            module4: 4.3,
            module5: '1%'
          },
          {
            semester: 'Eclair',
            module1: 262,
            module2: 16.0,
            module3: 23,
            module4: 6.0,
            module5: '7%'
          },
          {
            semester: 'Cupcake',
            module1: 305,
            module2: 3.7,
            module3: 67,
            module4: 4.3,
            module5: '8%'
          },
          {
            semester: 'Gingerbread',
            module1: 356,
            module2: 16.0,
            module3: 49,
            module4: 3.9,
            module5: '16%'
          },
          {
            semester: 'Jelly bean',
            module1: 375,
            module2: 0.0,
            module3: 94,
            module4: 0.0,
            module5: '0%'
          },
          {
            semester: 'Lollipop',
            module1: 392,
            module2: 0.2,
            module3: 98,
            module4: 0,
            module5: '2%'
          }
        ]
      }
    },
    methods: {
      save () {
        this.mod = true
        this.modColor = 'success'
        this.modText = 'Data saved'
      },
      cancel () {
        this.mod = true
        this.modColor = 'error'
        this.modText = 'Canceled'
      },
      open () {
        this.mod = true
        this.modColor = 'info'
        this.modText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      },
      back: function(){
        router.push({name: 'four_year_plan'})
      }
    }
  }
</script>

<style scoped>
.sidebar {
  background-color: #ffffff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 20%;
  float: left;
}
.selfplan {
  margin:auto;
  width: 70%;
  float:left;
}
</style>