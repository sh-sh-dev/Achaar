<template lang="html">
    <div v-if='mode === "user"'>
        <md-content style='height: 256px; position:relative;' :style='{"background-image": require("@/assets/t.jpg")}'>
            <div class="prod-main">
                <div class="md-display-1">{{data.name}}</div>
                <div class="price">{{price}} تومان</div>
            </div>
        </md-content>
        <md-button class="md-fab md-fixed md-fab-bottom-right" :style='fabStyles'>
            <md-icon>add_shopping_cart</md-icon>
        </md-button>
        <md-toolbar class="md-primary" ref='toolbar' md-elevation='5' :style='{position: scrolledToBottom ? "fixed" : "relative"}' style='top: 0;'>
            <md-button class="md-icon-button" to="/">
                <md-icon>arrow_forward</md-icon>
            </md-button>
            <div class="md-title" style='flex: 3'>
                <span v-show='scrolledToBottom'>{{data.name}}</span>
            </div>
        </md-toolbar>
        <div class="md-layout md-alignment-top-center">
            <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-66 md-large-size-50 md-xlarge-size-45" style='padding: 16px;'>
                <div :style='{"margin-top": scrolledToBottom ? marginTop + "px" : "0px"}'>
                    <div id='review'>
                        <div class="md-headline">
                            <md-icon class="md-accent">open_in_new</md-icon>
                            معرفی
                        </div>
                        <p class="md-body-2">
                            {{data.description}}
                        </p>
                    </div>
                    <div id="specs">
                        <div class="md-headline">
                            <md-icon class="md-accent">settings</md-icon>
                            مشخصات فنی
                        </div>
                        <p>
                            <md-table md-card>
                                <md-table-row v-for='(c, i) in data.technical_specifications' :key='i'>
                                    <md-table-cell>{{c.item}}</md-table-cell>
                                    <md-table-cell>{{c.value}}</md-table-cell>
                                </md-table-row>
                            </md-table>
                        </p>
                    </div>
                    <div id="comments">
                        <div class="md-headline">
                            <md-icon class="md-accent">comment</md-icon>
                            دیدگاه‌های کاربران
                        </div>
                        <p v-if='data.comments.length > 0'>
                            <md-card v-for='(c, i) in data.comments' :key='i' style='margin-bottom: 8px;'>
                                <md-card-header>
                                    <md-card-header-text>
                                        <div class="md-title">{{c.title}}</div>
                                        <div class="md-subhead">{{c.user}}</div>
                                    </md-card-header-text>
                                    <md-card-expand-trigger>
                                        <md-button class="md-icon-button" md>
                                            <md-icon>keyboard_arrow_down</md-icon>
                                        </md-button>
                                    </md-card-expand-trigger>
                                </md-card-header>
                                <md-card-expand>
                                    <md-card-expand-content>
                                        <md-card-content v-html='c.text.replace(/\n/g, "<br>")'></md-card-content>
                                    </md-card-expand-content>
                                </md-card-expand>
                            </md-card>
                            <div style="text-align: center; margin-top: 20px;">
                                <div class="md-headline">شما هم دیدگاه خود را بیان کنید.</div>
                                <md-button class="md-raised md-accent" @click='dialogOpen = true'>افزودن دیدگاه</md-button>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <md-dialog :md-active.sync='dialogOpen' @md-close='closeCommentDialog'>
            <md-dialog-title>
                 افزودن دیدگاه
            </md-dialog-title>
            <div class="comment-form">
                <md-field class="no-underline">
                    <md-icon>create</md-icon>
                    <md-input v-model='commentTitle' placeholder='عنوان دیدگاه'></md-input>
                </md-field>
                <md-divider></md-divider>
                <md-field class="no-underline">
                    <md-icon>subject</md-icon>
                    <md-textarea style='width: 50vw' v-model="comment" md-autogrow placeholder='دیدگاه خود را بنویسید...'></md-textarea>
                </md-field>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click='submitComment'>ثبت</md-button>
                <md-button class="md-primary" @click='closeCommentDialog'>لغو</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
    <loading-overlay title='در حال بارگذاری کالا...' icon='shop' v-else-if='mode === "load"'></loading-overlay>
    <error-tag v-else :title='data' icon='error_outline'></error-tag>
