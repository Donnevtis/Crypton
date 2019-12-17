<template>
    <div class="convers-button">
        <NotificationCounter/>
    <img class="convers-button__icon" alt="Vue logo" src="../assets/svg/conversation.svg">
        
    </div>
</template>

<script>
import NotificationCounter from "./AppCounter";
export default {
name:'ConversationButton',
components:{
    NotificationCounter
}
}
</script>

<style scoped>
.convers-button {
    position: relative;    
    width: 34px;
    height: 34px;   
    background: var(--color-conversation-active);
    border-radius: 2px;
}
.convers-button__icon {
    display: block;
    margin: 7px auto 0;
    position: relative;
    z-index: 1;

}
</style>
