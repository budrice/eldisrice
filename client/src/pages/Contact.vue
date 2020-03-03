<template>
  <section id="contact">
    <h1 class="mb-3">Contact</h1>
    <b-form id="contact_form" @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input_group_email"
        label="Email address:"
        label-for="input_email"
        description="I do not share your email with anyone."
      >
        <b-form-input
          id="input_email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input_group_name"
        label="Your Name:"
        label-for="input_name"
      >
        <b-form-input
          id="input_name"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input_group_subject"
        label="Subject:"
        label-for="input_subject"
      >
        <b-form-select
          id="input_subject"
          v-model="form.subject"
          :options="subjects"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input_group_message"
        label="Message:"
        label-for="textarea_message"
      >
        <b-form-textarea
          id="textarea_message"
          v-model="form.message"
          placeholder="Enter message"
          rows="10"
          max-rows="15"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </section>
</template>

<script>
import { postMessage } from "@/api"
export default {
  name: "Contact",
  data() {
    return {
      form: {
        email: "",
        name: "",
        subject: null,
        message: ""
      },
      subjects: [
        { text: "Select One", value: null },
        "Need a quote on project",
        "Have a position you might consider",
        "I want to arrange a meeting"
      ],
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      postMessage(this.form).then(
        () => {
          this.onReset()
        },
        error => {
          alert(error)
        }
      )
    },
    onReset(event) {
      event ? event.preventDefault() : null
      // Reset form values
      this.form.email = ""
      this.form.name = ""
      this.form.subject = null
      this.form.message = ""
      // reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
section#contact {
  padding: 440px 15px 65px;
  min-height: 80vh;
}
form#contact_form {
  padding: 0 15px;
}
textarea {
  height: 10em;
}
button {
  width: 150px;
  margin-right: 1em;
}
</style>
