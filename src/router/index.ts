import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/MapDemo",
      name: "MapDemo",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/amap/MapDemo.vue"),
    },
    {
      path: "/MapDemo2",
      name: "MapDemo2",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/amap/MapDemo2.vue"),
    },
    {
      path: "/MapChart",
      name: "MapChart",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/MapChart.vue"),
    },
    {
      path: "/BackgroundFromRandomImg",
      name: "BackgroundFromRandomImg",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/BackgroundFromRandomImg.vue"),
    },
    {
      path: "/ImageLazyLoad",
      name: "ImageLazyLoad",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ImageLazyLoad/ImageLazyLoad.vue"),
    },
    {
      path: "/Form",
      name: "Form",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Form/Form.vue"),
    },
    {
      path: "/Vue3Dnd",
      name: "Vue3Dnd",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Vue3Dnd/Container.vue"),
    },

  ],
});

export default router;
