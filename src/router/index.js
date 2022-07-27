import { createRouter, createWebHistory } from "vue-router";
import ContentPage from "@/views/content/content-page/content.page.vue";
import ContentDetail from "@/views/content/content-detail-page/content-detail.page.vue";
import About from "@/views/About.vue";
import Login from "@/views/auth/login.page.vue";
import Register from "@/views/auth/register.page.vue";
import AdminEmptyAltPage from "@/views/admin/admin-empty-alt-page/admin-empty-alt.page.vue";
import AdminWatingListPage from "@/views/admin/admin-waitling-list/admin-waiting-list.page.vue";
import AdminDetailPage from "@/views/admin/admin-detail-page/admin-detail.page.vue";
import AdminUpdatePage from "@/views/admin/admin-update-page/admin-update.page.vue";
import AdminContentFetchingPage from "@/views/admin/admin-content-fetching/admin-content-fetching.page.vue";
import AdminContentInterFetchingPage from "@/views/admin/admin-content-fetching/admin-content-inter-fetching.page.vue";
import Nprogress from "nprogress";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ContentPage,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name : "Sign in",
    component: Login,
  },
  {
    path: "/register",
    name: "Sign up",
    component: Register,
  },
  {
    path: "/wating-list",
    name: "Wating List",
    component : AdminWatingListPage
  },
  {
    path: "/news-without-alt",
    name: "News Without Alt",
    component : AdminEmptyAltPage,
  },
  {
    path: "/news/:id",
    name: "News Details",
    component: ContentDetail,
  },
  {
    path: "/admin/:id",
    name : "Admin Detail",
    component : AdminDetailPage,
  },
  {
    path: "/update/:id",
    name : "Admin Update",
    component : AdminUpdatePage,
  },
  {
    path: "/local-fetching",
    name: "Local Fetching",
    component: AdminContentFetchingPage
  },
  {
    path: "/inter-fetching",
    name : "Inter Fetching",
    component : AdminContentInterFetchingPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(()=>{
  Nprogress.start();
})

router.beforeEach(()=>{
  Nprogress.done();
})

export default router;