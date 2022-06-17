import { useAuth } from "@/hooks/useAuth";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    meta: { title: "Our Products" },
    component: () => import("../views/product/ProductFeed.vue"),
  },
  {
    path: "/product/:id",
    name: "product",
    props: true,
    component: () => import("../views/product/TheProduct.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    meta: { title: "Shoping Cart" },
    component: () => import("../views/cart/TheCart.vue"),
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
    meta: { title: "User Cabinet", requiredAuth: true },
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

const switchTitle = (to: RouteLocationNormalized) => {
  const title = document.querySelector("title");

  if (title) {
    title.innerHTML = (to.meta.title as string) || "DogShop";
  }
};

const { getCurrentUser } = useAuth();

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (await getCurrentUser()) {
      switchTitle(to);
      next();
    } else {
      next("/");
    }
  } else {
    switchTitle(to);
    next();
  }
});

export default router;
