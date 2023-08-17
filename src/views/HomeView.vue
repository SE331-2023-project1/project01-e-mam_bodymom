<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
 <main class="flex flex-col items-center justify-center my-5">
    <h1 class="text-3xl font-bold  px-4 py-2">SE331 TERM PROJECT I</h1>
    <p class="font-mono">Component-Based Software Development</p>
    <h2 class="my-2 font-bold">Team Members</h2>
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-24 gap-y-12 mt-10">
      <div class="member flex flex-col items-center justify-center">
        <img src="https://shorturl.at/jv168" alt="" class="h-48 rounded-full mb-4 shadow-md" />
        <!-- <h1 class="mt-6 text-2xl font-bold">Ph1r1</h1> -->
        <p><span class="font-bold">Name:</span> Thiwakon Sakunchao</p>
        <p><span class="font-bold">Student ID:</span> 642115020</p>
      
        <!-- <a href="https://github.com/ph1r1" target="_blank"
          class="rounded-lg bg-dark text-light text-lg font-semibold mt-4"><font-awesome-icon :icon="['fab', 'github']"
            class="mr-2" />Github</a> -->
      </div>
      <div class="member flex flex-col items-center justify-center">
        <img src="https://shorturl.at/jv168" alt="" class="h-48 rounded-full mb-4 shadow-md" />
        <p><span class="font-bold">Name:</span> Thanakorn Waleejaroenpong</p>
        <p><span class="font-bold">Student ID:</span> 642115021</p>
        <!-- <a href="https://github.com/veevism" target="_blank"
          class="rounded-lg bg-dark text-light text-lg font-semibold mt-4"><font-awesome-icon :icon="['fab', 'github']"
            class="mr-2" />Github</a> -->
      </div>
      <div class="member flex flex-col items-center justify-center">
        <img src="../assets/026.JPG" alt="" class="w-48 h-48 rounded-full mb-4 shadow-md" />
        <p><span class="font-bold">Name:</span> Phacharanan Thumjaikul</p>
        <p><span class="font-bold">Student ID:</span> 642115026</p>
        <!-- <a href="https://github.com/ThanapongYamkamol642115022" target="_blank"
          class="rounded-lg bg-dark text-light text-lg font-semibold mt-4"><font-awesome-icon :icon="['fab', 'github']"
            class="mr-2" />Github</a> -->
      </div>
    </div>
  </main>
</template>
