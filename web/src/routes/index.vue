<template lang="html">
    <!-- <div>
        <md-toolbar class="md-primary md-large">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <md-button class="md-icon-button" @click='showDrawer = true' @keydown.esc='showDrawer = false'>
                        <md-icon>menu</md-icon>
                    </md-button>
                    <h1 class="md-title" style='flex: 3'>آچار</h1>
                    <md-button class="md-icon-button" to='/cart'>
                        <md-icon>shopping_cart</md-icon>
                        <md-tooltip>سبد خرید (۷)</md-tooltip>
                    </md-button>
                    <md-button class="md-icon-button" to='/account'>
                        <md-icon>account_box</md-icon>
                        <md-tooltip>حساب کاربری</md-tooltip>
                    </md-button>
                </div>
            </div>
        </md-toolbar>
        <md-button class="md-fab md-fixed md-fab-bottom-right">
            <md-icon>list</md-icon>
            <md-tooltip>مشاهده لیست دسته بندی ها</md-tooltip>
        </md-button>
        <md-drawer :md-active.sync="showDrawer">
            <md-toolbar class="md-accent md-large" md-elevation='1'>
                <div class="md-toolbar-row">
                    <md-button class="md-icon-button" @click='showDrawer = false'>
                        <md-icon>arrow_forward</md-icon>
                    </md-button>
                    <span class="md-title" style='flex: 3'>اکبر فغانی</span>
                </div>
            </md-toolbar>
            <md-list>
                <md-list-item to='/cart'>
                    <md-icon>shopping_cart</md-icon>
                    <div class="md-list-item-text">سبد خرید</div>
                </md-list-item>
            </md-list>
        </md-drawer>
        <div class="md-layout md-alignment-top-center" style='margin: 0 !important'>
            <div class="md-layout-item md-size-66 md-small-size-100">
                <div style="margin: 16px; margin-top: -64px; position: relative; z-index: 3; padding: 16px">
                    <md-content class="md-elevation-2" style='margin-bottom: 16px; padding: 16px'>
                        <div class="md-headline">جدیدترین ها</div>
                        <br>
                        <div class="md-layout md-gutter md-alignment-top-left">
                            <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                                <md-card md-with-hover>
                                    <md-card-area>
                                        <md-card-media md-ratio='16/9'>
                                            <img src="/assets/examples/card-image-1.jpg" alt="People">
                                        </md-card-media>
                                        <md-card-header>
                                            <div class="md-title">آچار فرانسه</div>
                                            <div class="md-subhead">۷۸۹۰۰ تومان</div>
                                        </md-card-header>
                                    </md-card-area>
                                </md-card>
                            </div>
                            <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                                <md-card md-with-hover>
                                    <md-card-media md-ratio='16/9'>
                                        <img src="/assets/examples/card-image-1.jpg" alt="People">
                                    </md-card-media>
                                    <md-card-header>
                                        <div class="md-title">آچار فرانسه</div>
                                        <div class="md-subhead">۷۸۹۰۰ تومان</div>
                                    </md-card-header>
                                </md-card>
                            </div>
                        </div>
                    </md-content>
                </div>
            </div>
        </div>
    </div> -->
    <div>
        <md-toolbar class="md-accent landing-toolbar" style='height: 256px;z-index: 0'>
            <div class="md-toolbar-row">
                <md-button class="md-icon-button" @click='showDrawer = true'>
                    <md-icon>menu</md-icon>
                </md-button>
            </div>
            <div class="md-toolbar-row" style='height: 192px;'>
                <div class='md-toolbar-offset' style='text-align: center; width: 100%'>
                    <div style='text-align: right; padding-right: 16px'>
                        <div class="md-display-1" style='color: inherit'><b>آچار</b></div>
                        <div class="md-subheading">فروشگاه آنلاین ابزار و تجهیزات صنعتی</div>
                        <div>
                            <md-button class="md-raised md-primary">ثبت نام</md-button>
                            <md-button class="md-raised">ورود</md-button>
                        </div>
                    </div>
                </div>
            </div>
        </md-toolbar>
        <md-drawer :md-active.sync="showDrawer">
            <md-list>
                <md-list-item to='/categories'>
                    <md-icon>list</md-icon>
                    <div class="md-list-item-text">دسته بندی ها</div>
                </md-list-item>
            </md-list>
        </md-drawer>
        <div class="md-layout md-alignment-center">
            <div class="md-layout-item md-size-100 md-medium-size-66">
                <landing-view icon='accessibility' title='همه چیز در دسترس شماست.'>
                    ابزار حرفه‌ای در خیلی از شهرها یافت نمی‌شوند اما ما بستری را فراهم کرده‌ایم تا شما از هرجا که هستید، بتوانید تجهیزات مورد نیاز خود را تهیه کنید.
                </landing-view>
                <landing-view icon='local shipping' title='تحویل کالا، هر جا که باشید.'>
                    با آچار، کالاها به دست شما خواهند‌رسید، هرکجای ایران که باشید.
                </landing-view>
                <landing-view icon="star" title="کیفیت">
                    کالاهای موجود در آچار همگی از کیفیت بالایی برخوردار هستند. (واقعا نمیدونم چی بنویسم.)
                </landing-view>
                <md-divider></md-divider>
                <div style="text-align: center; padding: 8vh 20px">
                    <h1>برای استفاده از خدمات ما، همین حالا ثبت‌نام کنید.</h1>
                    <md-button class="md-raised md-primary">ثبت نام</md-button>
                    <md-button class="md-raised">مشاهده دسته‌بندی ها</md-button>
                </div>
            </div>
        </div>

        <md-speed-dial class="md-bottom-right md-fixed" md-effect='scale' md-direction="top">
            <md-speed-dial-target class='md-primary'>
                <md-icon class="md-morph-final">person</md-icon>
                <md-icon class="md-morph-initial">person_outline</md-icon>
            </md-speed-dial-target>
            <md-speed-dial-content>
                <md-button class="md-icon-button">
                    <md-icon>person_add</md-icon>
                    <md-tooltip md-direction='right'>ثبت نام</md-tooltip>
                </md-button>
                <md-button class="md-icon-button">
                    <md-icon>vpn_key</md-icon>
                    <md-tooltip md-direction='right'>ورود به حساب</md-tooltip>
                </md-button>
            </md-speed-dial-content>
        </md-speed-dial>
    </div>
</template>

<script>
import LandingView from "@/components/landing.vue";
export default {
    name: 'index',
    components: {
        'landing-view': LandingView
    },
    data(){
        return {
            showDrawer: false
        }
    },
    metaInfo: {
        title: 'آچار | فروشگاه ابزار و تجهیزات صنعتی'
    }
}
</script>
<style lang="scss">
@import "../sass/index";
$pattern: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='#{lighten($accent, 8%)}' fill-opacity='1'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E");

.landing-toolbar{
    -webkit-background-image: $pattern;
    -moz-background-image: $pattern;
    -ms-background-image: $pattern;
    -o-background-image: $pattern;
    background-image: $pattern;
    -webkit-background-size: 350px;
    background-size: 350px;
    background-attachment: fixed;
}

</style>
