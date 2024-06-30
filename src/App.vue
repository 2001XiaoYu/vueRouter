<template>
  <div class="app">
    <h2>App content</h2>
    <div class="nav">
      <router-link to="/home" replace active-class="active">首页</router-link>
      <!-- <router-link :to="{ path: '/home'}">首页</router-link> -->
      <router-link to="/about" replace active-class="active">关于</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* 默认active-class */
/* .router-link-active{
  color: red;
  font-size: 20px;
} */

.active{
  color: red;
  font-size: 20px;
}

</style>
