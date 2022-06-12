import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    meta: { title: "All Products" },
    component: () => import("../views/product/ProductFeed.vue"),
  },
  {
    path: "/product/:id",
    name: "product",
    component: () => import("../views/product/TheProduct.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "Login to your account" },
    component: () => import("../views/auth/UserLogin.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { title: "Register new account" },
    component: () => import("../views/auth/UserRegister.vue"),
  },
  {
    path: "/cabinet",
    name: "cabinet",
    meta: { title: "User Cabinet" },
    component: () => import("../views/auth/UserCabinet.vue"),
  },
  {
    path: "/:notFound(.*)*",
    meta: { title: "404 - Page Not Found" },
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const title = document.querySelector("title");

  if (title) {
    title.innerHTML = (to.meta.title as string) || "DogShop";
  }
  next();
});

export default router;
