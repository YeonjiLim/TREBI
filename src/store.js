import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    is_login: false,
    userLevel: null,
    postTarget: 1,
    modal_style: {
      display: "none"
    },
    adminPage: null,
    navbarstate: false,
    messages: [],
    modal_remoter: false,
    isPostShow: true,
    PostPopupIndex: 1
  },
  mutations: {
    setUser(state, currentUser) {
      state.user = currentUser;
    },
    setLogin(state, currentState) {
      state.is_login = currentState;
    },
    setUserLevel(state, currentLevel) {
      state.userLevel = currentLevel;
    },
    setPostTarget(state, newTarget) {
      state.postTarget = newTarget;
      console.log(state.postTarget);
    },
    setModalStyle(state, currentState) {
      state.modal_style.display = currentState;
    },
    setAdminPAge(state, CurrnetAdminPage) {
      state.adminPage = CurrnetAdminPage;
      console.log(state.adminPage);
    },
    setNavbarState(state, currentNavbar) {
      state.navbarstate = currentNavbar;
    },
    getMessages() {},
    setMessages(state) {
      state.messages = [];
    },
    upMessages(state, newMessage) {
      state.messages.push(newMessage);
    },
    setModalRemote(state) {
      state.modal_remoter = !state.modal_remoter;
    },
    toggleIsPostShow(state) {
      state.isPostShow = !state.isPostShow;
    },
    setPostPopupIndex(state, index) {
      state.PostPopupIndex = index;
    }
  },
  getters: {
    getNavbarState: function(state) {
      return state.navbarstate;
    }
  },
  actions: {},
  plugins: [createPersistedState()]
});
