<template>
  <div class="mt-20 mb-20">
    <h1>Get in touch</h1>
    <p>
      At PakBnB, we are dedicated to providing our users with the best possible
      experience. If you have any questions or concerns, please don't hesitate
      to reach out to us. We are available to assist you Monday through Friday,
      9:00 am to 5:00 pm (PKT). You can also fill out the contact form below and
      we will get back to you as soon as possible.
    </p>
    <div class="flex mt-20 w-full">
      <div class="w-30% gradient px-20 text-white">
        <h2 class="text-white">Contact Information</h2>
        <div class="flex flex-col gap-5">
          <p>You can contact us through the following channels:</p>
          <span class="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            support@pakbnb.com
          </span>
          <span class="flex gap-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            +92-3xx-xxxxxxx</span
          >
        </div>
      </div>
      <div class="py-10 w-70% px-6 sm:px-10 lg:col-span-2 xl:p-12 border-1">
        <h3 class="text-lg font-medium text-warm-gray-900">
          Send us a message
        </h3>
        <form
          action="#"
          method="POST"
          class="mt-6 grid grid-cols-2x gap-y-6 gap-x-8"
        >
          <div>
            <label
              for="first-name"
              class="block text-sm font-medium text-warm-gray-900"
              >First name</label
            >
            <div class="mt-1">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>
          <div>
            <label
              for="last-name"
              class="block text-sm font-medium text-warm-gray-900"
              >Last name</label
            >
            <div class="mt-1">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                class="block w-full rounded-md py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-warm-gray-900"
              >Email</label
            >
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>
          <div>
            <div class="flex justify-between">
              <label
                for="phone"
                class="block text-sm font-medium text-warm-gray-900"
                >Phone</label
              >
              <span id="phone-optional" class="text-sm text-warm-gray-500"
                >Optional</span
              >
            </div>
            <div class="mt-1">
              <input
                type="text"
                name="phone"
                id="phone"
                autocomplete="tel"
                class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                aria-describedby="phone-optional"
              />
            </div>
          </div>
          <div class="col-span-2">
            <label
              for="subject"
              class="block text-sm font-medium text-warm-gray-900"
              >Subject</label
            >
            <div class="mt-1">
              <input
                type="text"
                name="subject"
                id="subject"
                class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>
          <div class="col-span-2">
            <div class="flex justify-between">
              <label
                for="message"
                class="block text-sm font-medium text-warm-gray-900"
                >Message</label
              >
              <span id="message-max" class="text-sm text-warm-gray-500"
                >Max. 500 characters</span
              >
            </div>
            <div class="mt-1">
              <textarea
                id="message"
                name="message"
                rows="4"
                class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                aria-describedby="message-max"
              />
            </div>
          </div>
          <div class="sm:col-span-2 sm:flex sm:justify-end">
            <button
              type="submit"
              class="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  textarea {
    @apply bg-gray-100;
  }
</style>
