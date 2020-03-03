<template>
  <header class="header">
    <div class="header-mobile">
      <img src="../assets/svg/logo.svg" alt="logo" />
      <div class="btn-wrap">
        <conversation-button />
        <button name="options">
          <img src="../assets/svg/broken-sandwich.svg" alt="menu" />
        </button>
      </div>
    </div>

    <section class="header-dashboard">
      <h1 class="title">Dashboard</h1>
      <span>overview</span>
      <button class="options" aria-label="options"></button>
    </section>
  </header>
</template>

<script>
import ConversationButton from './TheConversationButton.vue';

export default {
  components: {
    ConversationButton
  }
};
</script>

<style lang="scss">
.header {
  padding: 2rem 3rem 2rem 2rem;
  @media (max-width: 480px) {
    padding: 0;
  }
}
.header-mobile {
  display: flex;
  justify-content: space-between;

  & > .btn-wrap {
    display: flex;
    width: 5.3rem;
    justify-content: space-between;
  }
}
.header-dashboard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.6rem;

  & > span {
    display: block;
    padding: 0 px-rem(15);
    font-size: px-rem(14);
    color: $color-text-middle;
  }
}
.title {
  @include title;
  flex-grow: 1;
  font-weight: 400;
}
.options {
  @include options;
}
</style>