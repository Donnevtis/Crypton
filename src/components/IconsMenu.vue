<template>
  <ul class="menu-list">
    <menu-item
      v-for="item in menuItems"
      :key="item.id"
      :code="item.svg"
      :path="item.path"
      :class="{active: currentTab === item.id}"
      @toActive="currentTab = item.id"
    />
  </ul>
</template>
<script>
import MenuItem from './IconsMenuItem.vue';

export default {
  name: 'sidebarmenu',
  components: {
    MenuItem
  },
  data() {
    return {
      currentTab: 0,
      menuItems: [
        {
          id: 0,
          path: '/dashboard'
        },
        {
          id: 1,
          path: '/wallets'
        },
        {
          id: 2,
          path: '/trandings'
        },
        {
          id: 3,
          path: '/events'
        },
        {
          id: 4,
          path: '/transactions'
        },
        {
          id: 5,
          path: '/calculator'
        },
        {
          id: 6,
          path: '/news'
        },
        {
          id: 7,
          path: '/settings'
        }
      ]
    };
  }
};
</script>
<style scoped>
.menu-list {
  height: 468px;
  width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>


