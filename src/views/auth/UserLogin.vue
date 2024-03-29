<script setup lang="ts">
import { ref } from "vue";
import type Auth from "@/models/AuthModel";
import useAuthForm from "../../hooks/useAuthForm";
import { useRouter } from "vue-router";
import useAuthStore from "@/stores/auth";
import { useI18n } from "vue-i18n";

const authStore = useAuthStore();
const { replace } = useRouter();
const { t } = useI18n();

const isLoading = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const { onSubmit, getEmailField, getPassswordField } = useAuthForm(
  async (values: Auth): Promise<void> => {
    try {
      isLoading.value = true;
      await authStore.signIn(values);
      isLoading.value = false;

      replace({ name: "cabinet" });
    } catch (err) {
      if (err instanceof Error) {
        isLoading.value = false;
        password.value = "";
        errorMessage.value = err.message;
      }
    }
  },
  "signIn"
);

const { email, emailBlur, emailChange, emailError } = getEmailField();
const { password, passwordBlur, passwordChange, passwordError } =
  getPassswordField();

const closeModal = () => {
  errorMessage.value = null;
};
</script>

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
              <h1>{{ t("login.title") }}</h1>
              <span>
                {{ t("login.paragraph.or") }}
                <router-link :to="{ name: 'register' }">{{
                  t("login.paragraph.signUp")
                }}</router-link>
                {{ t("login.paragraph.description") }}
              </span>
            </header>
            <form class="auth__form" @submit.prevent="onSubmit">
              <div class="auth__form-control">
                <label for="email">{{ t("auth.email") }}</label>
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
                <label for="password">{{ t("auth.password") }}</label>
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
                <span v-if="!isLoading">{{ t("action.signIn") }}</span>
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
