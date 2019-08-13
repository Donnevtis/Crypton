<template>
    <li class="menu-list__button" @click="$emit('toActive')"> 
        <svg class="menu-list__icon" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path class="menu-list__icon" fill-rule="evenodd" clip-rule="evenodd" :d="code" fill="#43444B"/>
         </svg>
    </li>

</template>
<script>
export default {
    name: 'MenuItem',    
    props: {
        code: String
        }
}

</script>
<style scoped>

.menu-list__button {  
    position: relative;
    display: flex;     
    height: 100%;      
    align-items: center; 
}

.menu-list__button:hover {
    background: var(--color-light);        
}

.menu-list__icon {    
    display: block;
    margin: 0 auto;  
}

.menu-list__button.active .menu-list__icon{
    fill: rgba(255, 255, 255, 0.8);
}

.menu-list__button.active {
    background: var(--color-light);        
}

</style>

