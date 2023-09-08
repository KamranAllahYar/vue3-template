<template>
  <v-layout>
    <router-view class="mb-16"/>
    <v-bottom-navigation
        v-model="value"
        bg-color="blue-grey-lighten-2"
        mode="shift"
    >
      <v-btn @click="goto('Home')">
        <v-icon size="30">mdi-home</v-icon>
        <span>Home</span>
      </v-btn>

      <v-btn @click="goto('Orders')">
        <v-icon size="30">mdi-package-variant-closed</v-icon>

        <span>Orders</span>
      </v-btn>

      <v-btn @click="goto('Earnings')">
        <v-icon size="30">mdi-cash-multiple</v-icon>

        <span>Earnings</span>
      </v-btn>

      <v-btn @click="goto('Account')">
        <v-icon size="30">mdi-account-circle-outline</v-icon>

        <span>Account</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script lang="ts">
const navigation = {
  'Home': 0,
  'Orders': 1,
  'Earnings': 2,
  'Account': 3,
}
export default {
  data: () => ({value: 0}),
  mounted() {
    this.value = navigation[this.$route.name];
  },
  methods: {
    goto(name) {
      this.$router.push({name})
    }
  }
}
</script>
