<template>
  <div class="bg-white py-16 px-4 sm:px-6 lg:px-8">
    <!-- Header & Filter Tabs -->
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

    <!-- Grid Konten dengan Animasi Transisi Sederhana -->
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-500" :key="activeTab">
        <div v-for="item in filteredItems" :key="item.image_id"
          class="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-slate-200"> 
          <img :src="item.image_url" :alt="item.alt_image"
            class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
              <span v-if="item.featured == 'Y'"
                class="absolute top-4 left-4 bg-yellow-100/90 backdrop-blur-sm text-yellow-700 text-xs font-bold rounded-full border border-yellow-200 flex items-center gap-1 px-3 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                Featured
              </span>
          <div class="absolute inset-0 flex flex-col justify-end p-6">
            <p class="text-white font-bold text-lg leading-tight">{{ item.title }}</p>
            <p class="text-slate-300 text-[10px] mt-1 whitespace-pre-line">{{ item.description }}</p>
            <a :href="item.button_link" target="_blank"
              class="mt-3 inline-block bg-white text-black text-[10px] font-bold py-2 px-4 rounded-full w-fit hover:bg-blue-500 hover:text-white transition-colors">
              {{ item.button_text }}
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
    ScrollTrigger
  } from 'gsap/ScrollTrigger'

  const activeTab = ref('private')
  const route = useRoute()
  const api = useApi()
  const portofolio = ref(null)

  const fetchPortofolioImg = async () => {
  try {
    let slugParam = route.params.slug;
    const currentLang = (process.client ? localStorage.getItem('user-locale') : 'id') || 'id';

    const res = await api({
      url: '/v1/frontpage/getimgportfoliobycategory',
      method: 'GET',
      params: { slug: slugParam, lang: currentLang },
    });
    if (res?.data?.categories) {
      portofolio.value = res.data.categories
    } else {
      portofolio.value = []
    }

    nextTick(() => {
      if (process.client) ScrollTrigger.refresh();
    });
  } catch (error) {
    console.error("Gagal mengambil detail portofolio:", error);
  }
};

const filteredItems = computed(() => {
  if (!portofolio.value) return []
  const category = portofolio.value.find(
    (cat) => cat.cat_name.toLowerCase() === activeTab.value.toLowerCase()
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