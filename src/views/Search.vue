<template>
    <div class="typelist">

        <goodList v-if="list.length > 0" :list1="list">
        </goodList>
        <div class="tip" v-else>
            没有你想要搜索的内容
            <button @click="$router.back()">返回</button>
        </div>
    </div>

</template>

<script>
import goodList from '@/components/goodList';
import { getSearch } from '@/tools/ajax'

export default {
    name: 'WorkspaceJsonSearch',
    components: {
        goodList
    },
    data() {
        return {
            list: []
        };
    },


    created() {
        getSearch({
            word: this.$route.query.key
        }).then(res => {
            this.list = res
        })
    },

    beforeRouteUpdate(to, next) {
        // console.log('updata');
        console.log(to.query.key);
        getSearch({ word: to.query.key }).then(res => {
            this.list = res;
            console.log(res);
        })
        next()
    }

    // methods: {

    // },
};
</script>

<style lang="scss" scoped>
</style>