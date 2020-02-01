<template>
  <div class="convers-button">
    <notification-counter />
    <img class="convers-button__icon" alt="Vue logo" src="../assets/svg/conversation.svg" />
  </div>
</template>

<script>
import NotificationCounter from "./AppCounter";
export default {
  name: "ConversationButton",
  components: {
    NotificationCounter
  }
};
</script>

<style lang='scss'>
@import "../scss/common";
.convers-button {
  position: relative;
  width: px-rem(34);
  height: px-rem(34);
  background: $color-conversation-active;
  border-radius: 2px;

  &__icon {
    display: block;
    margin: 7px auto 0;
    position: relative;
    z-index: 1;
  }
}
</style>
