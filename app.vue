<template>
  <div>
    <Navbar />
    <NuxtPage />
  </div>
</template>

<script setup>
import Lenis from '@studio-freight/lenis'

onMounted(() => {
  // Inisialisasi Smooth Scroll ala Revolut
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
})
</script>

<style>
/* Memastikan scroll smooth bekerja dengan baik di CSS */
html.lenis {
  height: auto;
}
.lenis-stopped {
  overflow: hidden;
}
</style>