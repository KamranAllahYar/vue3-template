<template>
  <div>Hello world</div>
</template>
<script lang="ts" setup>
import {http} from "@/utils/http.ts";

http.post('/api/auth/login');
</script>
