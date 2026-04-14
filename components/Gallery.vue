<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, ref, nextTick } from 'vue'; // Tambahkan nextTick

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryRef = ref(null);

onMounted(async () => {
  // Tunggu sampai Vue benar-benar selesai merender semua elemen
  await nextTick();

  if (galleryRef.value) {
    const items = galleryRef.value.querySelectorAll('.gallery-item');
    
    if (items.length > 0) {
      items.forEach((item, index) => {
        const speed = (index + 1) * 30;

        gsap.to(item, {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }
  }
});

const bentoPhotos = [
  { 
    title: 'Client Satisfaction', 
    desc: 'Trusted by organizers for reliable and seamless event management',
    url: '/public/images/left-image.jpg', 
    size: 'md:col-span-2 md:row-span-2' 
  },
  { 
    title: 'Event Managed', 
    desc: 'Successfully supporting events across various industries and scales',
    url: '/public/images/center-image.jpg', 
    size: 'md:col-span-2 md:row-span-1' 
  },
  { 
    title: 'Guest Registered', 
    desc: 'Millions of guest experiences handled smoothly through our platform',
    url: '/public/images/right-image.jpg', 
    size: 'md:col-span-1 md:row-span-2' 
  }
];
</script>

<template>
  <section ref="galleryRef" class="featured-gallery relative z-10 py-32 bg-white overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="mb-20 text-left max-w-2xl">
        <h2 class="text-5xl md:text-8xl font-bold tracking-tighter text-black leading-none mb-6">
          Everything <br/> financial.
        </h2>
        <p class="text-xl text-gray-500">From everyday spending to planning for your future.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[900px]">
        <div 
          v-for="(item, index) in bentoPhotos" 
          :key="index"
          :class="['bento-item group relative overflow-hidden rounded-[2.5rem] bg-gray-50', item.size]"
        >
          <div class="absolute top-10 left-10 z-20 max-w-[200px]">
            <h3 class="text-2xl font-bold text-black tracking-tight mb-2">{{ item.title }}</h3>
            <p class="text-gray-500 font-medium">{{ item.desc }}</p>
          </div>

          <img 
            :src="item.url" 
            class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  </section>
</template>