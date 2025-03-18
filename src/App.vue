<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import AOS from 'aos'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'aos/dist/aos.css'


onMounted(() => {
  AOS.init({
    duration: 500,
    once: true,
  })
})

const slides = [
  {
    image: '/images/digital-innovation.jpeg',
    title: 'Digital Innovation',
    subtitle: 'Transforming Ideas into Digital Reality'
  },
  {
    image: '/images/cloud-solutions.jpeg',
    title: 'Cloud Solutions',
    subtitle: 'Scalable Infrastructure for Tomorrow'
  },
  {
    image: '/images/enterprise-technology.jpeg',
    title: 'Enterprise Technology',
    subtitle: 'Powering Business Growth'
  }
]

const services = [
  {
    title: 'Point of Sale (POS)',
    description: 'Modern POS solutions that streamline your business operations with advanced inventory management, reporting, and customer relationship features.',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    title: 'E-commerce Solutions',
    description: 'Custom e-commerce platforms that provide seamless shopping experiences with secure payment integration and inventory management.',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
  },
  {
    title: 'ERP Systems',
    description: 'Comprehensive ERP solutions that integrate all aspects of your business operations into a single, efficient system.',
    icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2'
  },
  {
    title: 'School Management System',
    description: 'Complete school management solution with features for attendance, grades, scheduling, and parent communication.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    title: 'Hospital Management System',
    description: 'Comprehensive healthcare management system for patient records, appointments, billing, and inventory management.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  }
]

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const submitStatus = ref<'success' | 'error' | null>(null)

const handleSubmit = async () => {
  loading.value = true;
  submitStatus.value = null;
  
  try {
    const response = await fetch('https://meta-site-vue.anandncs.workers.dev/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    });

    const data = await response.json();
    
    if (data.success) {
      submitStatus.value = 'success';
      // Clear the form after successful submission
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    } else {
      console.error('Error response:', data);
      throw new Error(data.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    submitStatus.value = 'error';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <Navbar />
    <main>
      <!-- Hero Section -->
      <section id="home" class="pt-16 relative h-[60vh] md:h-[80vh]">
  <Swiper
    :modules="[Autoplay, EffectFade]"
    :slides-per-view="1"
    :effect="'fade'"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :loop="true"
    class="h-full"
    :fadeEffect="{ crossFade: true }"
    :speed="1500"
  >
    <SwiperSlide v-for="(slide, index) in slides" :key="index">
      <div class="relative h-full">
        <div
          class="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div class="absolute inset-0 flex items-center justify-center text-white">
          <div class="text-center transition-all duration-700 ease-out" data-aos="fade-up">
            <h1 class="text-5xl md:text-7xl font-bold mb-4">{{ slide.title }}</h1>
            <p class="text-xl md:text-2xl">{{ slide.subtitle }}</p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</section>

      <!-- Services Section -->
      <section id="services" class="section-padding bg-gray-50">
        <div class="container">
          <h2 class="text-3xl font-bold text-center mb-12" data-aos="fade-up">Our Services</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(service, index) in services" :key="index" 
                class="p-6 bg-white rounded-xl shadow-lg transition-transform hover:scale-105"
                data-aos="fade-up"
                :data-aos-delay="index * 100">
              <div class="text-primary-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">{{ service.title }}</h3>
              <p class="text-gray-600">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="section-padding bg-white">
        <div class="container">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16" data-aos="fade-up">
              <h2 class="text-3xl font-bold mb-4">About Metazapp Solutions</h2>
              <p class="text-xl text-gray-600">Innovating the future of business technology</p>
            </div>

            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h3 class="text-2xl font-bold mb-6">Our Story</h3>
                <p class="text-gray-600 mb-4">
                  Founded in 2018, Metazapp Solutions began with a bold vision to empower businesses with innovative technology solutions. 
                </p>
                <p class="text-gray-600 mb-4">
                  We focused on developing eCommerce platforms and Point of Sale (POS) systems tailored for retail outlets. Through dedication and a customer-centric approach, we delivered seamless, efficient, and scalable solutions that helped businesses streamline their operations and enhance their customer experiences.
                </p>
              </div>
              <div class="bg-gray-50 p-8 rounded-xl" data-aos="fade-left">
                <h3 class="text-2xl font-bold mb-4">Our Mission</h3>
                <p class="text-gray-700 mb-6">
                  Metazapp Solutions empowers businesses with innovative, scalable technology, streamlining operations, enhancing customer experiences, and driving growth through high-quality applications and continuous technological evolution.
                </p>
                <h3 class="text-2xl font-bold mb-4">Our Vision</h3>
                <p class="text-gray-700">
                  To be a leading technology partner that empowers businesses with cutting-edge digital solutions, driving innovation, efficiency, and sustainable growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="section-padding bg-gray-50">
        <div class="container">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16" data-aos="fade-up">
              <h2 class="text-3xl font-bold mb-4">Contact Us</h2>
              <p class="text-xl text-gray-600">Get in touch with our team</p>
            </div>

            <div class="grid md:grid-cols-2 gap-12">
              <div data-aos="fade-right">
                <h3 class="text-2xl font-bold mb-6">Get in Touch</h3>
                <div class="space-y-6">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <h4 class="text-lg font-medium">Address</h4>
                      <p class="text-gray-600">No. 1/117 - First Floor, Metupalayam Road, Coimbatore - 641 047</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <h4 class="text-lg font-medium">Email</h4>
                      <p class="text-gray-600">hello@metazapp.com</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <h4 class="text-lg font-medium">Phone</h4>
                      <p class="text-gray-600">+91 90034 14321</p>
                    </div>
                  </div>
                </div>
              </div>

              <div data-aos="fade-left">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      v-model="form.name"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      v-model="form.email"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      v-model="form.subject"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="message"
                      v-model="form.message"
                      rows="4"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    ></textarea>
                  </div>
                  <div>
                    <button 
                      type="submit" 
                      class="btn btn-primary w-full relative"
                      :disabled="loading"
                    >
                      <span v-if="loading">Sending...</span>
                      <span v-else>Send Message</span>
                    </button>
                  </div>
                  <div v-if="submitStatus" class="text-center mt-4">
                    <p v-if="submitStatus === 'success'" class="text-green-600">
                      Message sent successfully! We'll get back to you soon.
                    </p>
                    <p v-else-if="submitStatus === 'error'" class="text-red-600">
                      Failed to send message. Please try again later.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>