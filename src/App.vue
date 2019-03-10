<template>
  <div class="app">
    <c-header></c-header>
    <div class="main">
      <router-view name='slidebar'></router-view>
      <router-view name='main'></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import PosltList from "./components/PosltList";

export default {
  name: "app",
  components: {
    "c-header": Header,
    "c-posltList": PosltList
  }
};
</script>

<style scoped>
.main{
  width: 80%;
  margin: 0 auto;
}
.app{
  background-color: #e1e1e1;
  height: 100%;
}
</style>
