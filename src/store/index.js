import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//准备actions对象——响应组件中用户的动作
const actions = {};
//准备mutations对象——修改state中的数据
const mutations = {
  // 编辑用户 同步用户信息
  INIT_ADMIN(state, admin) {
    state.currentAdmin = admin;
  },
  // 初始化路由 菜单
  initRoutes(state, date) {
    state.routes = date;
  },
};
//准备state对象——保存具体的数据
const state = {
  routes: [],
  sessions: {}, // 用来接收后端接口返回的数据
  admins: [],
  currentAdmin: JSON.parse(window.sessionStorage.getItem("user")), // 当前用户
  currentSession: null,
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
});
