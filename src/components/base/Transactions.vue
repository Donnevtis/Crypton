<template>
  <div class="transactions">
    <span>Transactions</span>
  </div>
</template>

<script>
export default {
  name: "transactions"
};
</script>

<style lang='scss'>
;
.transactions {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: $color-middle;
  & span {
    font-size: 2rem;
    background: linear-gradient(to right, #8c7518, #8a1d47, #642566);
    background-clip: text;
    color: transparent;
  }
}
</style>