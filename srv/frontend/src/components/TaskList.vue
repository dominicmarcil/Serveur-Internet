<template>
  <ul class="bg-white shadow p-4 rounded">
    <li v-for="t in tasks" :key="t.id" class="border-b py-2">
      {{ t.text }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ["tasks"],
};
</script>
