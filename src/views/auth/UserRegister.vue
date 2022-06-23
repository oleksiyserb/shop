<template>
  <base-modal @close="closeModal" v-if="errorMessage" title="Error Message!">
    <p>{{ errorMessage }}</p>
  </base-modal>
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
              <label for="name">Enter your name</label>
              <input
                type="text"
                name="name"
                id="name"
                :value="name"
                @change="nameChange"
                @blur="nameBlur"
              />
              <span>{{ nameError }}</span>
            </div>
            <div class="auth__form-control">
              <label for="surname">Enter your surname</label>
              <input
                type="text"
                name="surname"
                id="surname"
                :value="surname"
                @change="surnameChange"
                @blur="surnameBlur"
              />
              <span>{{ surnameError }}</span>
            </div>
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
import { ref } from "@vue/reactivity";
import { useAuthForm } from "../../hooks/useAuthForm";
import type Auth from "@/models/AuthModel";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const { replace } = useRouter();
const isLoading = ref<boolean>(false);
const authStore = useAuthStore();
const errorMessage = ref<string | null>(null);

const {
  onSubmit,
  getNameField,
  getSurnameField,
  getEmailField,
  getPassswordField,
} = useAuthForm(async (values: Auth): Promise<void> => {
  try {
    isLoading.value = true;
    await authStore.signUp(values);
    isLoading.value = false;

    replace({ name: "main" });
  } catch (err) {
    if (err instanceof Error) {
      isLoading.value = false;
      errorMessage.value = err.message;
    }
  }
}, "signUp");

const { email, emailBlur, emailChange, emailError } = getEmailField();
const { password, passwordBlur, passwordChange, passwordError } =
  getPassswordField();
const { name, nameBlur, nameChange, nameError } = getNameField();
const { surname, surnameBlur, surnameChange, surnameError } = getSurnameField();

const closeModal = () => {
  errorMessage.value = null;
};
</script>
