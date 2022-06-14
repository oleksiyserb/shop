<template>
  <section class="auth">
    <div class="container">
      <div class="auth__wrapper">
        <base-card>
          <header class="auth__header">
            <h1>Log In</h1>
            <span
              >Or
              <router-link :to="{ name: 'register' }">Register</router-link> a
              new account.</span
            >
          </header>
          <form class="auth__form" @submit.prevent="onSubmit">
            <div class="auth__form-control">
              <label for="email">Enter your email</label>
              <input
                type="email"
                id="email"
                :value="email"
                @blur="emailBlur"
                @change="emailChange"
              />
              <span>{{ emailError }}</span>
            </div>
            <div class="auth__form-control">
              <label for="password">Enter your password</label>
              <input
                type="password"
                id="password"
                :value="password"
                @blur="passwordBlur"
                @change="passwordChange"
              />
              <span>{{ passwordError }}</span>
            </div>
            <base-button>
              <span v-if="!isLoading">Sign In</span>
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
import type Auth from "@/models/AuthModel";
import { useAuth } from "../../hooks/useAuth";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useRouter } from "vue-router";

const { signIn } = useAuth();
const { replace } = useRouter();
const isLoading = ref<boolean>(false);

const { onSubmit, getEmailField, getPassswordField } = useAuthForm(
  async (values: Auth): Promise<void> => {
    isLoading.value = true;
    await signIn(values.email, values.password);
    isLoading.value = false;

    replace({ name: "main" });
  }
);

const { email, emailBlur, emailChange, emailError } = getEmailField();
const { password, passwordBlur, passwordChange, passwordError } =
  getPassswordField();
</script>
