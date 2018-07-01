<template>
  <main id="main">
    <div class="blue-content"></div>
    <div class="white-content">
      <Form />
    </div>
  </main>
</template>

<script>
import Form from '@/components/Form'

export default {
  name: 'IndexPage',
  components: {
    Form
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  box-sizing: border-box;
}

.blue-content {
  width: 50%;
  height: 100vh;
  background-color: rgb(45, 134, 218);
}

.white-content {
  display: flex;
  align-content: space-around;
  width: 50%;
  height: 100vh;
  background: linear-gradient(-45deg, rgb(45, 134, 218), #fff);
  align-items: center;
}

  @media screen and (max-width: 945px) {
    .blue-content {
      display: none;
    }

    .white-content {
      width: 100%;
    }
  }
</style>
