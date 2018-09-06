<template>
  <v-flex md3 px-2>
    <div class="d-badge" :style="'background-color: ' + item.bgColor + '; color: ' + item.color">
      <div class="mask"></div>
      <div class="title">
        <span><i :class="'fa fa-' + item.icon"></i> {{item.title}}</span>
      </div>
      <div class="content">
        {{item.content}}
      </div>
      <div class="footer" v-html="item.footer">
        {{item.footer}}
      </div>
    </div>
  </v-flex>
</template>

<script>
  export default {
    computed: {
      item() {
        return {
          bgColor: this.badgeData.bgColor || "rgba(0, 0, 0, 0.06)",
          color: this.badgeData.color || "#2c3e50",
          icon: this.badgeData.icon || "#cog",
          title: this.badgeData.title || "No title",
          content: this.badgeData.content || "No content",
          footer: this.badgeData.footer || "&nbsp;"
        };
      }
    },
    data() {
      return {
        badge: this.badgeData || {}
      };
    },
    methods: {
      loadBadge() {
        //
      }
    },
    props: ["badgeData"]
  };
</script>

<style>
  .d-badge {
    padding: 10px 10px 0;
    background-color: rgba(0, 0, 0, 0.06);
    margin-bottom: 10px;
    position: relative;
  }

  .d-badge>* {
    padding-bottom: 10px;
    position: relative;
  }

  .d-badge:hover .mask {
    opacity: 0.1;
    -webkit-transition: opacity 0.2s ease-in;
    -moz-transition: opacity 0.2s ease-in;
    transition: opacity 0.2s ease-in;
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0;
  }

  .title {
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 1.2em;
  }

  .content {
    font-weight: 600;
    font-size: 2em;
  }

  .footer {
    margin-top: -10px;
    display: inline-block;
    line-height: 100%;
  }
</style>