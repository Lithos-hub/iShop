<template>
    <div>
        <section class="dialog__wrapper">
            <mdicon name="check-circle" size="100" color="green" />
        <h2>{{ message }}</h2>
        </section>
    </div>
</template>

<script setup>

const props = defineProps({
    message: {
        type: String,
        required: true
    }
})

const { message } = props;
</script>

<style lang="scss" scoped>

.dialog__wrapper {
    background: white;
    width: 500px;
    height: auto;
    text-align: center;
    padding: 50px;
    border-radius: 25px;
    box-shadow: 0px 0px 50px #40404084;
    position: relative;
    top: 35vh;
    margin: 0 auto;
  animation: surprise .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes surprise {
    0% {
        transform: scale(0.7);
        opacity: 0;
    }
    50% {
        transform: scale(1.5);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>