<template lang="html">
    <div>
        <md-toolbar class="md-large md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <md-button class="md-icon-button" to='/'>
                        <md-icon>arrow_forward</md-icon>
                    </md-button>
                    <h1 class="md-title" style='flex: 3'>سبد خرید</h1>
                </div>
            </div>
        </md-toolbar>
        <div class="md-layout md-gutter md-alignment-top-center" style='margin: 0 !important'>
            <div class="md-layout-item md-size-66 md-small-size-100">
                <md-content style='z-index: 3; margin-top: -56px; position: relative' class="md-elevation-2">
                    <div v-if='orders.length > 0'>
                        <md-table v-model='orders'>
                            <md-table-row slot='md-table-row' slot-scope='{ item }'>
                                <md-table-cell md-label='نام'>{{item.name}}</md-table-cell>
                                <md-table-cell md-label='تعداد'>{{ToFa(item.amount)}}</md-table-cell>
                                <md-table-cell md-label='قیمت واحد'>{{ToFa(item.price)}} تومان</md-table-cell>
                                <md-table-cell md-label='قیمت کل'>
                                    {{ToFa(item.price * item.amount)}} تومان
                                </md-table-cell>
                                <md-table-cell style='text-align: left; white-space: nowrap'>
                                    <md-button class="md-icon-button md-accent" @click='increase(item.name)'>
                                        <md-icon>keyboard_arrow_up</md-icon>
                                        <md-tooltip>افزایش تعداد</md-tooltip>
                                    </md-button>
                                    <md-button class="md-icon-button md-accent" @click='decrease(item.name)' :disabled='item.amount === 1'>
                                        <md-icon>keyboard_arrow_down</md-icon>
                                        <md-tooltip>کاهش تعداد</md-tooltip>
                                    </md-button>
                                    <md-button class="md-icon-button" @click='deleteItem(item.name)' style='color: #f44336'>
                                        <md-icon style='color: #f44336'>delete</md-icon>
                                        <md-tooltip>حذف از سبد</md-tooltip>
                                    </md-button>
                                </md-table-cell>
                            </md-table-row>
                        </md-table>
                        <div style='padding: 16px 0; text-align: center'>
                            <md-button class="md-raised md-accent">
                                نهایی سازی خرید
                            </md-button>
                        </div>
                    </div>

                    <md-empty-state v-else class="md-primary" md-label='چیزی پیدا نشد.' md-icon='cloud_off'>
                        <md-button class="md-raised md-accent" to='/categories'>
                            مشاهده دسته بندی ها
                        </md-button>
                    </md-empty-state>

                </md-content>


                <md-snackbar md-position="center" @md-closed='clearCachedItem' :md-duration="4500" :md-active.sync='deletionSnackOpen'>
                    <span>{{deletedText}} از سبد خرید حذف گردید.</span>
                    <div class="">
                        <md-button class="md-primary" @click='restoreLastDeleted'>بازآوری</md-button>
                        <md-button class="md-primary" @click='clearCachedItem'>تایید</md-button>
                    </div>
                </md-snackbar>


            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'shopping-cart',
    data(){
        return {
            orders: [
                {
                    name: 'آچار فرانسه',
                    price: 45000,
                    amount: 8
                },
                {
                    name: 'آچار افغانی',
                    price: 45000,
                    amount: 8
                }
            ],
            deletionSnackOpen: false,
            deletedText: ''
        };
    },
    methods: {
        increase(key){
            this.orders.filter(e => e.name === key)[0].amount += 1;
        },
        decrease(key){
            if (this.orders.filter(e => e.name === key)[0].amount > 1) {
                this.orders.filter(e => e.name === key)[0].amount -= 1;
            }
        },
        deleteItem(key){
            let id = this.orders.indexOf(this.orders.filter(e => e.name === key)[0]);
            let deleted = this.orders.splice(id, 1);
            localStorage.setItem('lastDeleted', JSON.stringify(deleted[0]));
            this.deletionSnackOpen = true;
            this.deletedText = deleted[0].name
        },
        restoreLastDeleted(){
            let deleted = localStorage['lastDeleted'];
            this.orders.push(JSON.parse(deleted));
            this.deletionSnackOpen = false;
            this.deletedText = ''
        },
        clearCachedItem(){
            localStorage.removeItem('lastDeleted');
            this.deletionSnackOpen = false
        }
    }
}
</script>
