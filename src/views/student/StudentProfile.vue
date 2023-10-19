<script>

</script>

<template>
    <main class="mt-20 md:mt-[12%] lg:mt-[7%] flex flex-col items-center justify-center">
        <div class="font-fig flex items-center justify-center p-3 w-3/4 sm:w-2/4 h-4/5 text-2xl font-bold text-gray-900">
            Profile
        </div>
        <div
            class="mt-2 mb-10 font-fig flex flex-col items-center justify-center p-3 w-3/4 sm:w-2/4 h-auto text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">
            <div class="flex flex-col items-center justify-center py-4 space-y-5">

                <img class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src="src\assets\bodymoml.png" alt="Profile Picture">

                <!-- <button type="button"
                    class="py-3.5 px-7 text-base font-medium text-white focus:outline-none bg-emerald-600 rounded-lg border border-indigo-200 hover:bg-emerald-800 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                    Change picture
                </button> -->
                <!-- <button type="button"
            class="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
            Delete picture
        </button> -->
            </div>

            <div class="items-center mt-4 lg:mt-6 w-full text-[#202142]">

                <div
                    class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                            first name</label>
                        <input type="text" id="first_name"
                            class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                            placeholder="Your first name" value="Jane" required>
                    </div>
                </div>
            </div>
        </div>







    </main>
</template>
  