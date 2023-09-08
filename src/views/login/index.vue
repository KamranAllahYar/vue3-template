<template>
  <div class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card
        class="mx-auto"
        elevation="8"
        width="430"
        max-width="448"
        min-height="600"
        rounded="lg"
    >
      <div class="pa-6 pb-8">
        <div class="text-center text-h3 text-uppercase" style="letter-spacing: 8px!important;">
          Shopperr
        </div>
        <div class="text-center text-h6">- The Home Of Local Business -</div>
        <br><br>
        <v-form @submit.prevent="submit">
          <v-text-field
              density="compact"
              label="Email or Phone"
              prepend-inner-icon="mdi-email-outline"
              variant="underlined"
              :rules="emailOrPhoneRules"
              v-model="emailOrPhone"
          ></v-text-field>
          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            <span></span>
            <a
                class="text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
            >
              Forgot login password?</a>
          </div>
          <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              label="Password"
              prepend-inner-icon="mdi-lock-outline"
              variant="underlined"
              @click:append-inner="visible = !visible"
              :rules="passwordRules"
              v-model="password"
          ></v-text-field>
          <v-alert
              closable
              v-if="loginError"
              type="error"
              :text="loginError"
          ></v-alert>
          <v-btn
              type="submit"
              block
              class="mb-8 mt-8"
              color="blue-grey-lighten-2"
              size="large"
              dark
              :loading="loggingIn"
          >
            Log In
          </v-btn>
        </v-form>
        <v-divider/>
        <v-card-text class="text-center">
          <router-link
              class="text-blue text-decoration-none"
              :to="{name:'Signup'}"
              replace
          >
            Register as Driver
            <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </div>
      <div class="bg-blue-grey-lighten-2" style="height: 100%;min-height: 100px">
      </div>
    </v-card>
  </div>
</template>
<script lang="ts" setup>

import {ref} from "vue";
import {useUserStore} from "@/store/modules/user";
import {ResultEnum} from "@/enums/httpEnum";
import {useRoute, useRouter} from "vue-router";
import {PageEnum} from "@/enums/pageEnum";

const visible = ref(false)

const emailOrPhone = ref('abcd@123.com');
const password = ref('abcdefgh');
const loggingIn = ref(false);


const emailOrPhoneRules = ref([
  value => {
    if (value) return true
    return 'You must enter email or phone.'
  },
])
const passwordRules = ref([
  value => {
    if (value) return true
    return 'You must enter password'
  },
])

const loginError = ref('');

const userStore = useUserStore();

const router = useRouter();
const route = useRoute();

const validateEmail = (email) => {
  return String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

const submit = async () => {
  const loginPayload = {
    phone: '',
    email: '',
    password: password.value
  }
  if (validateEmail(emailOrPhone.value)) {
    loginPayload.email = emailOrPhone.value
  } else {
    loginPayload.phone = emailOrPhone.value
  }
  loggingIn.value = true;
  try {
    loginError.value = '';
    const { code, message: msg }: any = await userStore.login(loginPayload);
    if (code == ResultEnum.SUCCESS) {
      const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
      if (route.name ===  PageEnum.BASE_LOGIN_NAME) {
        await router.replace('/');
      } else await router.replace(toPath);
    }
    loggingIn.value = false;
    if (response.status === ResultEnum.SUCCESS) {
      loginError.value = response.data.message;
    }
  } catch (e) {
    loggingIn.value = false;
    loginError.value = e.message;

  }

}
</script>
