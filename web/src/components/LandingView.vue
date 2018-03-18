<template lang="html">
    <div class='md-layout md-alignment-center landing-section'>
        <div class="md-layout-item md-small-size-100 md-medium-size-20 md-large-size-20">
            <md-icon class="md-size-5x landing-icon">{{this.icon.split(' ').join('_')}}</md-icon>
        </div>
        <div class="md-layout-item md-small-size-100 md-medium-size-80 landing-text md-large-size-80">
            <h1 class='md-display-1'>{{this.title}}</h1>
            <p>
                <slot></slot>
            </p>
        </div>
    </div>
</template>
</div>
<script>
export default {
    name: 'landing-section',
    props: {
        icon: String,
        title: String
    }
}
</script>
<style scoped="" lang="scss">
@import "../sass/index";
.landing-section{
    padding: 8vh 5px;
    &:nth-of-type(even){
        direction: ltr;
        .landing-text{
            padding-left: 20px;
            text-align: left;
        }
    }
    &:not(:last-of-type){
        padding-bottom: 0
    }
    h1{
        margin-top: 0
    }
    .landing-icon{
        display: block;
        text-align: center;
        width: 100%;
        color: $accent !important;
    }
    .landing-text{
        direction: rtl;
        padding-right: 20px;
        @media only screen and (max-width: 600px){
            padding: 0;
            text-align: center !important;
            margin-top: -10px
        }
    }
}
</style>
