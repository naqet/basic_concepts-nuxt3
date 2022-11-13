<template>
  <form method="post" action="/api/auth/login" class="grid gap-2 w-10">
    <input
      v-model="username"
      minlength="3"
      class="bg-transparent border-2 border-primary rounded-lg p-1"
      name="username"
    />
    <input
      v-model="password"
      minlength="8"
      class="bg-transparent border-2 border-primary rounded-lg p-1"
      type="password"
      name="password"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
const username = ref("");
const password = ref("");
</script>
