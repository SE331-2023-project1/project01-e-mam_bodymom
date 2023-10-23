<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import ImageUpload from '@/components/ImageUpload.vue'

const authStore = useAuthStore()
const router = useRouter()
const storeMessage = useMessageStore()

const { message } = storeToRefs(storeMessage)

const validationSchema = yup.object({
  username: yup.string()
    .required('The Student ID is required')
    .matches(/^[0-9]+$/, 'Student ID should contain only numbers'),

  firstName: yup.string()
    .required('The firstName is required')
    .matches(/^[A-Za-z]+$/, 'First name should contain only alphabetic characters'),

  lastName: yup.string()
    .required('The lastName is required')
    .matches(/^[A-Za-z]+$/, 'Last name should contain only alphabetic characters'),

  email: yup.string()
    .required('The email is required')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'Please enter a valid email address ending with example.com'),

  password: yup.string()
    .required('The password is required')
    .min(6, 'Password must be at least 6 characters long.'),
})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    images: []
  }
})

const { value: username } = useField<string>('username')

const { value: firstName } = useField<string>('firstName')

const { value: lastName } = useField<string>('lastName')

const { value: email } = useField<string>('email')

const { value: password } = useField<string>('password')

const { value: images } = useField<string[]>('images')

const onSubmit = handleSubmit((values) => {
  authStore
    .studentRegister(values.username, values.firstName, values.lastName, values.email, values.password, values.images)
    .then(() => {
      router.push({ name: 'Login' })
      storeMessage.updateMessage('Registration successful');
      setTimeout(() => {
        storeMessage.resetMessage()
      }, 4000)

    })
    .catch(() => {
      storeMessage.updateMessage('could not register')

      setTimeout(() => {
        storeMessage.resetMessage()
      }, 3000)
    })
})

import { ref } from 'vue';
const mediaURLs = ref<string[]>([]);

const onFileUploaded = (mediaURLs: string[]) => {
  // Assuming mediaURLs contains at least one URL
  images.value = [mediaURLs[0]];
  console.log(images.value)
};


</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-[160px] w-auto" src="../assets/bodymoms.png" alt="" />

      <h2 class="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-blue-700">
        Register to your account
      </h2>
      <div class="animate-flashMessage mb-4" v-if="message">
        <h4>{{ message }}</h4>
      </div>
    </div>

    <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
      <ImageUpload @fileUploaded="onFileUploaded" v-model="mediaURLs" />
      <form class="space-y-6" @submit.prevent="onSubmit">
        
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Student ID</label>
          <InputText type="text" v-model="username" class="text-emerald-600 text-sm font-semibold" placeholder="Student ID">
          </InputText>
          <div v-if="errors['username']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
            {{ errors['username'] }}</div>
        </div>

        <div>
          <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
          <InputText type="text" v-model="firstName" class="text-emerald-600 text-sm font-semibold"
            placeholder="Enter your first name"></InputText>
          <div v-if="errors['firstName']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
            {{ errors['firstName'] }}</div>

        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
          <InputText type="text" v-model="lastName" class="text-emerald-600 text-sm font-semibold"
            placeholder="Enter your last name"></InputText>
          <div v-if="errors['lastName']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
            {{ errors['lastName'] }}</div>

        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
          <InputText type="text" v-model="email" class="text-emerald-600 text-sm font-semibold"
            placeholder="Enter your email address"></InputText>
          <div v-if="errors['email']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌ {{
            errors['email'] }}</div>

        </div>

        <div>
          <div class="flex items-center justify-start">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>

          <InputText v-model="password" type="password" class="text-emerald-600 text-sm font-semibold"
            placeholder="Create password"></InputText>
          <div v-if="errors['password']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
            {{ errors['password'] }}</div>
        </div>

        

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Register
          </button>

        </div>

      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?

        {{ ' ' }}

        <RouterLink :to="{ name: 'Login' }" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-400">Log in
        </RouterLink>
      </p>
    </div>
  </div>
</template>
