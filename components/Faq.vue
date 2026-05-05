<script setup>
import { ref, onMounted, computed } from 'vue'; // Tambahkan computed

const api = useApi();
const activeIndex = ref(null);
const getFaqsData = ref({ faqs: [] });

// 1. FILTER DATA: Hanya ambil FAQ yang punya pertanyaan & jawaban valid
const filteredFaqs = computed(() => {
  const items = getFaqsData.value?.faqs || [];
  return items.filter(faq => 
    faq && 
    faq.question && faq.question !== 'NULL' && 
    faq.answer && faq.answer !== 'NULL'
  );
});

const toggleFaq = (id) => {
  activeIndex.value = activeIndex.value === id ? null : id;
};

const getFaq = async () => {
  try {
    const res = await api({ url: '/v1/frontpage/getfaqs' });
    if (res?.data?.faqs) {
      getFaqsData.value = res.data;
    } else if (res?.faqs) {
      getFaqsData.value = res;
    }
  } catch (error) {
    console.error("Gagal mengambil faq:", error);
  }
};

onMounted(() => {
  getFaq();
});
</script>

<template>
  <section class="py-24 px-6 bg-white">
    <div class="max-w-4xl mx-auto">

      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-[#273448] mb-4 tracking-tighter">
          Frequently Asked Questions
        </h2>
        <p class="text-gray-500 text-lg">
          Quick answers to common questions about using Undangin
        </p>
      </div>

      <!-- 2. SCROLL FIX: Gunakan overflow-y-auto dan tambahkan padding kanan (pr-4) -->
      <div class="pr-4 overflow-y-auto max-h-[550px] custom-scrollbar">
        <div class="space-y-4">
          <!-- Render hasil filter, bukan data mentah -->
          <div v-for="faq in filteredFaqs" :key="faq.faq_id"
            class="bg-[#edeff3] rounded-[2rem] overflow-hidden transition-all duration-300 border border-transparent hover:border-gray-200">
            
            <button @click="toggleFaq(faq.faq_id)"
              class="w-full flex justify-between items-center p-8 text-left hover:bg-[#e5e7eb] transition-colors">
              <span class="text-lg font-bold text-[#32435d] pr-4 leading-tight">
                {{ faq.question }}
              </span>
              <i :class="[
                'bx bx-chevron-down text-2xl transition-transform duration-500',
                activeIndex === faq.faq_id ? 'rotate-180' : '' 
              ]"></i>
            </button>

            <div v-show="activeIndex === faq.faq_id" 
                 class="px-8 pb-8 text-gray-600 leading-relaxed animate-fade-in-down">
              <div class="pt-2 border-t border-gray-200/50">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
  /* Animasi buka tutup */
  .animate-fade-in-down {
    animation: fadeInDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Custom Scrollbar Premium */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f8fafc;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #273448;
  }

  h2, button {
    font-family: 'Inter', sans-serif;
  }
</style>