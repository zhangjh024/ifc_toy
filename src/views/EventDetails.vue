<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script setup>
import EventService from '@/services/EventService.js'
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps(['id']);
const id = ref(props.id);
const event = ref(null);

onMounted(async () => {
  const response = await EventService.getEvent(id.value);
  console.log(response.data)
  event.value = response.data;
});


</script>
