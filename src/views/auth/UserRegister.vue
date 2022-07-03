<template>
  <div>
    <base-modal @close="closeModal" v-if="errorMessage" title="Error Message!">
      <p>{{ errorMessage }}</p>
    </base-modal>
    <section class="auth">
      <div class="container">
        <div class="auth__wrapper">
          <base-card>
            <header class="auth__header">
              <h1>{{ t("register.title") }}</h1>
              <span>
                {{ t("register.paragraph.or") }}
                <router-link :to="{ name: 'login' }">{{
                  t("register.paragraph.logIn")
                }}</router-link>
                {{ t("register.paragraph.description") }}
              </span>
            </header>
            <form @submit.prevent="onSubmit" class="auth__form">
              <div class="auth__form-control">
                <label for="name">{{ t("auth.name") }}</label>
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
                <label for="surname">{{ t("auth.surname") }}</label>
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
                <label for="email">{{ t("auth.email") }}</label>
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
                <label for="password">{{ t("auth.password") }}</label>
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
                <span v-if="!isLoading">{{ t("action.signUp") }}</span>
                <base-spinner
                  v-else
                  width="60px"
                  height="30px"
                  fill="#ffffff"
                />
              </base-button>
            </form>
          </base-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useAuthForm } from "../../hooks/useAuthForm";
import type Auth from "@/models/AuthModel";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";

const { replace } = useRouter();
const { t } = useI18n();

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

    replace({ name: "cabinet" });
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
