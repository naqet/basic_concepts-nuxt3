<script setup lang="ts">
let isMenuOpen = ref(false);
</script>

<template>
  <header class="p-2 flex justify-between items-center">
    <NuxtLink to="/">
      <p class="text-lg font-sans">Amazing posts</p>
    </NuxtLink>
    <button type="button" title="Open menu" @click="isMenuOpen = !isMenuOpen">
      <Icon v-if="isMenuOpen" name="mi:close" size="35" />
      <Icon v-else name="mi:menu" size="35" />
    </button>
    <ul v-if="isMenuOpen">
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="profile">Your posts</NuxtLink></li>
      <li><NuxtLink to="profile">Feed</NuxtLink></li>
    </ul>
  </header>
</template>
