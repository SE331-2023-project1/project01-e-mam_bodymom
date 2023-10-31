<template>
  <div class="flex min-h-full flex-1 flex-col justify-center-px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-[160px] w-auto" src="../assets/bodymoms.png" alt="Your Company">
      <h2 class="mt-4 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">Welcome to SE331 Project -
        BodyMom</h2>
      <h2 class="mt-1 text-center text-lg font-bold leading-9 tracking-tight text-blue-700">Log in to your account</h2>
    </div>
    <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <InputText type="text" v-model="email" class="text-emerald-600 text-sm font-semibold"
            placeholder="Enter username"></InputText>
          <div v-if="errors['email']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌ {{
            errors['email'] }}</div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <InputText v-model="password" type="password" class="text-emerald-600 text-sm font-semibold"
              placeholder="Enter Password (at least 6 characters long)"></InputText>
            <div v-if="errors['password']" class="text-red-500 text-sm my-2" style="font-weight: 600; font-size: small;">❌
              {{ errors['password'] }}</div>

          </div>
        </div>
        <div>
          <div id="flashMessage"
            class="mb-2 animate-pulse text-center text-base font-fig bg-red-500 font-fig text-white" v-if="message">
            <h4>{{ message }}</h4>
          </div>
          <FlashMessage />
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log
            in</button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
        Doesn't have an account yet?
        {{ ' ' }}
        <RouterLink :to="{ name: 'register-page' }" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-400">
          Try to register here</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const storeMessage = useMessageStore()
const { message } = storeToRefs(storeMessage)

const router = useRouter()

const authStore = useAuthStore()

const validationSchema = yup.object({
  email: yup.string()
    .required('Please enter your username.')
  ,
  password: yup
    .string()
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',

    password: ''
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const onSubmit = handleSubmit((values) => {
  authStore.login(values.email, values.password)
    .then(() => {
      console.log('login success')
      router.push({ name: 'home-page' })

    }).catch((err) => {
      console.log('error', err)
      storeMessage.updateMessage('could not login')
      setTimeout(() => {
        storeMessage.resetMessage()
      }, 3000)
    })
})
</script>