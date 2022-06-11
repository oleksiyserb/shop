import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
});

router.beforeEach((to, from: object, next: () => void): void => {
  const title: HTMLTitleElement | null = document.querySelector("title");

  if (title) {
    title.innerHTML = to.meta.title as string;
    next();
  }
});

export default router;
