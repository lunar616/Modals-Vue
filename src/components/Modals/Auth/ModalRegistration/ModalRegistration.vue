<template>
  <modal title="Registration"
    @close="$emit('close')"
  >
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <div class="form-item">
          <label>E-mail:</label>
          <p class="errorText" v-if="$v.email.$dirty && !$v.email.required">Field is required</p>
          <p class="errorText" v-if="$v.email.$dirty && !$v.email.email">Email is not correct!</p>
          <input type="text" v-model="email" :class="{ error: $v.email.$error }" @blur="$v.email.$touch()">
        </div>

        <div class="form-item">
          <label>Password:</label>
          <p class="errorText" v-if="$v.password.$dirty && !$v.password.required">Field is required</p>
          <p class="errorText" v-if="$v.password.$dirty && !$v.password.minLength">Name must have at least {{ $v.password.$params.minLength.min }}!</p>
          <p 
            class="errorText" 
            v-if="$v.password.minLength && $v.repeatPassword.minLength
            && $v.password.$model && $v.repeatPassword.$model &&
            !$v.repeatPassword.sameAsPassword"
          >
            Password do not match!
          </p>
          <input 
            type="password" 
            v-model="password" 
            :class="{ error: $v.password.$error || 
            $v.password.$dirty && $v.repeatPassword.$dirty && 
            $v.password.minLength && $v.repeatPassword.minLength && 
            !$v.repeatPassword.sameAsPassword && $v.repeatPassword.$model}" @blur="$v.password.$touch()"
          >

          <label>Repeat password:</label>
          <p class="errorText" v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.required">Field is required</p>
          <p class="errorText" v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.minLength">Name must have at least {{ $v.repeatPassword.$params.minLength.min }}!</p>
          <input
            type="password" 
            v-model="repeatPassword" 
            :class="{ error: $v.repeatPassword.$error || 
            $v.password.$dirty && $v.repeatPassword.$dirty && 
            $v.password.minLength && $v.repeatPassword.minLength && 
            !$v.repeatPassword.sameAsPassword }" @blur="$v.repeatPassword.$touch()"
          >
        </div>
        <button class="btn btnPrimary">Create account</button>
      </form>

      <button class="btn btnPrimary" @click="$emit('open-another-modal')">I have an account</button>
    </div>
  </modal>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import modal from '@/components/UI/Modal/Modal.vue'

export default {
  components: {
    modal,
  },
  props: {
    modalRegistration: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs('password'),
    },
  },
  watch: {
    modalRegistration() {
      if (this.modalRegistration) {
        this.email = '';
        this.password = '';
        this.repeatPassword = '';

        this.$v.$reset();
      };
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password,
        };
        
        this.$emit('close');

        console.log(user);
      };
    },
  },
};
</script>

<style lang="scss">
@import './ModalRegistration.module.scss';
</style>