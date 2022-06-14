<template>
  <section class="auth">
    <div class="container">
      <div class="auth__wrapper">
        <base-card>
          <header class="auth__header">
            <h1>Register your account</h1>
            <span
              >Or <router-link :to="{ name: 'login' }">Log In</router-link> in
              your account.</span
            >
          </header>
          <form @submit.prevent="onSubmit" class="auth__form">
            <div class="auth__form-control">
              <label for="email">Enter your email</label>
              <input
                type="email"
                name="email"
                id="email"
                :value="email"
                @change="emailChange"
                @blur="emailBlur"
              />
              <span>{{ emailError }}</span>
            </div>
            <div class="auth__form-control">
              <label for="password">Enter your password</label>
              <input
                name="password"
                type="password"
                id="password"
                :value="password"
                @change="passwordChange"
                @blur="passwordBlur"
              />
              <span>{{ passwordError }}</span>
            </div>
            <base-button>
              <span v-if="!isLoading">Sign Up</span>
              <base-spinner v-else width="60px" height="30px" fill="#ffffff" />
            </base-button>
          </form>
        </base-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthForm } from "../../hooks/useAuthForm";
import type Auth from "@/models/AuthModel";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const { replace } = useRouter();
const isLoading = ref<boolean>(false);
const authStore = useAuthStore();

const { onSubmit, getEmailField, getPassswordField } = useAuthForm(
  async (values: Auth): Promise<void> => {
    isLoading.value = true;
    authStore.signUp(values);
    isLoading.value = false;

    replace({ name: "main" });
  }
);

const { email, emailBlur, emailChange, emailError } = getEmailField();
const { password, passwordBlur, passwordChange, passwordError } =
  getPassswordField();
</script>
