<template>
  <v-layout>
    <v-row>
      <v-col>
        <v-sheet class="ma-2 pa-2">
          <v-row>
            <v-col cols="2">
              <v-avatar
                  size="x-large"
              >
                <v-img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                ></v-img>
              </v-avatar>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <v-col>
              <v-text-field
                  prepend-icon="mdi-rename"
                  variant="underlined"
                  label="Name"
                  v-model="name"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-textarea
                  prepend-icon="mdi-map-marker-outline"
                  variant="underlined"
                  label="Address"
                  rows="2"
                  v-model="address"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-text-field
                  prepend-icon="mdi-id-card"
                  variant="underlined"
                  label="ID"
                  v-model="id_card"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-text-field
                  prepend-icon="mdi-briefcase-outline"
                  variant="underlined"
                  label="Work Permit"
                  v-model="work_permit"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-text-field
                  prepend-icon="mdi-passport"
                  variant="underlined"
                  label="Passport"
                  v-model="passport"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-file-input
                  label="ID"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  variant="underlined"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-file-input
                  label="Passport"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  variant="underlined"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-file-input
                  label="Work Permit"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  variant="underlined"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-file-input
                  label="Drivers Licence"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  variant="underlined"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-file-input
                  label="Vehicle Number Plate"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  variant="underlined"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-file-input
                  label="Uber or Mr.D ID"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  variant="underlined"
              />
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col>
              <v-btn class="mr-5" variant="outlined" color="success">Save</v-btn>
              <v-btn variant="outlined" @click="$router.go(-1)">Cancel</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script lang="ts">
export default {
  data: () => ({
    name: 'Kamran Allah Yar',
    address: 'Street 4 house # 10,Durban',
    id_card: '3113123-1231-1312',
    work_permit: 42342313,
    passport: 'GN12312312',
  })
}
</script>
