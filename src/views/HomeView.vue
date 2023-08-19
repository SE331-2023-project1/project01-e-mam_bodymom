<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="flex flex-col items-center justify-center my-5 text-black">
    <h1 class="font-fig text-3xl font-bold  px-4 py-2">SE331 TERM PROJECT I</h1>
    <p class="font-mono">Component-Based Software Development</p>
    <br>
    <p class="font-fig font-bold text-base ">Group Name: E-Mam_BodyMom</p>
    <h2 class="font-fig my-2 font-bold">Team Members</h2>
    <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-24 gap-y-12 mt-10">
      <div class="member flex flex-col items-center justify-center">
        <img src="../assets/020.JPG" alt="" class="animate-fade-down h-48 rounded-full mb-4 shadow-md" />
        <!-- <h1 class="mt-6 text-2xl font-bold">Ph1r1</h1> -->
        <p><span class="font-fig font-bold">Name:</span> Thiwakon Sakunchao</p>
        <p><span class="font-fig font-bold">Student ID:</span> 642115020</p>
        <div class="flex items-center">
          <a href="https://github.com/thiwakonsakunchao" target="_blank"
            class="rounded-lg bg-dark text-light text-lg font-semibold mt-4 flex items-center">
            <img src="../assets/github.png" class="font-fig h-5 w-5 mr-2">Github</a>
        </div>
      </div>
      <div class="member flex flex-col items-center justify-center">
        <img src="../assets/020.JPG" alt="" class="animate-fade-down h-48 rounded-full mb-4 shadow-md" />
        <p><span class="font-fig font-bold">Name:</span> Thanakorn Waleejaroenpong</p>
        <p><span class="font-fig font-bold">Student ID:</span> 642115021</p>
        <div class="flex items-center">
          <a href="https://github.com/Nongpepenasi" target="_blank"
            class="rounded-lg bg-dark text-light text-lg font-semibold mt-4 flex items-center">
            <img src="../assets/github.png" class="font-fig h-5 w-5 mr-2">Github</a>
        </div>
      </div>
      <div class="member flex flex-col items-center justify-center">
        <img src="../assets/026.JPG" alt="" class="animate-fade-down w-48 h-48 rounded-full mb-4 shadow-md" />
        <p><span class="font-fig font-bold">Name:</span> Phacharanan Thumjaikul</p>
        <p><span class="font-fig font-bold">Student ID:</span> 642115026</p>
        <div class="flex items-center">
          <a href="https://github.com/MMMMMMMPCRN" target="_blank"
            class="rounded-lg bg-dark text-light text-lg font-semibold mt-4 flex items-center">
            <img src="../assets/github.png" class="font-fig h-5 w-5 mr-2">Github</a>
        </div>
      </div>
    </div>
  </main>
</template>
