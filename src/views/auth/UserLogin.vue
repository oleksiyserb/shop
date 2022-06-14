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
            <base-button>Sign In</base-button>
          </form>
        </base-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type Auth from "@/models/AuthModel";
import { useAuthForm } from "../../hooks/useAuthForm";

const { onSubmit, getEmailField, getPassswordField } = useAuthForm(
  (values: Auth) => {
    alert(values);
  }
);

const { email, emailBlur, emailChange, emailError } = getEmailField();
const { password, passwordBlur, passwordChange, passwordError } =
  getPassswordField();
</script>
