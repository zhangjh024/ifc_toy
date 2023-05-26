<template>
  <h1>Events for Good</h1>
  <div class="container">
    <div>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import  getEvents  from '@/services/EventService.js'



const events = ref(
  []
)

onMounted(async () => {
  const response = await getEvents.getEvents()
  events.value = response.data;
  console.log(events.value)
})
</script>


<style scoped>
.container{
  /* 提示：通过flex布局实现卡片水平居中 */
  display: flex;
  justify-content: center;
}
</style>
