<template lang="html">
    <div class="flex-cont">
        <div style="width: 420px;text-align: center">
            <md-icon class="md-size-5x">{{this.icon}}</md-icon>
            <h1 style="font-weight: 400">{{this.title}}</h1>
            <div class="md-title" style="margin-bottom: 16px; color: #888">{{this.subTitle}}</div>
            <md-progress-bar md-mode="indeterminate"></md-progress-bar>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loading-overlay',
    props: {
        icon: String,
        title: String,
        subTitle: String
    }
}
</script>

<style lang="scss">
.flex-cont{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 95vw;
}
</style>
