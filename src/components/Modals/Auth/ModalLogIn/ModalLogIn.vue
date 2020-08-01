<template>
  <modal title="Authorization"
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
          <input 
            type="password" 
            v-model="password"
            :class="{ error: $v.password.$error &&
            $v.password.$dirty && 
            $v.password.minLength}" 
            @blur="$v.password.$touch()"
          >
        </div>
        <button class="btn btnPrimary">LOG IN</button>
      </form>

      <button class="btn btnPrimary" @click="$emit('open-another-modal')">I need to create an account</button>
    </div>
  </modal>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
import modal from '@/components/UI/Modal/Modal.vue';

export default {
  components: {
    modal,
  },
  props: {
    modalLogIn: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      password: '',
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
  },
  watch: {
    modalLogIn() {
      if (this.modalLogIn) {
        this.email = '';
        this.password = '';

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
@import './ModalLogIn.module.scss';
</style>