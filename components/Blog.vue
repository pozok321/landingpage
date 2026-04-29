<script setup>
  import {
    ref,
    onMounted
  } from 'vue';
import { routerKey } from 'vue-router';
  const router = useRouter();
  const config = useRuntimeConfig();
  const BASE_URL = config.public.apiUrl;

  const api = useApi();
  const getBlogData = ref([]);

  const getBlog = async () => {
    try {
      const res = await api({
        url: '/v1/frontpage/getblogpostlist',
        method: 'GET'
      });

      // 2. Map data untuk menambahkan state isExpanded
      const data = Array.isArray(res.data) ? res.data : [];
      getBlogData.value = res.data
    } catch (error) {
      console.error("Gagal mengambil blog:", error);
    }
  };

const toPostDetails = (post) => {
  if (post && post.slug) {
    router.push('/blog/'+ post.slug);
  } 
};

  onMounted(() => {
    getBlog();
  });

  const toggleExpand = (post) => {
    post.isExpanded = !post.isExpanded;
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
        <div v-for="(post, index) in getBlogData.posts" :key="post.post_id || index"
          class="bg-white rounded-[32px] p-4 shadow-sm hover:shadow-md transition-all duration-500 flex flex-col h-fit">
          <div class="overflow-hidden rounded-[24px] aspect-[4/3] mb-6">
            <img v-if="post.featured_image" :src="post.featured_image" @click="toPostDetails(post)"
              :alt="post.alt_image || post.title" class="blog-image w-full h-full object-cover" />
          </div>

          <div class="flex justify-between items-center mb-4 px-2">
            <span
              class="px-4 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full uppercase">{{ post.category }}</span>
            <span class="text-gray-400 text-xs italic">{{ post.slug }}</span>
          </div>

          <div class="px-2 flex-grow">
            <h3 class="text-xl font-bold text-[#1A1A1A] mb-3 leading-tight">{{ post.title }}</h3>

            <p class="text-gray-500 text-sm leading-relaxed inline">
              {{ post.slug }}
            </p>

            <transition name="expand">
              <div v-if="post.isExpanded" class="overflow-hidden">
                <p class="text-gray-500 text-sm leading-relaxed mt-2 pt-2 border-t border-gray-100">
                  {{ post.slug }}
                </p>
              </div>
            </transition>

            <!-- <button
              class="block mt-4 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors underline decoration-2 underline-offset-4">
              {{ post.isExpanded ? 'Show Less' : 'Read More' }}
            </button> -->
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center gap-8">
        <button
          class="px-12 py-4 bg-[#212E42] text-white rounded-full font-bold hover:bg-[#2c3d58] transition-all transform hover:scale-105">
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