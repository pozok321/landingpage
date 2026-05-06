<script setup>
import { ref } from 'vue'

// Ganti ID ini dengan ID video YouTube untuk proyek Undangin
const videoId = ref('_JQvSJn1vpI') 
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-6">
      
      <!-- Video Container Direct -->
      <div class="relative aspect-video rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl bg-black border-[8px] border-gray-50 transition-opacity">
        <iframe 
          :src="`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="w-full h-full"
        ></iframe>
      </div>

      <div class="mt-8 text-center">
        <h3 class="text-2xl font-bold text-[#273448] tracking-tight">
          Revolutionizing How We Do Events
        </h3>
        <p class="text-gray-500 mt-2 font-medium">www.undangin.com</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Memastikan rasio video tetap 16:9 di semua perangkat */
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Memperhalus tampilan di mobile */
@media (max-width: 768px) {
  .aspect-video {
    border-width: 4px; /* Border lebih tipis di mobile */
  }
}
</style>