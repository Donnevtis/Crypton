<template>

   <div class="sidebar">  
       <div class="sidebar__logo" >
            <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2886 0.845703C19.3837 0.845703 23.2261 2.4725 26.0625 5.31275L23.2956 8.0759C21.1854 5.96287 18.335 4.75608 15.2886 4.75608C9.0391 4.75608 3.97287 9.8223 3.97287 16.0718C3.97287 22.3213 9.0391 27.3875 15.2886 27.3875C18.104 27.3875 20.7543 26.358 22.8132 24.5234L25.4146 27.4429C22.6462 29.9097 19.0727 31.2979 15.2886 31.2979C6.87946 31.2979 0.0625 24.4809 0.0625 16.0718C0.0625 7.66266 6.87946 0.845703 15.2886 0.845703ZM15.2252 8.28458C17.36 8.28458 19.3652 9.13357 20.8438 10.6142L18.0769 13.3773C17.3245 12.6239 16.3113 12.195 15.2252 12.195C12.9994 12.195 11.195 13.9993 11.195 16.2251C11.195 18.4509 12.9994 20.2552 15.2252 20.2552C16.2291 20.2552 17.1709 19.8894 17.9047 19.2355L20.5062 22.155C19.0628 23.4411 17.1977 24.1656 15.2252 24.1656C10.8397 24.1656 7.28464 20.6105 7.28464 16.2251C7.28464 11.8397 10.8397 8.28458 15.2252 8.28458Z" fill="#7AC231"/>
            </svg>
        </div>       
        <sidebarMenu class="sidebar__menu"/>
        <ConversationButton class="conversation-button"/>   
    </div>

</template>
<script>

import SidebarMenu from './IconsMenu.vue'
import ConversationButton from './TheConversationButton.vue'
export default {
    name: 'sidebar',
    components: {  
   SidebarMenu,
   ConversationButton
  }
    
}
</script>
<style scoped>
.sidebar {
position: fixed;
padding: 34px 0;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
left: 0%;
top: 0%;
bottom: 0%;
width: 90px;
background-color: var(--color-middle);
border-radius: 0;
}
.sidebar__logo {
position: relative;
}
.sidebar__menu {
    position: absolute;
    top: 148px;
}           
</style>

