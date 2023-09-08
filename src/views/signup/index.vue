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
        <div class="text-center text-h3 text-decoration-underline text-uppercase" style="letter-spacing: 8px!important;">
          Shopper<span style="letter-spacing: normal!important;">r</span></div>
        <div class="text-center text-h6">- The Home Of Local Business -</div>
        <br><br>
        <v-text-field
            density="compact"
            label="Full Name"
            variant="underlined"
        ></v-text-field>
        <v-text-field
            density="compact"
            label="Email"
            variant="underlined"
        ></v-text-field>
        <v-text-field
            density="compact"
            label="Phone"
            variant="underlined"
        ></v-text-field>
        <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            label="Password"
            variant="underlined"
            @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            label="Confirm Password"
            variant="underlined"
            @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-btn
            block
            class="mb-8"
            color="blue-grey-lighten-2"
            size="large"
            dark
        >
          Register
        </v-btn>
        <v-divider/>
        <v-card-text class="text-center">
          <router-link
              class="text-blue text-decoration-none"
              :to="{name:'Login'}"
              replace
          >
            Already have an account Login Here?
            <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </div>
      <div class="bg-blue-grey-lighten-2" style="height: 100%">
      </div>
    </v-card>
  </div>
</template>
<script lang="ts">
export default {
  data: () => ({
    visible: false,
  }),
}
</script>
