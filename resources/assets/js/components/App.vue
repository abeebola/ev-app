<template>
  <div id="app">
    <v-app>
      <router-view/>
      <v-snackbar v-model="snackbar.show" dark :color="snackbar.color" :bottom="snackbar.position === 'bottom'" :left="snackbar.align === 'left'"
        :multi-line="snackbar.mode === 'multi-line'" :right="snackbar.align === 'right'" :timeout="snackbar.timeout" :top="snackbar.position === 'top'"
        :vertical="snackbar.mode === 'vertical'">
        {{ snackbar.content }}
        <v-btn :color="typeof snackbar.color == 'undefined' ? 'pink' : 'white'" flat @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
// import "./../src/assets/css/overrides.css";
export default {};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
</style>
