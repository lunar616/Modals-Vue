<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div class="modal-form-log-in">
          <button class="btn btnPrimary" @click="openModal('modalLogIn')">
            Log in
          </button>

          <modalLogIn
            :modalLogIn="modalLogIn"
            v-show="modalLogIn" 
            @close="closeModal('modalLogIn')" 
            @open-another-modal="closeThisModalAndOpenAnotherModal('modalLogIn' , 'modalRegistration')" 
          />
        </div>

        <div class="modal-form-create-account">
          <button class="btn btnPrimary" @click="openModal('modalRegistration')">
            Create account
          </button>

          <modalRegistration 
            :modalRegistration="modalRegistration"
            v-show="modalRegistration" 
            @close="closeModal('modalRegistration')" 
            @open-another-modal="closeThisModalAndOpenAnotherModal('modalRegistration' , 'modalLogIn')" 
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import modal from '@/components/UI/Modal/Modal.vue'
import modalLogIn from '@/components/Modals/Auth/ModalLogIn/ModalLogIn.vue'
import modalRegistration from '@/components/Modals/Auth/ModalRegistration/ModalRegistration.vue'

export default {
  components: {
    modal, modalLogIn, modalRegistration,
  },
  data() {
    return {
      modalLogIn: false,
      modalRegistration: false,
    };
  },
  methods: {
    openModal(modalName) {
      this[modalName] = true;
    },
    closeModal(modalName) {
      this[modalName] = false;
    },
    closeThisModalAndOpenAnotherModal(thisModal, anotherModal) {
      this[thisModal] = false;
      this[anotherModal] = true;
    },
  },
};
</script>

<style scoped>
@import './Lk.module.scss';
</style>