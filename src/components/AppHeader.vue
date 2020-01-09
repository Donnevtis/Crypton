<template>
  <div class="header">
    <div class="header-wrap">
      <div class="title">{{ title }}</div>

      <search-form class="search-form" />

      <div class="support">
        <button class="support-button">
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 14 14"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 7 0L7 0ZM7.7 10.5L6.3 10.5L6.3 9.1L7.7 9.1L7.7 10.5L7.7 10.5ZM7.7 7.7L6.3 7.7L6.3 3.5L7.7 3.5L7.7 7.7L7.7 7.7Z"
              id="path_1"
            />
            <path
              d="M7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 7 0L7 0ZM7.7 10.5L6.3 10.5L6.3 9.1L7.7 9.1L7.7 10.5L7.7 10.5ZM7.7 7.7L6.3 7.7L6.3 3.5L7.7 3.5L7.7 7.7L7.7 7.7Z"
              id="Mask"
              fill="#3F4048"
              stroke="none"
            />
          </svg>
          Support
        </button>
        <button class="plus-button">
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 14 14"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 8L8 8L8 14L6 14L6 8L0 8L0 6L6 6L6 0L8 0L8 6L14 6L14 8L14 8Z" id="path_1" />
            <path
              d="M14 8L8 8L8 14L6 14L6 8L0 8L0 6L6 6L6 0L8 0L8 6L14 6L14 8L14 8Z"
              id="Mask"
              fill="#3F4048"
              stroke="none"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="user-menu">
      <button class="sandwich">
        <svg
          class="warn-icon"
          width="18px"
          height="12px"
          viewBox="0 0 18 12"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 12L18 12L18 10L0 10L0 12L0 12ZM0 7L18 7L18 5L0 5L0 7L0 7ZM0 0L0 2L18 2L18 0L0 0L0 0Z"
            id="Mask"
            fill="#3F4048"
            stroke="none"
          />
        </svg>
      </button>

      <div class="name">{{fullName}}</div>

      <button class="profile-button">
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8L8 8ZM8 10C5.33 10 0 11.34 0 14L0 16L16 16L16 14C16 11.34 10.67 10 8 10L8 10Z"
            id="path_1"
          />
          <path
            d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8L8 8ZM8 10C5.33 10 0 11.34 0 14L0 16L16 16L16 14C16 11.34 10.67 10 8 10L8 10Z"
            id="Mask"
            fill="#43444B"
            stroke="none"
          />
        </svg>
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

<style scoped>
.header {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  width: calc(100vw - 90px);
  height: 108px;
  right: 0;
  top: 0;
  padding: 0 40px 0 30px;
}
.header-wrap {
  width: 65vw;
  display: flex;
  justify-content: space-between;
}
.title {
  font-weight: 200;
  position: relative;
  font-size: 24px;
  color: var(--color-white);
}
.search-form {
  position: absolute;
  left: 245px;
}
.support {
  display: flex;
  justify-content: space-between;
  width: 142px;
}
.support-button {
  width: 96px;
  height: 35px;
  font-size: 12px;
  color: var(--color-white);
  background: var(--color-light);
  display: flex;
  align-items: center;
  transition: ease 0.1s;
}
.support-button:hover {
  background: var(--color-bright);
}
.support-button svg {
  margin: 0 12px;
}

.plus-button {
  font-size: 24px;
  border: 2px solid var(--color-light);
  text-align: center;
  transition: ease 0.1s;
}
.plus-button:hover {
  border-color: var(--color-white);
}
.plus-button svg {
  margin: 0 auto;
}
.user-menu {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.sandwich {
  display: block;
  transition: ease 0.2s;
}
.sandwich svg {
  margin: 0 auto;
}

.name {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-white);
  margin: 0 14px;
}
.profile-button {
  display: block;
  background: var(--color-light);
  transition: ease 0.1s;
}
.profile-button:hover,
.sandwich:hover {
  background: var(--color-bright);
}
.profile-button svg {
  margin: 0 auto;
}
button {
  border-radius: 2px;
  width: 35px;
  height: 35px;
}

.plus-button path,
.support-button path,
.profile-button path,
.sandwich path {
  transition: ease 0.1s;
}

.plus-button:hover path,
.support-button:hover path,
.profile-button:hover path,
.sandwich:hover path {
  fill: var(--color-white);
}

@media (max-width: 480px) {
  .header {
    position: relative;
  }
}
</style>
