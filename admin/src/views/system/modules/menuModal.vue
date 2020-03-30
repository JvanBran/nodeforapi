<template>
    <a-modal
        title="操作"
        :width="600"
        :visible="visible"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
    </a-modal>
</template>

<script>
    export default {
        data(){
            return{
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 }
                },
                visible: false,
                confirmLoading: false,
                mdl: {}
            }
        },
        methods: {
            handleOk() {
                
            },
            handleCancel(){
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>