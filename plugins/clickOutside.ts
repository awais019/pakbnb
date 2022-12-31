export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", {
    mounted(el, binding) {
      el.__clickOutsideHandler__ = (e: Event) => {
        if (
          !(
            el === e.target ||
            el.contains(e.target) ||
            el.parentElement.contains(e.target)
          )
        ) {
          binding.value(e);
        }
      };
      document.body.addEventListener("click", el.__clickOutsideHandler__);
    },
    unmounted(el) {
      document.body.removeEventListener("click", el.__clickOutsideHandler__);
    },
  });
});
