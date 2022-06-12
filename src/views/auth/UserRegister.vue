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
          <form class="auth__form">
            <div class="auth__form-control">
              <label for="email">Enter your email</label>
              <input type="email" id="email" />
            </div>
            <div class="auth__form-control">
              <label for="password">Enter your password</label>
              <input type="password" id="password" />
            </div>
            <base-button>Sign Up</base-button>
          </form>
        </base-card>
      </div>
    </div>
  </section>
</template>
