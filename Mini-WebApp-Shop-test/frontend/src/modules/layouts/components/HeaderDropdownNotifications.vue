<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition duration-150 hover:bg-gray-200"
      :class="{ 'bg-gray-200': dropdownOpen }"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="sr-only">Notifications</span>
      <svg class="h-4 w-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          class="fill-current text-gray-500"
          d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z"
        />
        <path
          class="fill-current text-gray-400"
          d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z"
        />
      </svg>
      <div
        class="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"
      ></div>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="absolute top-full z-10 -mr-48 mt-1 min-w-80 origin-top-right overflow-hidden rounded border border-gray-200 bg-white py-1.5 shadow-lg sm:mr-0"
        :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <div class="px-4 pb-2 pt-1.5 text-xs font-semibold uppercase text-gray-400">
          Notifications
        </div>
        <ul ref="dropdown" @focusin="dropdownOpen = true" @focusout="dropdownOpen = false">
          <li class="border-b border-gray-200 last:border-0">
            <router-link
              class="block px-4 py-2 hover:bg-gray-50"
              to="#0"
              @click="dropdownOpen = false"
            >
              <span class="mb-2 block text-sm"
                >📣
                <span class="font-medium text-gray-800">Edit your information in a swipe</span> Sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim.</span
              >
              <span class="block text-xs font-medium text-gray-400">Feb 12, 2021</span>
            </router-link>
          </li>
          <li class="border-b border-gray-200 last:border-0">
            <router-link
              class="block px-4 py-2 hover:bg-gray-50"
              to="#0"
              @click="dropdownOpen = false"
            >
              <span class="mb-2 block text-sm"
                >📣
                <span class="font-medium text-gray-800">Edit your information in a swipe</span> Sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim.</span
              >
              <span class="block text-xs font-medium text-gray-400">Feb 9, 2021</span>
            </router-link>
          </li>
          <li class="border-b border-gray-200 last:border-0">
            <router-link
              class="block px-4 py-2 hover:bg-gray-50"
              to="#0"
              @click="dropdownOpen = false"
            >
              <span class="mb-2 block text-sm"
                >🚀<span class="font-medium text-gray-800">Say goodbye to paper receipts!</span>
                Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim.</span
              >
              <span class="block text-xs font-medium text-gray-400">Jan 24, 2020</span>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "HeaderDropdownNotifications",
  props: ["align"],
  setup() {
    const dropdownOpen = ref(false);
    const trigger = ref(null);
    const dropdown = ref(null);

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target))
        return;
      dropdownOpen.value = false;
    };

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return;
      dropdownOpen.value = false;
    };

    onMounted(() => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
    });

    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });

    return {
      dropdownOpen,
      trigger,
      dropdown,
    };
  },
};
</script>
