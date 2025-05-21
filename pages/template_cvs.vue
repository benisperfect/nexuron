<template>
  <div class="max-w-5xl mx-auto py-8 px-2 sm:py-16 sm:px-4">
    <div class="relative flex flex-col items-center mb-8 sm:mb-12">
      <h1 class="text-4xl sm:text-7xl font-extrabold text-center text-primary relative z-10">
        Template CVs
      </h1>
    </div>
    <div class="flex flex-col items-center gap-8 sm:gap-16">
      <div
        v-for="cv in cvs"
        :key="cv.file"
        class="cv-card bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 sm:p-16 flex flex-col items-center transition-colors min-h-[70vh] h-[90vh] w-full sm:w-[70vw] max-w-full sm:max-w-[1100px] mx-auto"
      >
        <object
          :data="`/cvs/${cv.file}`"
          type="application/pdf"
          class="w-full h-[40vh] sm:h-[60vh] rounded border-2 mb-4 sm:mb-10"
        >
          <a :href="`/cvs/${cv.file}`" target="_blank" class="text-blue-600 underline">
            Xem CV mẫu
          </a>
        </object>
        <div class="font-bold text-2xl sm:text-4xl mb-4 sm:mb-6 text-center text-neutral-800 dark:text-neutral-100">{{ cv.name }}</div>
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-2 w-full justify-center">
          <a
            :href="`/cvs/${cv.file}`"
            download
            class="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded bg-primary text-white text-lg sm:text-xl font-semibold shadow hover:bg-blue-700 transition"
          >
            <span class="i-lucide-download"></span>
            <span>Tải về</span>
          </a>
          <a
            :href="cv.portfolio"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded bg-neutral-200 dark:bg-neutral-700 text-blue-700 dark:text-blue-300 text-lg sm:text-xl font-semibold shadow hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
          >
            <span class="i-lucide-external-link"></span>
            <span>Portfolio mẫu</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cvs = [
  {
    name: "CV Mẫu 1",
    file: "TRAN_MINH_HIEU_CV.pdf",
    portfolio: "https://leader.mhpteam.dev",
  },
  {
    name: "CV Mẫu 2",
    file: "davidhoang_s_Resume.pdf",
    portfolio: "https://hmthien050209.github.io/",
  },
  {
    name: "CV Mẫu 3",
    file: "Duong_CV.pdf",
    portfolio: "https://github.com/duong-ng",
  },
];
</script>

<style scoped>

/* Card container styles - fully responsive, no overflow-x */
.cv-card {
  box-sizing: border-box;
  min-height: 70vh;
  height: 90vh;
  width: 100%;
  max-width: 100%;
  padding: 1.5rem 0.5rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
}
@media (min-width: 640px) {
  .cv-card {
    min-height: 80vh;
    height: 100vh;
    width: 70vw;
    max-width: 1100px;
    padding: 4rem 2rem;
    border-radius: 2rem;
  }
}

/* Remove margin from button text */
.cv-card a span.ml-2,
.cv-card a span\:ml-2 {
  margin-left: 0 !important;
}
</style>