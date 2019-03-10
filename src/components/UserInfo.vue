<template>
  <div class="UserInfo">
    <!--在数据未返回的时候，显示这个正在加载的gif-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="userInfomation" v-else>
      <section>
        <img :src="userinfo.avatar_url">
        
        <span>{{userinfo.loginname}}</span>
        <p>{{userinfo.score}}积分</p>
        <p>注册时间：{{userinfo.create_at | formatDate}}</p>
      </section>

      <div class="replies">
        <p>最近创建的主题</p>
        <ul>
          <li v-for="(item,index) in  userinfo.recent_topics " :key="index">
            <router-link :to="{name:'user_info',params:{name:item.author.loginname}}">
              <img :src="item.author.avatar_url">
            </router-link>

            <router-link
              :to="{
          name:'post_content',
          params:{
            id:item.id
          }
          }"
            >{{item.title}}</router-link>
            <span class="last_user">{{item.last_reply_at |formatDate}}</span>
          </li>
        </ul>
      </div>
      <div class="topics">
        <p>最近回复的主题</p>
        <ul>
          <li v-for="(item,index) in userinfo.recent_replies" :key="index">
            <router-link :to="{name:'user_info',params:{name:item.author.loginname}}">
              <img :src="item.author.avatar_url">
            </router-link>
            <router-link
              :to="{
          name:'post_content',
          params:{
            id:item.id
          }
          }"
            >{{item.title}}</router-link>
            <span class="last_user">{{item.last_reply_at |formatDate}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      isLoading: false,
      userinfo: {}
    };
  },
  methods: {
    getData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.isLoading = false; //加载成功，去除动画
          this.userinfo = res.data.data;
        })
        .catch(function(err) {
          //处理返回失败后的问题
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true; //加载成功之前显示加载动画
    this.getData(); //在页面加载之前获取数据
  },
  watch: {
    //在同页面下监听路由的参数，发送改变就执行下面的代码
    $route(to, from) {
      this.getData();
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
}
.userInfomation {
  background: white;
  width: 100%;
  margin: 10px auto;
}
.userInfomation section {
  padding: 12px;
}
.userInfomation img {
  width: 36px;
  margin: 6px;
  vertical-align: middle;
}
.userInfomation li {
  list-style: none;
}
.userInfomation .replies,
.userInfomation .topics {
  font-size: 0.72rem;
  border-top: 10px #dddddd solid;
}
.userInfomation > div > p {
  padding: 12px 0 12px 12px;
  background-color: rgba(212, 205, 205, 0.17);
  font-size: 0.75rem;
  margin: 0;
}
a {
  text-decoration: none;
  color: #2188cc;
}
a:hover {
  text-decoration: underline;
  color: #005580;
}
ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
}
ul > li {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  border-top: 1px solid #f0f0f0;
}
.last_user {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}
</style>
