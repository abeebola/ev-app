<template>
  <header>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <app-logo></app-logo>
          <ul class="navbar">
            <li v-for="link in links" :key="link.name" class="nav-item">
              <router-link :to="link.url" tag="a">
                {{link.name}}
              </router-link>
            </li>
          </ul>
        </v-flex>
      </v-layout>
    </v-container>
  </header>
</template>

<script>
import Logo from "@/components/shared/Logo";
export default {
  components: {
    appLogo: Logo
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.replace("/");
    }
  },
  data() {
    return {
      links: [
        {
          name: "Solutions",
          url: "/our-solutions"
        },
        {
          name: "FAQs",
          url: "/faqs"
        },
        {
          name: "Privacy Policy",
          url: "/privacy"
        }
      ]
    };
  },
  updated() {
    if (this.isLoggedIn) {
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>
header {
  z-index: 300;
  position: fixed;
  min-height: 50px;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 1px 12px 1px rgba(0, 0, 0, 0.1607843137254902);
}
.navbar {
  float: right;
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav-item {
  display: inline-block;
}
.nav-item > a {
  line-height: 20px;
  font-size: 14px;
  display: block;
  padding: 10px 12px;
  text-decoration: none;
}
</style>
