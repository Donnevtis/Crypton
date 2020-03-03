<template>
  <aside class="sidebar">
    <div class="sidebar__logo">
      <img src="../assets/svg/logo.svg" alt="logo" />
    </div>
    <sidebar-menu class="sidebar__menu" />
    <conversation-button class="conversation-button" />
  </aside>
</template>
<script>
import SidebarMenu from './IconsMenu.vue';
import ConversationButton from './TheConversationButton.vue';
export default {
  name: 'sidebar',
  components: {
    SidebarMenu,
    ConversationButton
  }
};
</script>
<style lang="scss">
.sidebar {
  position: fixed;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  left: 0%;
  top: 0%;
  bottom: 0%;
  width: px-rem(91);
  background-color: $color-middle;
  border-radius: 0;
}
.sidebar__logo {
  position: relative;
}
.sidebar__menu {
  position: absolute;
  top: px-rem(148);
}
@media (max-width: 480px) {
  .sidebar {
    display: none;
  }
}
</style>

