<template>
    <a-modal
        title="菜单属性配置"
        :width="600"
        :visible="visible"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item
            label="parentId"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            >
                <a-input v-decorator="['parent_id', {}]" disabled />
            </a-form-item>

            <a-form-item
            label="title"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            >
                <a-input v-decorator="['title', {}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="name"
            >
                <a-input v-decorator="['name', {}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="component"
            >
                <a-input v-decorator="['component', {}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="redirect"
            >
                <a-input v-decorator="['redirect', {}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="icon"
            >
                <a-input v-decorator="['icon', {}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="keepAlive"
            >
                <a-switch v-decorator="['keepAlive', { valuePropName: 'checked' ,initialValue:true}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="hideChildren"
            >   
                <a-switch v-decorator="['hideChildren', { valuePropName: 'checked' ,initialValue:true}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="permission"
            >
                <a-input v-decorator="['permission', {}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="hideHeader"
            >
                <a-switch v-decorator="['hideHeader', { valuePropName: 'checked' ,initialValue:true}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="isShow"
            >   
                <a-switch v-decorator="['isShow', { valuePropName: 'checked' ,initialValue:true}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="show"
            >
                <a-switch v-decorator="['show', { valuePropName: 'checked' ,initialValue:true}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="target"
            >
                <a-switch v-decorator="['target', { valuePropName: 'checked' ,initialValue:true}]" />
            </a-form-item>
        </a-form>
    </a-spin>
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
        beforeCreate () {
            this.form = this.$form.createForm(this)
        },
        methods: {
            add (id) {
                this.edit({ parent_id: id })
            },
            edit (record) {
                this.mdl = Object.assign({}, record)
                console.log('this.mdl: ', this.mdl);

                this.visible = true
                this.$nextTick(() => {
                    this.form.setFieldsValue({ ...record })
                })
            },
            close () {
                this.$emit('close')
                this.visible = false
            },
            handleOk() {
                this.visible = false
                // 触发表单验证
                this.form.validateFields((err, values) => {
                    console.log(values)
                    if(!err){
                        console.log(values)
                    }
                })
            },
            handleCancel () {
                this.close()
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>