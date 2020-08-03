<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <div class="modal-default">
          <button class="btn btnPrimary" @click="openModal('modalDefault')">
            Show default modal
          </button>

          <modal 
            title="Modal default"
            v-show="modalDefault"
            @close="closeModal('modalDefault')"
            :key="modalDefault"
          >
            <template #body>
              <p>Text</p>
              <button class="btn btnPrimary" @click="closeModal('modalDefault')">
                Well done
              </button>
            </template>
          </modal>
        </div>

        <div class="modal-form">
          <button class="btn btnPrimary" @click="openModal('modalForm')">
            Show modal with form
          </button>
          
          <modal title="Modal form"
            v-show="modalForm.show"
            @close="closeModal('modalForm')"
          >
            <template #body>
              <form @submit.prevent="submitModalForm">
                <label>Name:</label>
                <input type="text" v-model="modalForm.name">
                <label>E-mail:</label>
                <input type="text" v-model="modalForm.email">
                <button class="btn btnPrimary">Submit</button>
              </form>
            </template>
          </modal>
        </div>

        <div class="modal-form-validate">
          <button class="btn btnPrimary" @click="openModal('modalValidate')">
            Show modal with form + Validate
          </button>

          <modalValidate 
            :modalValidate="modalValidate" 
            v-show="modalValidate" 
            @close="closeModal('modalValidate')" 
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import modal from '@/components/UI/Modal/Modal.vue'
import modalValidate from '@/components/Modals/ModalValidate/ModalValidate.vue'

export default {
  components: {
    modal, modalValidate,
  },
  data() {
    return {
      modalDefault: false,
      modalForm: {
        show: false,
        name: '',
        email: '',
      },
      modalValidate: false,
    };
  },
  watch: {
    'modalForm.show'() {
      if (this.modalForm.show) {
        this.modalForm.name = '';
        this.modalForm.email = '';
      };
    },
  },
  methods: {
    openModal(modalName) {
      if (typeof this[modalName] === 'object') {
        this[modalName].show = true;
      } else {
        this[modalName] = true;
      };
    },
    closeModal(modalName) {
      if (typeof this[modalName] === 'object') {
        this[modalName].show = !this[modalName].show;
      } else {
        this[modalName] = !this[modalName];
      };
    },
    submitModalForm() {
      console.log({
        name: this.modalForm.name,
        email: this.modalForm.email,
      });
      this.modalForm.show = false;
    },
  },
};
</script>

<style scoped>
@import './Modals.module.scss';
</style>