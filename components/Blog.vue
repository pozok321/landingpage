<script setup>
  import {
    ref,
    onMounted,
    computed
  } from 'vue';

  const router = useRouter();
  const api = useApi();
  const visibleCount = ref(3);
  const currentLang = localStorage.getItem('user-locale')

  // Inisialisasi dengan struktur yang jelas
  const getBlogData = ref({
    posts: []
  });

  const getBlog = async () => {
    try {
      const res = await api({
        url: '/v1/frontpage/getblogpostlist',
        method: 'get'
      });
      if (res ?.data ?.posts) {
        getBlogData.value = res.data;
      } else if (res ?.posts) {
        getBlogData.value = res;
      }
    } catch (error) {
      console.error("Gagal mengambil blog:", error);
    }
  };

  const displayedPosts = computed(() => {
    // Tambahkan log untuk melihat kapan computed ini berjalan
    const items = getBlogData.value ?.posts || [];
    return items.slice(0, visibleCount.value);
  });

  const hasMore = computed(() => {
    return (getBlogData.value ?.posts ?.length || 0) > visibleCount.value;
  });

  // const showMore = () => {
  //   visibleCount.value += 3;
  // };

  onMounted(() => {
    getBlog();
  });
</script>

<template>
  <section class="py-24 px-6">
    <div class="max-w-7xl mx-auto container">
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-sans font-bold text-[#1A1A1A] mb-4 tracking-tighter">
          Blog and Article
        </h2>
        <p class="text-gray-500 text-lg">Insights, tips, and updates to help you run better events</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div v-for="(post, index) in displayedPosts" :key="post.post_id || index"
          class=" h-full p-10 rounded-[40px] flex flex-col border border-black-800 justify-between shadow-sm hover:shadow-md transition-shadow">

          <div class="overflow-hidden rounded-[24px] aspect-[4/3] mb-6">
            <!-- PERBAIKAN: Gunakan encodeURIComponent agar karakter & dan : tidak merusak router -->
            <nuxt-link v-if="post.featured_image" :to="'/blog/detail/' + post.slug">
              <img :src="post.featured_image" :alt="post.alt_image || post.title"
                class="blog-image w-full h-full object-cover" />
            </nuxt-link>
          </div>

          <div class="flex justify-between items-center mb-4 px-2">
            <span
              class="px-4 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full uppercase">{{ post.category }}</span>
            <span class="text-black text-sm italic">{{ post.published_at }}</span>
          </div>

          <div class="px-2 flex-grow">
            <nuxt-link :to="'/blog/detail/' + post.slug">
              <h3 class="text-xl font-bold text-[#1A1A1A] mb-3 leading-tight hover:text-blue-600 cursor-pointer">
                {{ post.title }}
              </h3>
            </nuxt-link>

            <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">
              {{ post.slug }}
            </p>
          </div>
        </div>
      </div>
      <div class="text-center">
        <a href="/blog/" class="px-10 py-4 bg-[#2D394B] text-white rounded-full font-bold hover:bg-[#1A232F]">
          Show More
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
  /* Transition Logic */
  .expand-enter-active,
  .expand-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    max-height: 200px;
    /* Sesuaikan dengan panjang teks */
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