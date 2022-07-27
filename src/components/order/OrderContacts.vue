<script setup lang="ts">
import OrderHeader from "./OrderHeader.vue";
import OrderBody from "./OrderBody.vue";
import { useI18n } from "vue-i18n";
import { useField, type FieldContext } from "vee-validate";
import useAuth from "@/hooks/useAuth";
import { onBeforeMount } from "vue";

const { t } = useI18n();
const { getCurrentUser } = useAuth();

const {
  value: name,
  errorMessage: nameError,
  handleBlur: nameBlur,
  handleChange: nameChange,
}: FieldContext<string> = useField("name");
const {
  value: surname,
  errorMessage: surnameError,
  handleBlur: surnameBlur,
  handleChange: surnameChange,
}: FieldContext<string> = useField("surname");
const {
  value: lastName,
  errorMessage: lastNameError,
  handleBlur: lastNameBlur,
  handleChange: lastNameChange,
}: FieldContext<string> = useField("lastName");
const {
  value: phoneNumber,
  errorMessage: phoneNumberError,
  handleBlur: phoneNumberBlur,
  handleChange: phoneNumberChange,
}: FieldContext<string> = useField("phoneNumber");
const {
  value: email,
  errorMessage: emailError,
  handleBlur: emailBlur,
  handleChange: emailChange,
}: FieldContext<string> = useField("email");

onBeforeMount(async () => {
  const user = await getCurrentUser();
  if (user && user.uid && user.email && user.displayName) {
    const array = user.displayName.split(" ");

    name.value = array[0];
    surname.value = array[1];
    email.value = user.email;
  }
});
</script>

<template>
  <section class="order-contacts">
    <order-header rank="1" :title="t('order.contacts.title')" />
    <order-body class="order-contacts__body">
      <div class="order-contacts__group">
        <div class="form-control">
          <label for="surname">{{ t("order.contacts.surname") }}</label>
          <input
            type="text"
            id="surname"
            :value="surname"
            @blur="surnameBlur"
            @change="surnameChange"
          />
          <p v-if="surnameError">{{ surnameError }}</p>
        </div>
        <div class="form-control">
          <label for="name">{{ t("order.contacts.name") }}</label>
          <input
            type="text"
            id="name"
            :value="name"
            @blur="nameBlur"
            @change="nameChange"
          />
          <p v-if="nameError">{{ nameError }}</p>
        </div>
      </div>
      <div class="form-control order-contacts__single">
        <label for="parentName">{{ t("order.contacts.lastName") }}</label>
        <input
          type="text"
          id="parentName"
          :value="lastName"
          @blur="lastNameBlur"
          @change="lastNameChange"
        />
        <p v-if="lastNameError">{{ lastNameError }}</p>
      </div>
      <div class="form-control order-contacts__single">
        <label for="phone">{{ t("order.contacts.phoneNumber") }}</label>
        <input
          type="text"
          id="phone"
          :value="phoneNumber"
          @blur="phoneNumberBlur"
          @change="phoneNumberChange"
        />
        <p v-if="phoneNumberError">{{ phoneNumberError }}</p>
      </div>
      <div class="form-control order-contacts__single">
        <label for="email">{{ t("order.contacts.email") }}</label>
        <input
          type="text"
          id="email"
          :value="email"
          @blur="emailBlur"
          @change="emailChange"
        />
        <p v-if="emailError">{{ emailError }}</p>
      </div>
    </order-body>
  </section>
</template>

<style scoped>
.order-contacts__single {
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0;
  flex-direction: column;
}

.order-contacts__body label {
  margin-bottom: 0.2em;
}

.order-contacts__body input {
  padding: 0.4em 0.5em;
  border-radius: 12px;
  border: none;
}

.order-contacts__group {
  flex-direction: row;
  display: flex;
  margin: 0.5em -0.5em 0;
  justify-content: space-between;
}

.order-contacts__group > div {
  display: flex;
  margin: 0 0.5em;
  flex-wrap: wrap;
  flex-direction: column;
  flex-grow: 1;
}

@media (max-width: 425px) {
  .order-contacts__group {
    display: block;
    margin: 0;
  }

  .order-contacts__group > div {
    margin: 0.5em 0;
  }
}

.form-control > p {
  margin-top: 0.2em;
  color: var(--color-text-warn);
}
</style>
