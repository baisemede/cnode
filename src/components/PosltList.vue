<template>
  <div class="PostList">
    <div class="loading" v-if="isloading">
      <img src="../assets/loading.gif">
    </div>
    <div v-else class="posts">
      <ul>
        <li>
          <div class="toobar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <li v-for="(post,idnex) in posts" :key="idnex">
          <!-- 帖子左边的头像 -->
          <router-link :to='{name:"user_info",params:{name:post.author.loginname}}'>
            <img :src="post.author.avatar_url">
          </router-link>

          <span>
            <!-- 浏览次数 -->
            <span class="reply_count">
              {{post.reply_count}}/
              <span class="reply-count-visits">{{post.visit_count}}</span>
            </span>
          </span>
          <!-- 帖子的分类 -->
          <span
            :class="[{put_good:(post.good ===true)},{put_top:(post.top===true)},
            {'topiclist-tab':(post.good !==true && post.top!==true )}]"
          >{{post | tabFormatter}}</span>
          <!-- 帖子的标题 -->
          <router-link :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}">
            <span>{{post.title}}</span>
          </router-link>
          <!-- 帖子发布的时间 -->
          <span class="last_reply">{{post.last_reply_at |formatDate}}</span>
        </li>
        <div>
          <Pagination @handleList="renderList"></Pagination>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import Pagination from "./Pagination";
export default {
  name: "PosltList",
  data() {
    return {
      isloading: false,
      posts: [],
      postpage: 1
    };
  },
  components: {
    Pagination
  },
  methods: {
    getdata() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.postpage,
            limit: 20
          }
        })
        .then(res => {
          this.isloading = false;
          this.posts = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    renderList(value) {
      this.postpage = value;
      this.getdata();
    }
  },
  beforeMount() {
    this.isloading = true;
    this.getdata();
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
.PostList {
  background-color: #ffffff;
}
.posts {
  margin-top: 10px;
}

.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

li:not(:first-child):hover {
  background: #f5f5f5;
}

li:last-child:hover {
  background: #e1e1e1;
}

li span {
  line-height: 30px;
}

.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}
.reply-count-visits {
  font-size: 10px;
  color: #b4b4b4;
}
.reply_count {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  color: #9e78c0;
}

.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}

.toobar {
  height: 40px;
  background-color: #f6f6f6;
}

.toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
}

.toobar span:hover {
  color: #9e78c0;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
</style>