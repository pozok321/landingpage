<script setup>
  import { ref, onMounted, watch, nextTick } from 'vue'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  const route = useRoute()
  const api = useApi()
  
  const portofolio = ref(null)
  const featured = ref([])
  const nonFeatured = ref([])

  const fetchPortofolioImg = async () => {
    try {
      let slugParam = route.params.slug;
      const currentLang = (process.client ? localStorage.getItem('user-locale') : 'id') || 'id';

      const res = await api({
        url: '/v1/frontpage/getimgportfolio',
        method: 'GET',
        params: {
          slug: slugParam,
          lang: currentLang
        },
      });

      if (res?.status === '201' || res?.msg === 'Not Found details') {
        portofolio.value = null;
        return;
      }

      portofolio.value = res.data || res;
      featured.value = portofolio.value.featured || [];
      nonFeatured.value = portofolio.value.nofeatured || [];

      nextTick(() => {
        if (process.client) {
          ScrollTrigger.refresh();
        }
      });
    } catch (error) {
      console.error("Gagal mengambil detail portofolio:", error);
    }
  };

  watch(() => route.params.slug, () => {
    fetchPortofolioImg()
  })

  onMounted(() => {
    fetchPortofolioImg()
  })
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col justify-center pr-4 mb-8 md:mb-0">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Portfolio
          </h2>
          <p class="text-gray-600 text-lg leading-relaxed mb-10">
            A curated portfolio of events powered by Undangin, highlighting our commitment to quality, innovation, and seamless event management.
          </p>
        <NuxtLink :to="`/portofolio/`"
          class="w-full md:w-max px-10 py-4 bg-[#2D3748] text-white rounded-full font-semibold hover:bg-slate-700 transition-colors">
          Portofolio Detail
        </NuxtLink>
        </div>
        <div class="relative group overflow-hidden rounded-[2.5rem]" :key="index" v-for="(item, index) in featured" >
          <div class="absolute top-6 left-6 z-10" >
            <span v-if="item.featured == 'Y'" class="flex items-center gap-1 px-3 py-1 bg-yellow-100/90 backdrop-blur-sm text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
              Featured
            </span>
          </div>
          <img 
            :src="item.image_url" 
            :alt="item.title" 
            class="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div class="relative group overflow-hidden rounded-[2.5rem]" :key="index" v-for="(item, index) in nonFeatured" >
          <div class="absolute top-6 left-6 z-10" >
            <span v-if="item.featured == 'Y'" class="flex items-center gap-1 px-3 py-1 bg-yellow-100/90 backdrop-blur-sm text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
              Featured
            </span>
          </div>
          <img 
            :src="item.image_url" 
            :alt="item.title" 
            class="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
img {
  backface-visibility: hidden;
}
</style>