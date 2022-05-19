<template>
    <div :class="'snackbar ' + snackbarStore.color">
        <p>{{ snackbarStore.message }}</p>
    </div>
</template>

<script setup>
import { useSnackbarStore } from '../stores/snackbar';

const snackbarStore = useSnackbarStore();


</script>

<style lang="scss" scoped>

.snackbar {
    width: 450px;
    height: 50px;
    border-radius: 10px;
    color: white;
    padding-inline: 20px;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0px 2px 10px #40404084;
    text-align: center;
}

.info {
    background: #4c66af;
}

.success {
    background: #3cd85e;
}

.warning {
    background: #ca7717;
}

.danger {
    background: #f01b1b;
}
</style>