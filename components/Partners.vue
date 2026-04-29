<script setup>
    import {
        ref, onMounted
    } from 'vue'

    const api = useApi()
    const getPartnersData = ref([])
    const router = useRouter()  

    const getPartners = async () => {
  try {
    const res = await api({
        url: '/v1/frontpage/getpartners',
        method: 'GET'
    });
    // Pastikan struktur data sesuai, misal res.data atau res.data.partners
    getPartnersData.value = res.data;
    console.log("Data partner berhasil diambil:", getPartnersData.value);
  } catch (error) {
    console.error("Gagal mengambil data partner:", error);
  }
};

  onMounted(() => {
      getPartners()
  })
</script>

<template>
  <section class="py-24 bg-white px-6">
    <div class="max-w-7xl mx-auto text-center">
      
      <div class="mb-20">
        <h2 class="text-4xl md:text-5xl font-sans font-bold text-[#1A1A1A] mb-6 tracking-tighter">
          Lovely Partners
        </h2>
        <p class="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          We collaborate with trusted partners to deliver seamless event experiences, 
          combining technology and expertise to support every stage of your event journey.
        </p>

        <div class="mt-16 flex flex-wrap justify-center items-center gap-12 md:gap-20">
          <div 
            v-for="partner in getPartnersData.partners" 
            :key="partner.partner_id"
            class="partner-logo w-32 md:w-40 h-20 flex items-center justify-center transition-all duration-500 opacity-80 hover:opacity-100 transform hover:scale-110"
          >
            <img :src="partner.partner_logo" :alt="partner.partner_name" class="max-w-full max-h-full object-contain" />
          </div>
        </div>
      </div>

      <div class="pt-16 border-gray-100">
        <h3 class="text-4xl md:text-5xl font-sans font-bold text-[#1A1A1A] mb-6 tracking-tighter">
          Start a Partnership With Us
        </h3>
        <p class="text-gray-500 max-w-3xl mx-auto leading-relaxed mb-10">
          Collaborate with Undangin to deliver seamless and engaging event experiences, 
          supported by reliable technology and a team committed to helping you succeed at every stage.
        </p>
        
        <button class="px-10 py-4 bg-[#2D394B] text-white rounded-full font-bold hover:bg-[#1A232F] transition-all transform hover:scale-105 shadow-xl shadow-gray-200">
          Become Our Partner
        </button>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Memastikan transisi grayscale mulus di MacBook Air M2 */
.partner-logo {
  will-change: transform, filter;
}
</style>