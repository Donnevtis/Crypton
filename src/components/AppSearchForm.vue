<template>
<div>
    <input type="text" placeholder="Search...">
    <button class="search-button">
        <span>
            <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">   
                <path d="M12.5 11L11.71 11L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71L11 12.5L16 17.49L17.49 16L12.5 11L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11L6.5 11Z" id="path_1" />
                <path d="M12.5 11L11.71 11L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71L11 12.5L16 17.49L17.49 16L12.5 11L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11L6.5 11Z" id="Mask" fill="#42434B" stroke="none" />
            </svg>
        </span>
    </button>
</div>
</template>

<script>
export default {
name: 'SearchForm'
}
</script>

<style scoped>
 div {
     display: flex;
     align-items: center;
     justify-content: space-between;    
     left: 235px;
     width: 245px;
     height: 35px;
     background: #2A2B31;
     border-radius: 2px;   
    }
input {     
     font-size: 13px;
     margin-left: 13px;
     width: 200px;
   
 }
button{
    width: 35px;
    height: 35px;
    right: 0;
 }
 svg {
     position: relative;
     display: block;
     margin: 0 auto;
 }
 path {
     transition: ease .1s;
 }
button:hover path{
     fill: rgba(255, 255, 255, 0.8);
   
 } 


</style>
