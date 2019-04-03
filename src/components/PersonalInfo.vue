<template>
  <div
    class="information"
    :style="{ 'padding-left': '200px', margin: auto, width: '95%' }"
  >
    <p>Name: {{ person.personalInfo.name }}</p>
    <p>Date of Birth: {{ person.personalInfo.birthday }}</p>
    <p>Cohort: {{ person.personalInfo.cohortYear }}</p>
    <p>Home Faculty: {{ person.personalInfo.homeFaculty1 }}</p>
    <p>Academic Major: {{ person.personalInfo.academicMajor1 }}</p>
    <p>Degree: {{ person.personalInfo.academicDegree1 }}</p>
    <p v-if="!person.personalInfo.academicMajor2 == ''">
      Second Major: {{ person.personalInfo.academicMajor2 }}
    </p>
    <p v-if="!person.personalInfo.academicMinor == ''">
      Academic Minor: {{ person.personalInfo.academicMinor }}
    </p>
    <p></p>
  </div>
</template>

<script>
import db from '@/firebase'
export default {
  name: "PersonalInfo",
  data() {
    return {
    };
  },
  firebase: {
    person:{
      source: db.ref('A0123456B'),
      asObject:true
    }
  },
};
</script>
