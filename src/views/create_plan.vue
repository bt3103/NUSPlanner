<template>
  <div>
    <div class="sidebar"><sidebar /></div>
    <div class='selfplan'>
      <v-data-table
        :headers="headers"
        :items="modules"
        :rows-per-page-items=5
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
                  @input="onEditValueChanged"
                  :rules="[narule]"
                  label="Edit"
                  single-line
                  counter
                  maxlength="2"
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
                  @input="onEditValueChanged"
                  :rules="[narule]"
                  label="Edit"
                  single-line
                  counter
                  maxlength="8"
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
                  @input="onEditValueChanged"
                  :rules="[narule]"
                  label="Edit"
                  single-line
                  counter
                  maxlength="8"
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
                  @input="onEditValueChanged"
                  :rules="[narule]"
                  label="Edit"
                  single-line
                  counter
                  maxlength="8"
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
                  @input="onEditValueChanged"
                  :rules="[narule]"
                  label="Edit"
                  single-line
                  counter
                  maxlength="8"
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
                  @input="onEditValueChanged"
                  :rules="[narule]"
                  label="Edit"
                  single-line
                  counter
                  maxlength="8"
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
          <td>
            <v-edit-dialog
              :return-value.sync="props.item.overloadmods"
              lazy
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            > {{ props.item.overloadmods }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.overloadmods"
                  @input="onEditValueChanged"
                  label="Edit"
                  single-line
                  counter
                  maxlength="8"
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
        </template>
      </v-data-table>
      <v-snackbar v-model="snack" :timeout="3000" :color="modColor">
      {{ modText }}
      <v-btn flat @click="mod = false">Close</v-btn>
    </v-snackbar>
      <v-btn v-model="fab" color="teal lighten-2" :title="msg" dark fab @click="back()">
        <v-icon>keyboard_backspace</v-icon>
      </v-btn>
      <v-btn v-model="fab" color="teal lighten-2" :title="msg2" dark fab @click="check()">
        <v-icon>check_circle</v-icon>
      </v-btn>
      <v-flex v-if="show">
        <v-alert
              :value="!fail"
              color="green"
            >Module Requirement of 160MC is met! However, for more robust rule checking, please refer to our What-If Analysis.</v-alert>
            <v-alert
              :value="fail"
              color="orange"
            >Sorry. You have not met all graduation requirements.</v-alert>
          </v-flex>
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
        msg2:"Check for graduation",
        fail:false,
        show:false,
        mod: false,
        val:[],
        modColor: '',
        modText: '',
        narule: v => v != "NA"|| 'Cannot input NA!',
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
            semester: 1,
            module1: "BT1101",
            module2: "CS1010S",
            module3: 'EC2101',
            module4: 'GEH1001',
            module5: 'BT2101',
            overloadmods: 'NA'
          },
          {
            semester: 2,
            module1: 'IS1103',
            module2: 'MA1521',
            module3: 'CS2030',
            module4: 'IS1103',
            module5: 'URL',
            overloadmods: 'NA'
          },
          {
            semester: 3,
            module1: 'MKT1705X',
            module2: 'BT2102',
            module3: 'MA1311',
            module4: 'URL',
            module5: 'IS2101',
            overloadmods: 'NA'
          },
          {
            semester: 4,
            module1: 'ST2334',
            module2: 'BT3102',
            module3: 'EC1301',
            module4: 'CS2040',
            module5: 'URL',
            overloadmods: 'NA'
          },
          {
            semester: 5,
            module1: 'BT3103',
            module2: 'IS3103',
            module3: 'Internship',
            module4: 'Internship',
            module5: 'Internship',
            overloadmods: 'NA'
          },
          {
            semester: 6,
            module1: 'SEP',
            module2: 'SEP',
            module3: 'SEP',
            module4: 'SEP',
            module5: 'SEP',
            overloadmods: 'NA'
          },
          {
            semester: 7,
            module1: 'BT4103',
            module2: 'BT4016',
            module3: 'BT4012',
            module4: 'BT4240',
            module5: 'BT4101',
            overloadmods: 'NA'
          },
          {
            semester: 8,
            module1: 'BT4101',
            module2: 'BT4101',
            module3: 'BT4101',
            module4: 'BT4101',
            module5: 'GES1002',
            overloadmods: 'NA'
          }
        ]
      }
    },
    methods: {
      onEditValueChanged(value){
        this.val.push(value);
      },
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
      },
      check: function(){
        this.fail=false;
        var n;
        var count1=0;
        for(n = 0; n < this.val.length; n++){
          if(this.val[n]=='NA'){
              count1++;
          }
          if(count1 >=1){
            this.fail=true;
            }
          }
        if(this.modules.length==8){
          var i;
          var m;
          var count=0;
          for(i = 0; i < 8; i++){
            for(m = 0; i < 5; i++){
              if(this.modules[i][m]=='NA'){
                count++;
              }
            }
            if(count >8){
              this.fail=true;
            }
          }
        }else{
          this.fail=true;
        }
        this.show=true;
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