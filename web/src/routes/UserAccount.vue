<template lang="html">
    <div>
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" to='/'>
                <md-icon>arrow_forward</md-icon>
            </md-button>
            <h1 class="md-title" style='flex: 3'>اکبر فغانی</h1>
        </md-toolbar>
        <div class="md-layout md-gutter md-alignment-top-center" style='margin: 0 !important;'>
            <div class="md-layout-item md-size-50 md-small-size-100" style='padding: 16px'>
                <md-content class="md-elevation-2" style="margin-bottom: 8px">
                    <md-list>
                        <md-subheader>اطلاعات کاربری</md-subheader>
                        <md-list-item>
                            <md-icon class="md-accent">person</md-icon>
                            <div class="md-list-item-text">
                                اکبر فغانی
                            </div>
                        </md-list-item>
                        <md-list-item>
                            <md-icon class="md-accent">call</md-icon>
                            <div class="md-list-item-text">
                                ۰۹۱۲۳۴۵۶۷۸۹
                            </div>
                        </md-list-item>
                    </md-list>
                </md-content>
                <md-content class="md-elevation-2">
                    <md-list>
                        <md-subheader>فعالیت ها</md-subheader>
                        <md-list-item @click='confirmLogout = true'>
                            <md-icon class="md-accent">close</md-icon>
                            <div class="md-list-item-text">خروج از حساب</div>
                        </md-list-item>
                        <md-list-item class="md-inset" @click='confirmDA = true'>
                            <div class="md-list-item-text" style='color: #f44336'>حذف حساب</div>
                        </md-list-item>
                    </md-list>
                </md-content>
            </div>
        </div>
        <md-dialog-confirm md-title='آیا واقعا می‌خواهید خارج شوید؟' :md-active.sync='confirmLogout' md-content='شما می‌توانید بعدا با هر دستگاهی به همین حساب خود وارد شوید.' md-cancel-text='لغو' md-confirm-text='تایید' @md-confirm='logOut'>
        </md-dialog-confirm>
        <md-dialog-confirm md-title='آیا واقعا می‌خواهید حساب خود را حذف کنید؟' :md-active.sync='confirmDA' md-content='این عمل غیرقابل بازگشت است و حساب شما برای همیشه حذف خواهد شد.' md-cancel-text='لغو' md-confirm-text='تایید' @md-confirm='deleteAccount'>
        </md-dialog-confirm>
    </div>
</template>
<script>
    import routes from '@/routes'
    export default {
        name: 'user-account',
        data(){
            return {
                confirmLogout: false,
                confirmDA: false
            };
        },
        methods: {
            logOut(){
                routes.push('/')
            },
            deleteAccount(){
                routes.push('/')
            }
        }
    }
</script>
