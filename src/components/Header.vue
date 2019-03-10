<template>
  <div class="header">
    <img src="../assets/cnodejs_light.svg">
    <ul>
      <li>
        <a href="root">首页</a>
      </li>
      <li>
        <a href="#">新手入门</a>
      </li>
      <li>
        <a href="#">API</a>
      </li>
      <li>
        <a href="#">关于</a>
      </li>
      <li>
        <a href="#">登录</a>
      </li>
      <li>
        <a href="#">注册</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.header {
  background-color: #444444;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
img {
  max-width: 120px;
  margin-left: 50px;
}
ul {
  list-style: none;
}
ul > li {
  display: inline-block;
  padding: 19px;
}
a {
  color: #cccccc;
  text-shadow: none;
  font-size: 14px;
  text-decoration: none;
}
</style>