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
                <a-input v-decorator="['parent_id', {initialValue:mdl.parent_id}]" disabled />
            </a-form-item>

            <a-form-item
            label="title"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            >
                <a-input v-decorator="['title', {rules: [{ required: true, message: '请输入路由标签名' }],initialValue:mdl.title}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="name"
            >
                <a-input v-decorator="['name', {rules: [{ required: true, message: '请输入路由名' }],initialValue:mdl.name}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="path"
            >
                <a-input v-decorator="['path', {rules: [{ required: true, message: '请输入路由path' }],initialValue:mdl.name}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="component"
            >
                <a-input v-decorator="['component', {rules: [{ required: true, message: '请输入组件名' }],initialValue:mdl.component}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="redirect"
            >
                <a-input v-decorator="['redirect', {initialValue:mdl.redirect}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="icon"
            >
                <a-input v-decorator="['icon', {initialValue:mdl.icon}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="keepAlive"
            >
                <a-switch v-decorator="['keepAlive', { valuePropName: 'checked' ,initialValue:mdl.keepAlive}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="hideChildren"
            >   
                <a-switch v-decorator="['hideChildren', { valuePropName: 'checked' ,initialValue:mdl.hideChildren}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="permission"
            >
                <a-input v-decorator="['permission', {rules: [{ required: true, message: '请输入路由权限名' }],initialValue:mdl.permission}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="hideHeader"
            >
                <a-switch v-decorator="['hideHeader', { valuePropName: 'checked' ,initialValue:mdl.hideHeader}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="isShow"
            >   
                <a-switch v-decorator="['isShow', { valuePropName: 'checked' ,initialValue:mdl.isShow}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="show"
            >
                <a-switch v-decorator="['show', { valuePropName: 'checked' ,initialValue:mdl.show}]" />
            </a-form-item>
            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="target"
            >
                <a-switch v-decorator="['target', { valuePropName: 'checked' ,initialValue:mdl.target}]" />
            </a-form-item>
        </a-form>
    </a-spin>
    </a-modal>
</template>

<script>
    import {editMeunNav,creatMeunNav} from '@/api'
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
                mdl: {},
                postType:''
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this)
        },
        methods: {
            add (id) {
                this.edit({ parent_id: id },'add')
            },
            edit (record,type) {
                this.postType = type;
                this.mdl = Object.assign({}, record)
                this.form.resetFields()
                this.visible = true
            },
            close () {
                this.$emit('close')
                this.visible = false
            },
            handleOk() {
                // 触发表单验证
                this.form.validateFields(async (err, values) => {
                    if(!err){
                        switch (this.postType) {
                            case 'edit':
                                await editMeunNav(Object.assign({'_id':this.mdl._id},values))
                                break;
                            case 'add':
                                await creatMeunNav(Object.assign({'_id':this.mdl._id},values))
                                break;
                            default:
                                break;
                        }
                        this.visible = false
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