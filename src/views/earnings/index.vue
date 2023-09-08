<template>
  <v-layout>
    <v-row>
      <v-col cols="12" class="pa-10 bg-blue-grey-lighten-4">
        <h1 class="text-h4 text-uppercase" style="letter-spacing: 8px!important;">Your Earnings</h1>
      </v-col>
      <v-col cols="12" class="pa-6 d-flex justify-space-between">
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
          <div>
            <span class="font-weight-bold">R 4,200.00</span>
          </div>
          <div style="display: flex;align-items: center">
            <v-icon class="rounded-circle" v-ripple icon="mdi-menu-left" size="40"/>
            <span class="font-weight-bold text-blue-darken-2">September 2023</span>
            <v-icon class="rounded-circle" v-ripple icon="mdi-menu-right" size="40"/>
          </div>
        </div>
        <div class="pa-2" style="display: flex;flex-direction: column;justify-content: center;align-items: center">
          <div>
            <span class="font-weigyaht-bold">R 75.00</span>
          </div>
          <div >
            <v-btn size="40" variant="text" class="font-weight-bold" color="green-darken-2">Today</v-btn>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-6">
        <v-text-field
            density="compact"
            variant="outlined"
            label="Search Business"
        />
      </v-col>
      <v-col cols="12" class="pl-6 pr-6 pb-4" v-for="i in 3" :key="i">
        <v-card elevation="4">
          <v-card-text class="d-flex" style="padding: 12px 0 0 12px">
            <v-row>
              <v-col style="padding: 12px 0 0 12px">
                <h4 class="text-h6">Order#123131</h4>
                <p class="text-h6 text--primary">
                  McDonald's
                </p>
              </v-col>
              <v-col cols="4" class="text-h6"
                     style="font-weight:bold;display: grid;align-items: center;text-align: center">
                R 25
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
                style="padding: 4px"
                variant="text"
                color="indigo-darken-1"
                size="small"
            >
              17-08-2023
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script lang="ts" setup>
</script>
