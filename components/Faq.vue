<template>
  <section class="py-24 px-6">
    <div class="max-w-4xl mx-auto">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-[#273448] mb-4">
          Frequently Asked Questions
        </h2>
        <p class="text-gray-500 text-lg">
          Quick answers to common questions about using Undangin
        </p>
      </div>

      <div class="space-y-4">
        <div 
          v-for="(faq, index) in faqs" :key="index"
          class="bg-[#edeff3] rounded-2xl overflow-hidden transition-all duration-300"
        >
          <button 
            @click="toggleFaq(index)"
            class="w-full flex justify-between items-center p-6 text-left hover:bg-gray-100 transition-colors"
          >
            <span class="text-lg font-semibold text-[#32435d]">
              {{ faq.question }}
            </span>
            <i 
              :class="[
                'bx bx-chevron-down text-2xl transition-transform duration-300',
                activeIndex === index ? 'rotate-180' : ''
              ]"
            ></i>
          </button>

          <div 
            v-show="activeIndex === index"
            class="px-6 pb-6 text-gray-600 leading-relaxed animate-fade-in-down"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(null)

const toggleFaq = (index) => {
  // Jika klik pada yang sudah terbuka, maka tutup (null). Jika tidak, buka yang baru.
  activeIndex.value = activeIndex.value === index ? null : index
}

const faqs = [
  {
    question: 'What is Undangin?',
    answer: 'Undangin is a comprehensive event management platform designed to help organizers manage everything from digital invitations and RSVPs to guest check-ins and comprehensive reporting.'
  },
  {
    question: 'How much does Undangin cost?',
    answer: 'We offer flexible pricing plans based on your event size and feature requirements. Contact our sales team for a customized quote that fits your specific needs.'
  },
  {
    question: 'Can it be customized?',
    answer: 'Yes! You can customize themes, invitation details, and various event settings to match your brand or wedding theme perfectly.'
  },
  {
    question: 'How does check-in work on the event day?',
    answer: 'On the day of the event, your team can use our specialized dashboard or mobile app to scan guest QR codes for instant, contactless check-in.'
  }
]
</script>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Memastikan font Inter atau font utama Anda teraplikasi */
h2, button {
  font-family: 'Inter', sans-serif;
}
</style>