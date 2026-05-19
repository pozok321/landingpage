<template>
  <div class="bg-white py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto text-center mb-12">
      <h2 class="text-4xl font-bold text-slate-900 mb-4">Showcasing Our Experience</h2>

      <div class="inline-flex flex-col items-center mt-8">
        <span class="text-sm font-semibold text-slate-900 mb-3">Our Masterpiece Managing</span>
        <div class="bg-slate-100 p-1.5 rounded-full flex gap-2">
          <button v-for="tab in ['private', 'ticketing']" :key="tab" @click="activeTab = tab"
            :class="activeTab === tab ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'"
            class="px-10 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize">
            {{ tab }}
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto">
      <div v-if="filteredItems.length === 0" class="text-center py-12 text-gray-400">
        No portfolio items found for this category.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-500" :key="activeTab">
        <div v-for="item in filteredItems" :key="item.image_id"
          class="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-slate-200 shadow-sm cursor-pointer">

          <img :src="item.image_url" :alt="item.alt_image"
            class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />

          <span v-if="item.featured === 'Y'"
            class="absolute top-4 left-4 z-10 bg-yellow-100/90 backdrop-blur-sm text-yellow-700 text-xs font-bold rounded-full border border-yellow-200 flex items-center gap-1 px-3 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24">
              <path
                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
            Featured
          </span>

          <div v-if="item.title"
            class="absolute top-4 right-4 z-20 max-w-[70%] pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
            <div
              class="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-2 rounded-xl shadow-lg border border-white/10 flex items-start gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-400 mt-0.5 shrink-0" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ item.title }}</span>
            </div>
          </div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 z-0">
            <p class="text-white font-bold text-lg leading-tight">{{ item.title }}</p>
            <p class="text-slate-300 text-[10px] mt-1 whitespace-pre-line">{{ item.description }}</p>
            <a v-if="item.button_link"
              :href="item.button_link.startsWith('http') ? item.button_link : 'https://' + item.button_link"
              target="_blank" rel="noopener noreferrer"
              class="mt-3 inline-block bg-white text-black text-[10px] font-bold py-2 px-4 rounded-full w-fit hover:bg-blue-500 hover:text-white transition-colors">
              {{ item.button_text || 'Hubungi Kami' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted,
    watch,
    nextTick,
    computed
  } from 'vue'
  import {
    useRoute
  } from 'vue-router'
  import {
    ScrollTrigger
  } from 'gsap/ScrollTrigger'

  const activeTab = ref('private')
  const route = useRoute()
  const api = useApi()
  const portofolio = ref([])

  const fetchPortofolioImg = async () => {
    try {
      const currentLang = (process.client ? localStorage.getItem('user-locale') : 'id') || 'id';
      const res = await api({
        url: '/v1/frontpage/getimgportfoliobycategory',
        method: 'GET',
        params: {
          slug: route.params.slug || '',
          lang: currentLang
        },
      });

      if (res ?.data ?.categories) {
        portofolio.value = res.data.categories
      } else if (Array.isArray(res ?.data)) {
        portofolio.value = res.data
      } else if (Array.isArray(res)) {
        // JAGA-JAGA: Jika axios / internal API langsung mengembalikan data array di root level response
        portofolio.value = res
      } else {
        portofolio.value = []
      }

      nextTick(() => {
        if (process.client) ScrollTrigger.refresh();
      });
    } catch (error) {
      console.error("Gagal mengambil detail portofolio:", error);
      portofolio.value = []
    }
  };

  // FIX 2: Perbaikan pencocokan string nama kategori dari API (.trim() untuk menghapus spasi gaib)
  const filteredItems = computed(() => {
    if (!portofolio.value || !Array.isArray(portofolio.value)) return []

    const category = portofolio.value.find(
      (cat) => cat.cat_name ?.toLowerCase().trim() === activeTab.value.toLowerCase().trim()
    )
    return category ? category.portfolio : []
  })

  watch(() => route.params.slug, () => {
    fetchPortofolioImg()
  })

  onMounted(() => {
    fetchPortofolioImg()
  })
</script>