</template>

<script>
import http from '../utils/http';
import toFa from '../utils/number-to-fa';
import cookie from 'cookies-js';
export default {
    name: 'product-page',
    data(){
        return {
            mode: 'load',
            data: null,
            scrolled: window.scrollY,
            dialogOpen: false,
            comment: '',
            commentTitle: ''
        }
    },
    watch: {
        data(){
            if (this.mode === 'err' && this.data.charAt(this.data.length - 1) !== '!') {
                this.data += '!'
            }
        }
    },
    computed:{
        marginTop(){
            return this.$refs.toolbar.$el.offsetHeight
        },
        scrolledToBottom(){
            return this.scrolled > 255
        },
        fabStyles(){
            const shouldBeHidden = this.scrolled > 191;
            return {
                transform: `scale(${ !shouldBeHidden ? .4 : 1 })`,
                opacity: Number(shouldBeHidden),
                pointerEvents: !shouldBeHidden ? 'none' : 'auto'
            }
        },
        price(){
            if (this.data.discount){
                return toFa(this.data.discount.discounted_price)
            } else {
                return toFa(this.data.price)
            }
        }
    },
    methods: {
        commentIconColor(score){
            score = parseInt(score / 100 * 255);

            let color = [255 - score, score, 0];

            return {
                'background-color': `rgb(${color.join(', ')})`
            }
        },
        async submitComment(){
            let c = this.comment,
            t = this.commentTitle;
            if (!!c.trim() && !!t.trim()){
                const add = await http('addComment', {
                    data: {
                        token: cookie('$_TOKEN'),
                        text: c,
                        title: t,
                        score: 5,
                        product: this.$route.params.id
                    }
                })
                try {
                    console.log(add);
                } catch (e) {
                    console.log(e);
                }
            } else {
                this.closeCommentDialog()
            }
        },
        closeCommentDialog(){
            this.dialogOpen = false;
            this.commentTitle = '';
            this.comment = '';
        }
    },
    async created(){
        window.onscroll = (function(){
            this.scrolled = window.scrollY;
        }).bind(this)

        let {params: {id}} = this.$route;

        if (isNaN(Number(id))) {
            this.mode = 'err';
            this.data = 'شناسه کالا عدد نمی‌باشد'
            return null
        }

        const request = await http('getProduct', {
            data: {
                product: id
            }
        });

        try {
            if (request.data.ok) {
                this.mode = 'user'
            } else {
                this.mode = 'err';
            }
            this.data = request.data.result;
        } catch (e) {
            this.mode = 'err';
            this.data = 'خطایی رخ داد'
        }
    }
}
</script>

<style lang="scss" scoped="">
    .prod-header{
        height: 256px;
        z-index: 3;
        position: relative;
        padding: 0
    }
    .md-list{
        background: 0 !important;
    }
    .prod-section{
        margin-bottom: 8px;
        border-bottom: 1px solid  #dedede;
        padding: 0 24px 24px;
    }
    .prod-comment{
        font-weight: 500;
        font-size: 13px;
        padding: 4px 24px 8px 16px;
        color: #555;
        line-height: 1.7;
    }
    .comment-form{
        padding: 0 24px;
        .md-field{
            margin: 8px 0;
            min-height: auto;
            padding-top: 0;
        }
    }
    .prod-main{
        width: 100%;
        height: 256px;
        padding: 32px 40px;
        padding-top: 42px;
        background-image: linear-gradient(to top, rgba(#000, .45), transparent);
        & > *{
            color: #fff;
            text-shadow: 0 1px 2px rgba(#000, .5);
        }
        > .price{
            font-size: 25px;
            margin-top: 8px;
        }
    }
</style>
