<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      Task App
    </v-app-bar>

    <v-main>
      <TaskList/>
    </v-main>
  </v-app>
</template>

<script>
import TaskList from './components/TaskList';

export default {
  name: 'App',

  components: {
    TaskList,
  },

  data: () => ({
    //
  }),
};
</script>
