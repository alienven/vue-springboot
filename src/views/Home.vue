<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div>在线办公系统</div>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link"
            >{{ user.name }}
            <i><img :src="user.userFace" /></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 1、添加 router  -->
          <el-menu router>
            <!-- 2、循环整个路由组件，不展示 hidden: true 的路由组件 -->
            <el-submenu
              :index="index + ''"
              v-for="(item, index) in routes"
              :key="index"
              v-if="!item.hidden"
            >
              <template slot="title">
                <i
                  :class="item.iconCls"
                  style="color: black; margin-right: 5px"
                ></i>
                <span>{{ item.name }}</span>
              </template>
              <!-- 3、循环遍历子路由 -->
              <el-menu-item
                :index="children.path"
                v-for="(children, index) in item.children"
                :key="index"
                >{{ children.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-show="this.$router.currentRoute.path != '/home'"
          >
            <el-breadcrumb-item :to="{ path: '/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{
              this.$router.currentRoute.name
            }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div
            class="homeWelcome"
            v-show="this.$router.currentRoute.path == '/home'"
          >
            欢迎光临
          </div>
          <router-view class="homeRouterView"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    routes() {
      return this.$store.state.routes;
    },
    user() {
      return this.$store.state.currentAdmin;
    },
  },
  methods: {
    // 注销登录
    commandHandler(command) {
      if (command == "logout") {
        this.$confirm("此操作将退出登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.postRequest("/logout");
            // 清空用户信息
            window.sessionStorage.removeItem("tokenStr");
            window.sessionStorage.removeItem("user");
            // window.sessionStorage.removeItem("routes")
            this.$store.commit("initRoutes", []);
            this.$store.commit("INIT_ADMIN", {});
            this.$router.replace("/");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消退出登录",
            });
          });
      }
      if (command == "userinfo") {
        this.$router.push('/userinfo')
      }
    },
  },
};
</script>

<style scoped>
.homeHeader {
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.homeHeader .title {
  font-size: 30px;
  font-family: 微软雅黑;
  color: white;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-left: 8px;
}

.homeWelcome {
  text-align: center;
  font-size: 30px;
  font-family: 微软雅黑;
  color: #409ef4;
  padding-top: 50px;
}

.homeRouterView {
  margin-top: 10px;
}
</style>
