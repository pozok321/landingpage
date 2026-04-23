<template>
  <section class="py-20 bg-white px-6">
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      
      <div class="space-y-8">
        <div class="space-y-4">
          <h2 class="text-5xl md:text-6xl font-bold text-[#4B6181] leading-[1.1]">
            Everything <br />
            Set Up, <br />
            Effortlessly
          </h2>
          <p class="text-gray-500 text-lg md:text-xl max-w-md">
            A guided experience to help you get everything ready without the hassle
          </p>
        </div>

        <div class="space-y-4">
          <p class="text-xs italic text-gray-400">* Available on the App Store and Google Play</p>
          <div class="flex flex-wrap gap-4">
            <a href="#" class="transition-transform hover:scale-105">
              <img 
                src="/public/images/playstore.svg" 
                alt="Get it on Google Play" 
                class="h-14 w-auto"
              />
            </a>
            <a href="#" class="transition-transform hover:scale-105">
              <img 
                src="/public/images/appstore.svg" 
                alt="Download on the App Store" 
                class="h-14 w-auto"
              />
            </a>
          </div>
        </div>
      </div>

      <div class="space-y-10">
        <div 
          v-for="(item, index) in steps" 
          :key="index"
          class="flex items-start gap-6 group"
        >
          <div class="flex-shrink-0 w-16 h-16 bg-[#F1F3F6] rounded-2xl flex items-center justify-center transition-colors group-hover:bg-blue-50">
            <i :class="['bx text-3xl text-[#4B6181] transition-colors group-hover:text-blue-600', item.icon]"></i>
          </div>

          <div class="space-y-1">
            <h4 class="text-xl font-bold text-[#273448]">{{ item.title }}</h4>
            <p class="text-gray-500 text-sm leading-relaxed max-w-xs">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: 'Contact Our Team',
    description: 'Discuss your event needs with our team via WhatsApp',
    icon: 'bx-phone-call'
  },
  {
    title: 'Consultation & Setup',
    description: 'Our team will help setup and configure according to event needs',
    icon: 'bx-cog'
  },
  {
    title: 'Manage Event',
    description: 'Use the dashboard to manage guests, RSVP, and check-in',
    icon: 'bx-bar-chart-alt-2'
  },
  {
    title: 'Smooth Event Execution',
    description: 'Enjoy a well-organized event with comprehensive reports',
    icon: 'bx-star'
  }
]
</script>

<style scoped>
/* Anda bisa menambahkan font-family Inter di sini jika belum global */
h2 {
  letter-spacing: -0.02em;
}
</style>