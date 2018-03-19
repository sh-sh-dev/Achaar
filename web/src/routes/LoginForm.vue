<template lang="html">
    <div class="root">
        <md-content class="md-elevation-5">
            <form @submit.prevent='handleSubmit' v-if='mode === "write"'>
                <md-toolbar class="md-dense">
                    <md-button to="/" class="md-icon-button">
                        <md-icon>arrow_forward</md-icon>
                    </md-button>
                    <div class="md-title">ثبت نام</div>
                </md-toolbar>
                <div style='padding: 16px 30px;'>
                    <md-field style='width:280px;'>
                        <label>نام و نام خانوادگی</label>
                        <md-input autofocus v-model='name'></md-input>
                    </md-field>
                    <md-field style='width:280px;'>
                        <label>شماره تلفن همراه</label>
                        <md-input v-model='number'></md-input>
                    </md-field>
                    <md-field style='width:280px;' :md-toggle-password='!false'>
                        <label>گذرواژه</label>
                        <md-input type='password' v-model='pass'></md-input>
                    </md-field>
                    <div style="text-align: center; margin: 0 16px">
                        <md-button :disabled='!validation.number || !validation.name || !validation.pass' type="submit" class="md-raised md-primary" style='width: 100%; margin:0'>
                            ثبت نام
                        </md-button>
                    </div>
                </div>
            </form>
            <div v-else="" style="display: flex; align-items: center; justify-content: center; height: 100%">
                <md-empty-state md-label='در حال ارسال اطلاعات...' v-if="mode === 'load'" md-icon='person'>
                    <md-progress-bar md-mode="indeterminate"></md-progress-bar>
                </md-empty-state>
                <md-empty-state class="md-primary" v-else md-icon='done' md-label='ثبت نام با موفقیت انجام شد!'></md-empty-state>
            </div>
        </md-content>
        <md-snackbar :md-active.sync='errorOpen' :md-duration='3500'>
            خطایی رخ داد{{error ? `: ${error}` : '.'}}
        </md-snackbar>
    </div>
</template>

<script>
import http from '../utils/http';
import wait from '../utils/time-promise';
import router from '../routes';
import cookie from 'cookies-js';

export default {
    name: 'login-form',
    created(){
        console.log(cookie);
    },
    data(){
        return {
            mode: "write",
            name: '',
            number: '',
            pass: '',
            errorOpen: false,
            error: ''
        };
    },
    metaInfo: {
        title: 'ثبت نام | آچار'
    },
    computed: {
        validation(){
            return {
                name: this.name.length !== 0,
                number: (this.number.length === 11 && this.number.match(/^(?:09|۰۹)[0-3۰-۳][0-9۰-۹](?:[0-9۰-۹]){7}$/g)),
                pass: this.pass.length >= 6
            }
        }
    },
    methods: {
        async handleSubmit(event){
            let {name, number, pass} = this.validation;

            if (name && number && pass) {
                const request = await http({
                    url: 'signup',
                    data: {
                        name: this.name,
                        password: this.pass,
                        mobile: this.number
                    }
                })
                this.mode = "load";
                try {
                    switch (request.data.ok) {
                        case true:
                            this.mode = 'success';

                            const token = request.data.result;
                            cookie('$_TOKEN', token, {expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 50))});

                            await wait(750);
                            router.push('/')
                            break;
                        default:
                            this.refresh()
                            this.errorOpen = true;
                            this.error = request.data.result
                    }
                } catch (e) {
                    this.refresh()
                    this.errorOpen = true;
                }
            }
        },
        refresh(){
            this.mode = 'write';
            this.name = '';
            this.number = '';
            this.pass = ''
        },
        hideError(){
            this.errorOpen = false;
            this.error = ''
        }
    }
}
</script>

<style lang="scss">

    $accent: #e91e63;

    .root{
        background-color: $accent;
        background-image: linear-gradient(15deg, darken($accent, 27%), transparent);
        height: 100vh;
        display: flex;
        align-items: stretch;
        justify-content: center;
        & > div{
            overflow-y: auto;
            min-width: 340px;
            margin: 30px 50px;
            max-width: 720px;
        }
    }
</style>
