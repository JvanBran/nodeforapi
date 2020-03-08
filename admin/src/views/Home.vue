<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: { 
  },
  mounted(){
    for(let i = 0;i<100; i++){
      this.init(i)
    }
  },
  methods:{
    init(i){
      this.$post('/api/login/signin',{"login_name":"Jvan","password":"123456",})
      .then(res=>{
        console.log('res: '+i, res.result.token);
      })
    },
  }
}
</script>
