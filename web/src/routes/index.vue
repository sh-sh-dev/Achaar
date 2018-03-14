<template lang="html">
    <div>
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
        <div class="md-layout md-gutter md-alignment-top-center" style='margin: 0 !important'>
            <div class="md-layout-item md-size-66 md-small-size-100">
                <md-content class="md-elevation-2" style="margin: 16px; margin-top: -64px; position: relative; z-index: 3; padding: 16px">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </md-content>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
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
