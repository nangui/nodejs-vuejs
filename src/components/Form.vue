<template>
  <div id="main-content">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group class="col-12" id="logingroup"
        label="Adresse email:"
        label-for="login"
        description="Votre email ne sera pas publié">
        <b-form-input class="col-8 offset-2" id="login"
          type="email"
          :model="form.login"
          required
          placeholder="Entrer votre email">
        </b-form-input>
      </b-form-group>
        <b-form-group class="col-12" id="passwordgroup"
          label="Mot de passe:"
          label-for="password">
          <b-form-input class="col-8 offset-2" id="password"
            type="password"
            v-model="form.password"
            required
            placeholder="Entrer votre mot de passe">
          </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">CONNEXION</b-button>
      <b-button type="reset" variant="danger">ANNULER</b-button>
    </b-form>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'Form',
  data () {
    return {
      form: {
        login: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      console.log(JSON.stringify(this.form))
    },
    onReset (e) {
      e.preventDefault()
      /* Reset our form values */
      this.form.login = ''
      this.form.password = ''
      this.show = false
    }
  }
}
</script>

<style scoped>
  #main-content {
    background-color: rgba(0, 0, 0, 0.1);
    color: rgb(50, 50, 50);
    width: 60%;
    padding-top: 15px;
    margin: 10px 10px 10px 18%;
    height: 70vh;
    border-radius: 50px;
    align-self: center;
  }

  form {
    margin-top: 55px;
  }

  .form-control {
    border-radius: 0;
  }

 .form-control:focus {
    border-color: #ced4da;
    box-shadow: none;
  }

  button {
    border-radius: 0;
  }
</style>
