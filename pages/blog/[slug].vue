<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const api = useApi()

const blog = ref(null)
const relatedPosts = ref([
  { title: '5 Tips for Efficient Guest Management', category: 'Tips', date: 'March 25, 2026', slug: 'tips-guest-management' },
  { title: 'How to Choose the Right Ticketing System', category: 'Guide', date: 'March 25, 2026', slug: 'choose-ticketing' },
  { title: 'Event Management Trends 2025', category: 'Insight', date: 'March 25, 2026', slug: 'trends-2025' },
])

const fetchBlogDetail = async () => {
  try {
    const res = await api({
      url: `/v1/frontpage/getpostdetails?slug=${route.params.slug}`,
      // method: 'GET'
    })
    blog.value = res.data
    consoole.log('Blog Detail:', blog.value)
  } catch (error) {
    console.error("Gagal mengambil detail blog:", error)
  }
}

onMounted(() => {
  fetchBlogDetail()
})
</script>

<template>
  <section class="py-12 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="mb-8">
        <span class="px-4 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full uppercase">Insight</span>
        <div class="mt-4 text-gray-400 text-sm">
          Article Post : January 10, 2025 | Written by : <span class="text-[#273448] font-bold">Admin Undangin</span>
        </div>
      </div>

      <h1 class="text-4xl md:text-6xl font-bold text-[#273448] mb-10 tracking-tighter leading-tight max-w-4xl">
        Event Management Trends 2025
      </h1>

      <div class="w-full aspect-video rounded-[32px] overflow-hidden mb-12 shadow-lg">
        <img 
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622" 
          alt="Main Blog Image" 
          class="w-full h-full object-cover"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div class="lg:col-span-8">
          <article class="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p class="mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
            </p>
            <h2 class="text-2xl font-bold text-[#273448] mt-10 mb-4">Why do we use it?</h2>
            <p class="mb-6">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...
            </p>
            </article>

          <div class="mt-16 pt-8 border-t border-gray-100">
            <h4 class="font-bold text-[#273448] mb-4 text-xl">Hashtag</h4>
            <div class="flex flex-wrap gap-2 italic text-gray-400">
              <span>#LoremIpsum</span> <span>#Article</span> <span>#Blog</span> <span>#Guest</span> <span>#Management</span>
            </div>
          </div>
        </div>

        <aside class="lg:col-span-4">
          <div class="sticky top-32">
            <h3 class="text-2xl font-bold text-[#273448] mb-8">Another Insight for you</h3>
            
            <div class="space-y-6">
              <div v-for="post in relatedPosts" :key="post.slug" class="bg-[#F8FAFC] p-6 rounded-3xl hover:shadow-md transition-all">
                <div class="flex justify-between items-center mb-3">
                  <span class="px-3 py-1 bg-blue-100 text-blue-500 text-[10px] font-bold rounded-full uppercase">{{ post.category }}</span>
                  <span class="text-gray-400 text-[10px]">{{ post.date }}</span>
                </div>
                <h4 class="font-bold text-[#273448] mb-2 leading-snug">{{ post.title }}</h4>
                <p class="text-xs text-gray-500 line-clamp-2 mb-4">Learn how to manage hundreds to thousands of guests easily using technology...</p>
                <NuxtLink :to="`/blog/${post.slug}`" class="text-blue-500 text-xs font-bold underline underline-offset-4">Read More</NuxtLink>
              </div>
            </div>

            <button class="w-full mt-8 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all">
              Find more
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
  <Footer/>
</template>