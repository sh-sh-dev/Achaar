<template lang="html">
    <loading-overlay v-if='mode === "load"' title='لطفا چند لحظه صبر کنید...' icon='person'></loading-overlay>
    <div v-else-if="mode === 'user'">
        <div>
            <md-toolbar class="md-primary">
                <md-button class="md-icon-button" to='/'>
                    <md-icon>arrow_forward</md-icon>
                </md-button>
                <h1 class="md-title" style='flex: 3'>{{user.name}}</h1>
            </md-toolbar>
            <div class="md-layout md-gutter md-alignment-top-center" style='margin: 0 !important;'>
                <div class="md-layout-item md-size-50 md-small-size-100" style='padding: 16px'>
                    <md-content class="md-elevation-2" style="margin-bottom: 8px">
                        <md-list class="md-double-line">
                            <md-subheader>اطلاعات کاربری</md-subheader>
                            <md-list-item>
                                <md-icon class="md-accent">person</md-icon>
                                <div class="md-list-item-text">
                                    <span>
                                        {{user.name}}
                                    </span>
                                    <span>
                                        نام
                                    </span>
                                </div>
                            </md-list-item>
                            <md-list-item>
                                <md-icon class="md-accent">call</md-icon>
                                <div class="md-list-item-text">
                                    <span>
                                        {{user.mobile}}
                                    </span>
                                    <span>
                                        شماره تلفن
                                    </span>
                                </div>
                            </md-list-item>
                            <md-list-item>
                                <md-icon class="md-accent">access_time</md-icon>
                                <div class="md-list-item-text">
                                    <span>
                                        {{user.created_at}}
                                    </span>
                                    <span>
                                        تاریخ ثبت نام
                                    </span>
                                </div>
                            </md-list-item>
                        </md-list>
                    </md-content>
                    <md-content class="md-elevation-2">
                        <md-list>
                            <md-list-item @click='confirmLogout = true'>
                                <md-icon style='color: #f44336'>close</md-icon>
                                <div class="md-list-item-text">خروج از حساب</div>
                            </md-list-item>
                        </md-list>
                    </md-content>
                </div>
            </div>
            <md-dialog-confirm md-title='آیا واقعا می‌خواهید خارج شوید؟' :md-active.sync='confirmLogout' md-content='شما می‌توانید بعدا با هر دستگاهی به همین حساب خود وارد شوید.' md-cancel-text='لغو' md-confirm-text='تایید' @md-confirm='logOut'>
            </md-dialog-confirm>
        </div>
    </div>
    <error-tag v-else></error-tag>
</template>
<script>
    import routes from '@/routes';
    import cookie from 'cookies-js';
    import http from '../utils/http';
    import toFa from '../utils/number-to-fa';
    export default {
        name: 'user-account',
        data(){
            return {
                confirmLogout: false,
                confirmDA: false,
                mode: 'load',
                user: null,
                error: null
            };
        },
        methods: {
            logOut(){
                cookie.expire('$_TOKEN');
                routes.push('/')
            }
        },
        async created(){
            const req = await http({
                url: 'getUser',
                data: {
                    token: cookie('$_TOKEN')
                }
            })
            try {
                let {ok, result} = req.data;
                result.mobile = toFa(result.mobile)
                result.created_at = (new Date(result.created_at * 1000)).toLocaleDateString('fa-IR')
                if (ok) {
                    this.mode = 'user';
                    this.user = result
                } else {
                    this.mode = 'error';
                    this.error = result
                }
            } catch (e) {
                this.mode = 'error';
                this.error = e
            }
        }
    }
</script>
