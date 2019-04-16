<template>
  <div
    class="hide-overflow"
    style="position: relative;"
  >
    <v-toolbar
      absolute
      color="teal lighten-3"
      dark
      scroll-off-screen
      scroll-target="#scrolling-techniques"
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title class="mr-4">NUSPlanner</v-toolbar-title>


      <v-spacer></v-spacer>
      <v-btn flat @click="logout()">Logout</v-btn>
<!-- 
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn> -->
    </v-toolbar>
    <div
      id="scrolling-techniques"
      class="scroll-y"
      style="max-height: 600px;"
    >
    <v-container style="height: 100px;"></v-container>
    </div>
  </div>
</template>

<script>
import router from '@/router/index.js';

export default {
  name: "header",
  methods: {
    logout: function()
    {
      alert("You have successfully logout")
      router.push({name: 'login'})
    }
  }
};
</script>
