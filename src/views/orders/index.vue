<template>
  <v-layout>
    <v-row>
      <v-col cols="12" class="pa-10 bg-blue-grey-lighten-4">
        <h1 class="text-h4 text-uppercase" style="letter-spacing: 8px!important;">Shopperr</h1>
      </v-col>
      <v-col cols="12">
        <h1 class="text-h5 pa-4">Active Deliverables</h1>
      </v-col>
      <v-col cols="12" class="pa-4" v-for="i in 3" :key="i">
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
                v-if="i > 1"
                variant="flat"
                color="blue-lighten-1"
                size="small"
                prepend-icon="mdi-moped-outline"
            >
              Attempt Delivery
            </v-btn>
            <v-btn
                v-if="i === 1"
                variant="flat"
                color="blue-lighten-1"
                size="small"
                prepend-icon="mdi-package-variant-closed-check"
            >
              Deliver
            </v-btn>
            <v-btn
                v-if="i === 1"
                variant="flat"
                color="green-lighten-1"
                size="small"
                prepend-icon="mdi-map-marker-outline"
            >
              Whatsapp
            </v-btn>
            <v-btn
                variant="text"
                color="indigo-darken-1"
                class="text-h6"
                size="small"
            >
              R 200
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script lang="ts" setup>
</script>
