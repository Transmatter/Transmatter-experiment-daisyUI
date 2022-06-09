import apiClient from "./axiosClient";
import store from '@/store'

export default {
  login(user) {
    return apiClient
      .post("/auth", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        store.dispatch('setCurrentUser', response.data.user)
        store.dispatch('setRole', response.data.user.authorities[0])
        store.dispatch('setStatus', response.data.user.status)
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    store.dispatch('setCurrentUser', null)
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
};
