<template>
  <v-layout>
    <v-row>
      <v-col>
        <v-sheet class="ma-2 pa-2">
          <v-row>
            <v-col cols="2">
              <v-avatar size="x-large">
                <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
              </v-avatar>
            </v-col>
            <v-col>
              <div class="text-h5">Kamran Allah Yar</div>
              <div class="text-body-2">Driver ID: D14553</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-icon size="large" icon="mdi-alert-circle-outline" color="red-darken-4"></v-icon>
              Incomplete Profile
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn block class="text-none mb-4" color="blue-grey-lighten-2" size="small" variant="flat"
                prepend-icon="mdi-square-edit-outline" @click="$router.push({ name: 'Edit' })">
                Edit Profile
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <v-col cols="1">
              <v-icon icon="mdi-map-marker-outline"></v-icon>
            </v-col>
            <v-col>
              Street 4 house # 10,Durban
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="1">
              <v-icon icon="mdi-id-card"></v-icon>
            </v-col>
            <v-col>
              3113123-1231-1312
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="1">
              <v-icon icon="mdi-briefcase-outline"></v-icon>
            </v-col>
            <v-col>
              #42342313
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="1">
              <v-icon icon="mdi-passport"></v-icon>
            </v-col>
            <v-col>
              GN12312312
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn block class="text-none mb-4" color="red-lighten-1" size="small" variant="flat"
                prepend-icon="mdi-logout" @click="userStore.logout">
                Logout
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();

</script>
