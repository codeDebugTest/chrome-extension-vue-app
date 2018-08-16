<template>
    <div class="option">
        <h2>option page</h2>
    </div>
</template>
<<script>
import Model from './AppModel';

export default {
    name: 'app',
    props: {
        store: {
            type: Object,
            default() {
                return new model();
            }
        }
    },
    created() {
        this.store.init();
    }
}
</script>
<style lang="less">
.option {
    h2 {
        padding: 10px;
        margin: 10px 0 20px 0;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        box-shadow: 0 0 3px 0 #ccc;
        background-color: #eee;
    }
}
</style>
