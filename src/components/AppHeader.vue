<template>
  <div class="header">
    <div class="header-wrap">
      <div class="title">{{ title }}</div>

      <search-form class="search-form" />

      <div class="support">
        <button class="support-button">
          <img alt="icon" src="../assets/svg/exclamation-mark.svg" />
          Support
        </button>
        <button class="plus-button">
          <img alt="icon" src="../assets/svg/plus.svg" />
        </button>
      </div>
    </div>

    <div class="user-menu">
      <button class="sandwich">
        <img class="warn-icon" alt="menu" src="../assets/svg/sandwitch.svg" />
      </button>

      <div class="name">{{fullName}}</div>

      <button class="profile-button">
        <img class="warn-icon" alt="menu" src="../assets/svg/men.svg" />
      </button>
    </div>
  </div>
</template>

<script>
import SearchForm from "./AppSearchForm";

export default {
  name: "AppHeader",
  components: {
    SearchForm
  },
  props: {},
  data() {
    return {
      title: "Dashboard",
      fullName: "Nikita Resheteev"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";
.header {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  width: calc(100vw - 90px);
  height: 6.8rem;
  right: 0;
  top: 0;
  padding: 0 2.5rem 0 1.9rem;
  &-wrap {
    width: 65vw;
    display: flex;
    justify-content: space-between;
  }
}

.title {
  font-weight: 200;
  position: relative;
  font-size: 24px;
}
.search-form {
  position: absolute;
  left: 245px;
}
.support {
  display: flex;
  justify-content: space-between;
  width: 142px;
  &-button {
    width: 96px;
    height: 35px;
    font-size: 12px;
    background-color: $color-light;
    display: flex;
    align-items: center;
    transition: ease 0.1s;
    &:hover {
      background: $color-bright;
    }
    img {
      margin: 0 12px;
    }
  }
}

.plus-button {
  font-size: 24px;
  border: 2px solid $color-light;
  text-align: center;
  transition: ease 0.1s;
  &:hover {
    border-color: $color-white;
    img {
      filter: brightness(400%);
    }
  }
  img {
    transition: ease 0.1s;
  }
}
.user-menu {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.sandwich {
  display: block;
  transition: ease 0.2s;
  &:hover {
    background: $color-bright;
    img {
      filter: brightness(400%);
    }
  }
  img {
    transition: ease 0.1s;
  }
}

.name {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin: 0 14px;
}
.profile-button {
  display: block;
  background: $color-light;
  transition: ease 0.1s;
  &:hover {
    background: $color-bright;
    img {
      filter: brightness(400%);
    }
  }
  img {
    transition: ease 0.1s;
  }
}

button {
  border-radius: 2px;
  width: 35px;
  height: 35px;
}

.support-button {
  &:hover {
    img {
      filter: brightness(400%);
    }
  }
  img {
    transition: ease 0.1s;
  }
}

@media (max-width: 480px) {
  .header {
    position: relative;
  }
}
</style>
