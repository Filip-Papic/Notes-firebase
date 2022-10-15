<script setup>
/*
  imports
*/
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
/*
  mobile nav
*/
const showMobileNav = ref(false);
const navBurgerRef = ref(false);

const toggleMobileNav = () => {
  showMobileNav.value = !showMobileNav.value;
};

/*
  click outside vueuse
*/
const navRef = ref(null);
onClickOutside(
  navRef,
  () => {
    showMobileNav.value = false;
  },
  {
    ignore: [navBurgerRef],
  }
);
</script>

<template>
  <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">Notes</div>

        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          @click.prevent="toggleMobileNav"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
        ref="navRef"
      >
        <div class="navbar-end">
          <RouterLink
            to="/"
            class="navbar-item"
            active-class="is-active"
            @click="toggleMobileNav"
          >
            Notes
          </RouterLink>
          <RouterLink
            to="/stats"
            class="navbar-item"
            active-class="is-active"
            @click="toggleMobileNav"
          >
            Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
