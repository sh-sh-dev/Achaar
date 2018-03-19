<template lang="html">
    <div>
        <md-toolbar class="md-primary md-large" :style='{position: mode === "load" ? "fixed" : "relative"}'>
            <div class="md-toolbar-row">
                <md-button to="/" class="md-icon-button">
                    <md-icon>arrow_forward</md-icon>
                </md-button>
                <div class="md-title" style="flex: 3">دسته بندی ها</div>
                <md-button class="md-icon-button" to="/cart">
                    <md-icon>shopping_cart</md-icon>
                </md-button>
            </div>
        </md-toolbar>
        <div class="md-layout md-alignment-top-center">
            <div class="md-layout-item md-xsmall-size-100 md-medium-size-66 md-large-size-66 md-xlarge-size-50" style='margin-top: -64px; z-index: 5'>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-xsmall-size-100 md-small-size-50 md-medium-size-50 md-large-size-50 md-xlarge-size-50" v-for='cat in data'>
                        <router-link :to='`/category/${cat.english_name.toLowerCase()}`'>
                            <md-card md-with-hover>
                                <md-card-header>
                                    <div class="md-title">{{cat.name}}</div>
                                    <div class="md-subhead">
                                        <bdi style="text-align: left; display: block">
                                            {{cat.english_name}}
                                        </bdi>
                                    </div>
                                </md-card-header>
                            </md-card>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <loading-overlay icon='list' title='در حال بارگذاری...' v-if='mode === "load"'></loading-overlay>

    </div>
</template>

<script>
import http from '../utils/http';
import router from '../routes';
export default {
    name: 'category-list',
    data(){
        return {
            mode: 'load',
            data: null
        }
    },
    async created(){
        const request = await http('Categories');
        try {
            if (request.data.ok) {
                this.mode = 'view';
                this.data = request.data.result;
            } else {
                this.mode = 'error';
                this.data = request.data.result;
            }
        } catch (e) {
            this.mode = 'error';
            this.data = e;
        }
    }
}
</script>
