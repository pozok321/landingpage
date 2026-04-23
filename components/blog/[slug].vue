<script setup>
const route = useRoute();
const slug = route.params.slug;

// Mock Data (Nantinya bisa diganti dengan Fetch API/CMS)
const article = {
  title: 'Event Management Trends 2025',
  category: 'Insight',
  date: 'January 10, 2026',
  author: 'Lorem Ipsum',
  image: '/images/blog-3.jpg',
  content: `
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC...</p>
  `,
  hashtags: ['#LoremIpsum', '#Event', '#Article', '#Blog', '#GuestManagement']
};

const relatedArticles = [
  { title: '5 Tips for Efficient Guest Management', category: 'Tips', date: 'March 25, 2026', image: '/images/blog-1.jpg' },
  { title: 'How to Choose the Right Ticketing System', category: 'Guide', date: 'March 25, 2026', image: '/images/blog-2.jpg' }
];
</script>

<template>
  <div class="bg-white min-h-screen font-sans">
    <Navbar />

    <main class="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div class="flex flex-col lg:flex-row gap-12">
        
        <div class="lg:w-2/3">
          <div class="mb-8">
            <span class="px-4 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4 inline-block">
              {{ article.category }}
            </span>
            <h1 class="text-4xl md:text-6xl font-bold text-[#1A1A1A] tracking-tighter leading-tight mb-6">
              {{ article.title }}
            </h1>
            <div class="flex items-center text-sm text-gray-400 gap-4">
              <p>Article Post: <span class="text-gray-600 font-medium">{{ article.date }}</span></p>
              <p>Written by: <span class="text-blue-600 font-medium cursor-pointer">{{ article.author }}</span></p>
            </div>
          </div>

          <div class="rounded-[40px] overflow-hidden mb-10 shadow-lg">
            <img :src="article.image" class="w-full h-auto object-cover" :alt="article.title" />
            <p class="p-4 text-xs text-gray-400 italic bg-gray-50 border-t border-gray-100">Image source: unsplash.com</p>
          </div>

          <article class="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6" v-html="article.content">
          </article>
        </div>

        <aside class="lg:w-1/3 flex flex-col gap-10">
          
          <div>
            <h3 class="text-xl font-bold mb-6 pb-2 border-b-2 border-blue-600 inline-block">Another Insight for you</h3>
            <div class="space-y-6">
              <div v-for="(item, i) in relatedArticles" :key="i" class="flex flex-col gap-4 p-4 border border-gray-100 rounded-3xl hover:shadow-md transition">
                <div class="flex justify-between items-center text-[10px]">
                  <span class="px-2 py-0.5 bg-blue-50 text-blue-500 rounded-full font-bold uppercase">{{ item.category }}</span>
                  <span class="text-gray-400">{{ item.date }}</span>
                </div>
                <h4 class="font-bold text-sm text-[#1A1A1A] leading-snug">{{ item.title }}</h4>
                <a href="#" class="text-blue-600 text-xs font-bold underline">Read More</a>
              </div>
            </div>
            <button class="w-full mt-6 py-3 border border-gray-200 rounded-full text-gray-500 font-bold hover:bg-gray-50 transition">
              Find more
            </button>
          </div>

          <div>
            <h3 class="text-xl font-bold mb-6 pb-2 border-b-2 border-blue-600 inline-block">Hashtag</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in article.hashtags" :key="tag" class="text-xs text-gray-400 font-medium italic">
                {{ tag }}
              </span>
            </div>
          </div>

        </aside>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Styling tambahan untuk konten HTML dari CMS/Mock */
article p {
  margin-bottom: 1.5rem;
}
</style>