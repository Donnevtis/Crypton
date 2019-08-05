<template>
    <div class="convers-button">
    <img class="convers-button__icon" alt="Vue logo" src="../assets/conversation.svg">
        
    </div>
</template>

<script>
export default {
name:'ConversationButton'
}
</script>

<style scoped>
.convers-button {
    position: relative;    
    width: 34px;
    height: 34px;   
    background: #4C4D55;
    border-radius: 2px;
}
.convers-button__icon {
    display: block;
    margin: 7px auto 0;

}
</style>
