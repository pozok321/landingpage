<script setup>
    import {
        ref,
        onMounted
    } from 'vue'
    import {
        gsap
    } from 'gsap'

    const activeTab = ref('private')

    const pricingPlans = [{
            name: 'Core',
            limit: 'Up to 50 Invitation',
            price: 'IDR 1.500.000',
            popular: false
        },
        {
            name: 'Standard',
            limit: '50-100 Invitation',
            price: 'Unlock Plan',
            popular: false
        },
        {
            name: 'Plus',
            limit: '100-150 Invitation',
            price: 'Unlock Plan',
            popular: false
        },
        {
            name: 'Advance',
            limit: '150-200 Invitation',
            price: 'Unlock Plan',
            popular: true
        },
        {
            name: 'Premium',
            limit: '200-300 Invitation',
            price: 'Unlock Plan',
            popular: false
        },
        {
            name: 'Premium',
            limit: '300-500 Invitation',
            price: 'Unlock Plan',
            popular: false
        },
    ]

    const coreFeatures = [{
            icon: 'bx bx-send',
            text: 'Automated RSVP Blast'
        },
        {
            icon: 'bx bx-envelope',
            text: 'Automated Confirmation Message'
        },
        {
            icon: 'bx bx-refresh',
            text: 'Automated Chaser Blast'
        },
        {
            icon: 'bx bx-time-five',
            text: 'Automated Reminder Blast'
        },
        {
            icon: 'bx bx-qr-scan',
            text: 'QR Code'
        },
    ]

    const keyFeatures = [{
            icon: 'bx bx-star',
            text: 'Simple & Efficient RSVP Process'
        },
        {
            icon: 'bx bx-hotel',
            text: 'Centralized Hotel, Flight, Menu Data'
        },
        {
            icon: 'bx bx-grid-alt',
            text: 'Smart Access (1 Family/Guest 1 QR)'
        },
        {
            icon: 'bx bx-user-voice',
            text: 'Guest Management List'
        },
        {
            icon: 'bx bx-poll',
            text: 'E-Vote'
        },
        {
            icon: 'bx bx-lock-alt',
            text: 'RSVP Types: Open, Closed & Tokenized'
        },
        {
            icon: 'bx bx-table',
            text: 'Well-Organized Data Table'
        },
    ]

    const flexibleFor = [
        'Weddings, birthdays, anniversaries',
        'Networking events',
        'Corporate gatherings',
        'Team building',
        'Community/member-only events',
        'Client appreciation events'
    ]

    const ticketingPlans = [{
            name: 'Free Seating / Registration Only',
            features: [
                'Ticket Registration/Purchase Link',
                'Registration Form',
                'Automated Messages (WhatsApp & Email) + QR Code',
                'Website Dashboard for Organizer'
            ],
            price: 'IDR 7.500',
            priceNote: '/Visitor *excluding payment gateway fee',
            buttonText: 'Get Started',
            isContact: false
        },
        {
            name: 'Assigned Seating Ticketing',
            features: [
                'Ticket Purchase Link',
                'Registration Form',
                'Seat Selection System',
                'Automated Messages (WhatsApp & Email) + QR Code',
                'Website Dashboard for Organizer'
            ],
            price: 'Contact Us',
            buttonText: 'Contact Us',
            isContact: true
        }
    ]

    const ticketingKeyFeatures = [{
            icon: 'bx bx-plus-circle',
            text: 'Add On Ticket'
        },
        {
            icon: 'bx bx-purchase-tag',
            text: 'Promo Code & Custom Fee'
        },
        {
            icon: 'bx bx-gift',
            text: 'Souvenir Collection Eligibility'
        },
        {
            icon: 'bx bx-data',
            text: 'Qualification Data Collection'
        },
        {
            icon: 'bx bx-group',
            text: 'Multi Access Management'
        },
    ]

    const flexibleTicketing = ['Concerts', 'Public events', 'Job fairs', 'Seminars & workshops', 'Exhibitions & expos']

    onMounted(() => {
        gsap.from(".pricing-card", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        })
    })
