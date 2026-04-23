<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';

const articles = ref([
  {
    category: 'Tips',
    date: 'March 25, 2026',
    title: '5 Tips for Efficient Guest Management',
    desc: 'Learn how to manage hundreds to thousands of guests easily using technology for a simply guided experience.',
    fullDesc: 'By implementing a digital check-in system, you can reduce queuing time by up to 70%. Additionally, using real-time RSVP tracking allows your catering team to minimize waste and ensure everyone is served perfectly.',
    image: '/images/blog-1.jpg',
    isExpanded: false
  },
  {
    category: 'Guide',
    date: 'March 25, 2026',
    title: 'How to Choose the Right Ticketing System',
    desc: 'Complete guide to choosing a ticketing system for various types of events. In modern era like now...',
    fullDesc: 'The right system should support multiple payment gateways, provide instant QR code delivery, and have a robust backend for data analytics. Security is also paramount to prevent ticket fraud and double-scanning at the gate.',
    image: '/images/blog-2.jpg',
    isExpanded: false
  },
  {
    category: 'Insight',
    date: 'March 25, 2026',
    title: 'Event Management Trends 2025',
    desc: 'See the latest trends in the event management industry that will dominate this year. In 2026...',
    fullDesc: 'Hybrid events are no longer just a fallback; they are a strategic choice. Expect to see more AI-driven networking tools and immersive AR experiences that bridge the gap between physical and virtual attendees.',
    image: '/images/blog-3.jpg',
    isExpanded: false
  }
]);

const toggleReadMore = (index) => {
  articles.value[index].isExpanded = !articles.value[index].isExpanded;
};

// Animasi Hover Image
const onEnter = (el) => {
  gsap.to(el.querySelector('.blog-image'), { scale: 1.1, duration: 0.6, ease: "power2.out" });
};
const onLeave = (el) => {
  gsap.to(el.querySelector('.blog-image'), { scale: 1, duration: 0.6, ease: "power2.out" });
};
</script>

<template>
  <section class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
      
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-sans font-bold text-[#1A1A1A] mb-4 tracking-tighter">
          Blog and Article
        </h2>
        <p class="text-gray-500 text-lg">Insights, tips, and updates to help you run better events</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div 
          v-for="(post, index) in articles" 
          :key="index"
          @mouseenter="onEnter($event.currentTarget)"
          @mouseleave="onLeave($event.currentTarget)"
          class="bg-white rounded-[32px] p-4 shadow-sm hover:shadow-md transition-all duration-500 flex flex-col h-fit"
        >
          <div class="overflow-hidden rounded-[24px] aspect-[4/3] mb-6">
            <img :src="post.image" class="blog-image w-full h-full object-cover" />
          </div>

          <div class="flex justify-between items-center mb-4 px-2">
            <span class="px-4 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full uppercase">{{ post.category }}</span>
            <span class="text-gray-400 text-xs italic">{{ post.date }}</span>
          </div>

          <div class="px-2 flex-grow">
            <h3 class="text-xl font-bold text-[#1A1A1A] mb-3 leading-tight">{{ post.title }}</h3>
            
            <p class="text-gray-500 text-sm leading-relaxed inline">
              {{ post.desc }}
            </p>

            <transition name="expand">
              <div v-if="post.isExpanded" class="overflow-hidden">
                <p class="text-gray-500 text-sm leading-relaxed mt-2 pt-2 border-t border-gray-100">
                  {{ post.fullDesc }}
                </p>
              </div>
            </transition>

            <button 
              @click="toggleReadMore(index)"
              class="block mt-4 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors underline decoration-2 underline-offset-4"
            >
              {{ post.isExpanded ? 'Show Less' : 'Read More' }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center gap-8">
        <button class="px-12 py-4 bg-[#212E42] text-white rounded-full font-bold hover:bg-[#2c3d58] transition-all transform hover:scale-105">
          Show More
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Transition Logic */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 200px; /* Sesuaikan dengan panjang teks */
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-top: 0;
}
</style>