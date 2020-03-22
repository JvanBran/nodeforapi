const checkForm = {
    methods: {
        handleUsernameOrEmail (rule, value, callback) {
            const { state } = this
            const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
            if (regex.test(value)) {
              state.loginType = 0
            } else {
              state.loginType = 1
            }
            callback()
        },
    }
}
export { checkForm }