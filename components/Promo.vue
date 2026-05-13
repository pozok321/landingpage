<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const api = useApi()
const isVisible = ref(false)
const promoContainer = ref(null)
const promoData = ref(null)
const promoImage = ref('')
const buttonLink = ref('')
const buttonText = ref('')
const promoText = ref('')
const promoEnabled = ref('')

const getPromo = async () => {
    try {
      const currentLang = (process.client ? localStorage.getItem('user-locale') : 'id') || 'id';
      const res = await api({
        url: '/v1/frontpage/getpromo',
        method: 'GET',
        params: {
          lang: currentLang
        },
      });

      if (res?.status === '201' || res?.msg === 'Not Found details') {
        promoData.value = null;
        return;
      }

      promoData.value = res.data;
      buttonLink.value = res.data.button_link;
      buttonText.value = res.data.button_text;
      promoText.value = res.data.promo_text;
      promoEnabled.value = res.data.promo_enabled;
      
      // PERBAIKAN DI SINI:
      // Membersihkan backslash dari URL agar valid
      if (res.data.promo_image) {
        promoImage.value = res.data.promo_image.replace(/\\/g, '');
      }

    } catch (error) {
      console.error("Gagal mengambil detail promo :", error);
    }
  };

onMounted(() => {
getPromo();
  // Cek apakah user sudah menekan tombol "Jangan tunjukkan lagi" secara permanen
  const isPermanentlyHidden = localStorage.getItem('hidePromoPermanently')
  
  if (!isPermanentlyHidden) {
    isVisible.value = true
    setTimeout(() => {
      gsap.fromTo(promoContainer.value, 
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      )
    }, 500)
  }
})

const closePromo = (permanently = false) => {
  if (permanently) {
    // Jika ditekan "Jangan tunjukkan lagi", simpan di LocalStorage
    localStorage.setItem('hidePromoPermanently', 'true')
  }

  gsap.to(promoContainer.value, {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      isVisible.value = false
    }
  })
}
</script>

<template v-if="promoEnabled == 'true'">
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 z-[999] flex items-center justify-center px-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" @click="closePromo(false)"></div>

      <!-- Promo Card -->
      <div 
        ref="promoContainer"
        class="relative bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl text-center border border-white/20"
      >
        <!-- Tombol Close (X) Pojok Kanan Atas -->
        <button 
          @click="closePromo(false)" 
          class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img :src="promoImage" alt="Promo Image" class="mx-auto mb-6 w-full h-48 object-cover rounded-lg" />
        <p class="text-gray-600 mb-8 leading-relaxed">
          {{promoText}}
        </p>

        <div class="flex flex-col gap-4 items-center">
          <button 
            @click="() => $router.push(buttonLink)"
            class="w-full px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
          >
            {{buttonText}}
          </button>
          
          <!-- Button Kecil "Jangan tunjukkan lagi" -->
          <button 
            @click="closePromo(true)"
            class="text-xs text-gray-400 hover:text-gray-600 underline decoration-dotted underline-offset-4 transition-all"
          >
            Jangan tunjukkan lagi di perangkat ini
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>