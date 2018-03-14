<template lang="html">
    <div v-if="loaded && data">
        <md-app md-mode='fixed' md-waterfall style='height: 100vh; overflow-y: hidden'>
            <md-app-toolbar class="md-primary md-large md-dense">
                <div class="md-toolbar-row">
                    <div class="md-toolbar-section-start">
                        <md-button class="md-icon-button" to='/'>
                            <md-icon>arrow_forward</md-icon>
                        </md-button>
                        <span class="md-title" style='flex: 3; overflow: hidden; text-overflow: hidden; width: 1px'>{{data.result.name}}</span>
                        <md-button class="md-icon-button" to='/cart'>
                            <md-icon>shopping_cart</md-icon>
                            <md-tooltip>سبد خرید (۷)</md-tooltip>
                        </md-button>
                    </div>
                </div>
                <div class="md-toolbar-row">
                    <md-tabs class="md-primary" md-alignment='fixed'>
                        <md-tab md-label="معرفی"></md-tab>
                        <md-tab md-label="مشخصات فنی"></md-tab>
                        <md-tab md-label="دیدگاه‌ها"></md-tab>
                    </md-tabs>
                </div>
            </md-app-toolbar>
            <md-app-content style='line-height: 1.5; padding: 0; margin-top: -20px'>
                <div style='background: #f1f1f1; padding: 20px 16px 16px'>
                    <h1>{{data.result.name}}</h1>
                    <p>{{data.result.description}}</p>
                    <md-table md-card>
                        <md-table-toolbar>
                            <h1 class="md-title">مشخصات فنی</h1>
                        </md-table-toolbar>
                        <md-table-row v-for='(spec, index) in data.result.technical_specifications' :key='index'>
                            <md-table-cell>{{spec.item}}</md-table-cell>
                            <md-table-cell>{{spec.value}}</md-table-cell>
                        </md-table-row>
                    </md-table>
                    <p v-for='comment in data.result.comments'>
                        <md-card>
                            <md-card-header>
                                <div class="md-title">{{comment.title}}</div>
                                <div class="md-subhead">{{comment.user}}</div>
                            </md-card-header>
                            <md-card-expand>
                                <md-card-actions md-alignment="space-between">
                                    <md-card-expand-trigger>
                                        <md-button>
                                            مشاهده بیشتر
                                        </md-button>
                                    </md-card-expand-trigger>
                                </md-card-actions>
                                <md-card-expand-content>
                                    <md-card-content>
                                        {{comment.text}}
                                    </md-card-content>
                                </md-card-expand-content>
                            </md-card-expand>
                        </md-card>
                    </p>
                </div>
            </md-app-content>
        </md-app>
        <md-button class="md-fab md-fixed md-fab-bottom-right">
            <md-icon>add_shopping_cart</md-icon>
        </md-button>
    </div>
    <div v-else-if='error'>
        <md-empty-state
            md-icon='error_outline'
            md-label='خطایی رخ داد!'
            :md-description='typeof error === "object" ? error.result : error'
            class="md-accent"
            >
            <md-button class="md-primary md-raised" to='/'>
                بازگشت به صفحه اصلی
            </md-button>
        </md-empty-state>
    </div>
    <div v-else>
        <div style='display: flex; align-items: center; justify-content: center; height: 100vh'>
            <md-progress-bar style='width: 66%' md-mode="indeterminate"></md-progress-bar>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'product-page',
    data: () => ({
        loaded: false,
        error: null,
        data: null
    }),
    metaInfo(){
        if (this.loaded) {
            return {
                title: this.data.result.name
            }
        } else {
            return {title: 'Hi'}
        }
    },
    created: async function(){
        const {id} = this.$route.params;
        if (isNaN(Number(id))) {
            return this.error = 'شناسه کالا عدد نیست.'
        }
        const xhr = await axios({
            method: 'post',
            url: 'http://localhost/Achaar/api/getProduct',
            data: {
                product: id
            }
        });
        this.loaded = true;
        try {
            if (xhr.data.ok) {
                this.data = xhr.data
            } else {
                this.error = xhr.data
            }
        } catch (e) {
            this.error = e
        }
    }
}
</script>