</script>

<template>
    <section class="py-20 px-6 bg-white font-sans text-[#2D394D]">
        <div class="max-w-7xl mx-auto">

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div class="max-w-xl">
                    <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4 text-[#435B71]">
                        Smart & Flexible Guest Management Services & Solutions
                    </h1>
                    <p class="text-gray-500">From private invitations to public ticketing events, choose the right
                        service to manage guests efficiently.</p>
                </div>

                <div class="flex bg-gray-100 p-1 rounded-full border">
                    <button @click="activeTab = 'private'"
                        :class="activeTab === 'private' ? 'bg-[#556987] text-white' : 'text-gray-500'"
                        class="px-6 py-2 rounded-full font-medium transition-all"> Private Gathering </button>
                    <button @click="activeTab = 'ticketing'"
                        :class="activeTab === 'ticketing' ? 'bg-[#556987] text-white' : 'text-gray-500'"
                        class="px-6 py-2 rounded-full font-medium transition-all"> Ticketing </button>
                </div>
            </div>

            <div class="mb-20">
                <div v-if="activeTab === 'private'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="(plan, index) in pricingPlans" :key="index" class="border p-8 rounded-[2rem]"
                        :class="plan.popular ? 'bg-[#FCF9EE] border-[#E2D276]' : 'bg-white border-gray-100'">
                        <h3 class="text-2xl font-bold text-center">{{ plan.name }}</h3>
                        <p class="text-center text-sm text-gray-500">{{ plan.limit }}</p>
                        <div class="border-t border-dashed my-6"></div>
                        <div class="text-center">
                            <p class="font-bold text-xl">{{ plan.price }}</p>
                            <button class="mt-4 text-blue-500 font-bold">Unlock Plan →</button>
                        </div>
                    </div>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div v-for="(plan, idx) in ticketingPlans" :key="idx"
                        class="bg-white border-2 border-blue-50 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-between"
                        :class="{ 'bg-blue-50/30 border-blue-100': plan.isContact }">
                        <div>
                            <h3 class="text-2xl font-bold text-[#435B71] mb-8">{{ plan.name }}</h3>
                            <ul class="space-y-4 mb-10">
                                <li v-for="feat in plan.features" :key="feat"
                                    class="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                    <i class='bx bx-check-circle text-blue-500 text-lg'></i> {{ feat }}
                                </li>
                            </ul>
                        </div>
                        <div class="pt-6 border-t border-dashed">
                            <div v-if="!plan.isContact">
                                <p class="text-xs text-gray-400 mb-1">Start Form</p>
                                <p class="text-4xl font-bold text-[#435B71] mb-1">{{ plan.price }}</p>
                                <p class="text-[10px] text-gray-400 italic mb-6">{{ plan.priceNote }}</p>
                            </div>
                            <button
                                :class="plan.isContact ? 'bg-blue-600 text-white w-full py-4' : 'text-blue-600 font-bold'"
                                class="rounded-full transition-all flex items-center justify-center gap-2">
                                {{ plan.buttonText }} <i class='bx bx-right-arrow-alt'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-12 mb-20" v-if="activeTab == 'private'">
                <div class="lg:w-1/2">
                    <h2 class="text-4xl font-bold mb-4 text-[#435B71]">Private Gathering Services</h2>
                    <p class="text-gray-500">Private Gathering is a more exclusive event limited to specific
                        invitations.</p>
                </div>
                <div class="lg:w-1/2 bg-[#F8FAFC] p-8 md:p-12 rounded-[2.5rem] border border-blue-50">
                    <p class="italic text-gray-400 mb-6 text-sm">All packages include the following core features:</p>
                    <div class="space-y-5">
                        <div v-for="feat in coreFeatures" :key="feat.text"
                            class="flex items-center gap-4 font-bold text-[#435B71]">
                            <div class="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm">
                                <i :class="feat.icon" class="text-blue-500 text-lg"></i>
                            </div>
                            {{ feat.text }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="space-y-6" v-if="activeTab === 'private'">
                <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <h4 class="font-bold mb-6">Undangin Additional Services</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="flex gap-3">
                            <i class='bx bx-mobile-alt text-2xl text-blue-500'></i>
                            <div>
                                <p class="font-bold">Device</p>
                                <p class="text-xs text-gray-500">Included: Device tablet & Thermal Printer</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <i class='bx bx-body text-2xl text-blue-500'></i>
                            <div>
                                <p class="font-bold">Technician</p>
                                <p class="text-xs text-gray-500">Ensuring devices and registration run smoothly</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <i class='bx bx-crown text-2xl text-blue-500'></i>
                            <div>
                                <p class="font-bold">Supervisor</p>
                                <p class="text-xs text-gray-500">Ensuring registration process runs smoothly</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <h4 class="font-bold mb-6">Additional Product Feature</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="flex gap-3">
                            <i class='bx bx-mobile-alt text-2xl text-blue-500'></i>
                            <div>
                                <p class="font-bold">Additional Lucky Draw</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <i class='bx bx-mobile-alt text-2xl text-blue-500'></i>
                            <div>
                                <p class="font-bold">Additional Seat Management</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <i class='bx bx-mobile-alt text-2xl text-blue-500'></i>
                            <div>
                                <p class="font-bold">Additional Blast Message</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <i class='bx bx-mobile-alt text-2xl text-blue-500'></i>
                            <div>
                                <p class="font-bold">Additional Address</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <i class='bx bx-mobile-alt text-2xl text-blue-500'></i>
                            <div>
                                <p class="font-bold">Additional My Event (Flight & Hotel Info)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="key in ['Simple & Efficient RSVP', 'Centralized Data', 'Smart Access QR', 'E-Vote']"
                        class="bg-white border p-4 rounded-xl flex items-center gap-3 font-semibold text-sm shadow-sm">
                        <i class='bx bx-check-circle text-blue-500'></i> {{ key }}
                    </div>
                </div>
            </div>

            <div class="mt-20">
                <h2 class="text-4xl font-bold text-[#435B71] mb-8 text-center">
                    {{ activeTab === 'private' ? 'Key Features' : 'Ticketing Services' }}
                </h2>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="flex flex-wrap gap-4 h-fit">
                        <div v-for="(feature, idx) in (activeTab === 'private' ? keyFeatures : ticketingKeyFeatures)"
                            :key="idx"
                            class="flex items-center gap-3 bg-white border border-blue-100 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow shrink-0">
                            <i :class="feature.icon" class="text-blue-400 text-xl"></i>
                            <span class="text-[#435B71] font-semibold text-sm">{{ feature.text }}</span>
                        </div>
                    </div>

                    <div v-if="activeTab === 'ticketing'"
                        class="bg-blue-50/50 border border-blue-100 p-8 rounded-[2rem]">
                        <div class="flex items-center gap-3 mb-4">
                            <i class='bx bx-briefcase text-blue-500 text-2xl'></i>
                            <h4 class="font-bold text-[#435B71]">Bizmatch – Business Matching</h4>
                        </div>
                        <ul class="space-y-3 ml-9 text-sm text-gray-600 list-disc">
                            <li>Exhibitor & Visitor Meeting Arrangement</li>
                            <li>Direct Chat Between Exhibitors & Visitors</li>
                            <li>Queue Management</li>
                            <li>Hosted Guest</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="mt-20">
                <h2 class="text-4xl font-bold text-[#435B71] mb-8">Flexible For</h2>
                <div class="flex flex-wrap gap-4">
                    <div v-for="(item, idx) in (activeTab === 'private' ? flexibleFor : flexibleTicketing)" :key="idx"
                        class="bg-[#E9F0FA] text-[#435B71] px-8 py-4 rounded-xl font-medium">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>