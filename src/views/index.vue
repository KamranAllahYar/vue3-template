<template>
  <v-layout>
    <v-row>
      <v-col cols="12" class="pa-10 bg-blue-grey-lighten-4">
        <h1 class="text-h4 text-uppercase" style="letter-spacing: 8px!important;">Shopperr</h1>
      </v-col>
      <v-col cols="8">
        <h1 class="text-h5 pa-4">Orders For Delivery</h1>
      </v-col>
      <v-col cols="4" style="display: grid;align-items: center">
        <span class="pa-4"><v-icon icon="mdi-map-marker-outline" @click="locationDrawer = true"/>{{ slider }} KM</span>
        <v-navigation-drawer
            :absolute="true"
            v-model="locationDrawer"
            location="top"
            temporary
            style="height: 300px"
        >
          <v-row>
            <v-col cols="12" style="display: grid;align-items: center;height: 300px;text-align: center;" class="pa-4">
              <v-slider
                  v-model="slider"
                  class="align-center"
                  :max="max"
                  :min="min"
                  :step="1"
                  hide-details
                  :ticks="{
                    5: '5 Km',
                    10: '10 Km',
                    15: '15 Km',
                    20: '20 Km'
                    }"
                  tick-size="4"
                  show-ticks="always"
                  thumb-label="always"
              >
              </v-slider>
              <v-btn color="green-lighten-1" @click="locationDrawer = false">Set Radius</v-btn>
            </v-col>
          </v-row>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="12" class="pa-4" v-for="i in 10" :key="i">
        <v-card elevation="4">
          <v-card-text>
            <h4 class="text-h6">Order#123131</h4>
            <p class="text-h6 text--primary">
              Shop: McDonald's
            </p>
            <p>
              <span class="text-h6">Pickup Location:</span> Cnr West Street &, Mercury Ln, Durban, 4001, South Africa
            </p>
            <p>
              <span class="text-h6">Deliver To:</span> Cnr West Street &, Mercury Ln, Durban, 4001, South Africa
            </p>
          </v-card-text>
          <v-card-actions class="justify-space-between pa-4">
            <v-btn
                variant="flat"
                color="green-lighten-1"
                size="small"
            >
              Accept
            </v-btn>
            <v-btn
                variant="flat"
                color="red-lighten-1"
                size="small"
            >
              Ignore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script lang="ts" setup>
import {ref} from "vue";

const locationDrawer = ref(false);
const slider = ref(10);
const min = 5
const max = 20
</script>
