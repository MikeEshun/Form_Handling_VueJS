const InputComponent = {
  template: `
    <div class="input-form">
      <form class="ui form" @submit="submitForm">
        <div class="field">
          <label>New Item</label>
          <input type="text" v-model="fields.newItem">
          <span style="float: right;">{{ fields.newItem.length }} / 20</span>
          <span style="color: red;">{{ fieldErrors.newItem }}</span>
          <span style="color: red;" v-if="isNewItemInputExceeded">
            Must be under twenty characters
          </span>
        </div>

        <div class="field">
          <label>Email</label>
          <input type="text" v-model="fields.email">
          <span style="color: red;">{{ fieldErrors.email }}</span>
        </div>

        <div class="field">
          <label>Urgency</label>
          <select class="ui fluid search dropdown" v-model="fields.urgency">
            <option disabled value="">Please select one</option>
            <option>Nonessential</option>
            <option>Moderate</option>
            <option>Urgent</option>
          </select>
          <span style="color: red;">{{ fieldErrors.urgency }}</span>
          <span style="color: red;" v-if="isNotUrgent">
            Must be Moderate or Urgent
          </span>
        </div>

        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" v-model="fields.termsAndConditions"/>
            <label><strong>I accept the terms and conditions</strong></label>
          <span style="color: red;">{{ fieldErrors.termsAndConditions }}</span>
          </div>
        </div>

        <button class="ui button" :disabled="isNewItemInputExceeded || isNotUrgent">
          Submit
        </button>
      </form>
      <div class="ui segment">
        <h4 class="ui header">Items</h4>
        <ul class="item" v-for="item in items">
          <li>{{ item }} </li>
        </ul>
      </div>
    </div>
  `,
  data: () => ({
    fields: {
      newItem: '',
      email: '',
      urgency: '',
      termsAndConditions: false,
    },
    fieldErrors: {
      newItem: undefined,
      email: undefined,
      urgency: undefined,
      termsAndConditions: undefined,
    },
    items: [],
  }),
  computed: {
    isNewItemInputExceeded() {
      return this.fields.newItem.length > 20;
    },
    isNotUrgent() {
      return this.fields.urgency === 'Nonessential';
    },
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault();

      this.fieldErrors = this.validateForm(this.fields);

      if (Object.keys(this.fieldErrors).length > 0) return;

      this.items.push(this.fields.newItem);
      this.fields.newItem = '';
      this.fields.email = '';
      this.fields.urgency = '';
      this.fields.termsAndConditions = false;
    },
    validateForm(fields) {
      const errors = {};

      if (!fields.newItem) { 
        errors.newItem = 'New item required';
      }

      if (!fields.email) {
        errors.email = 'Email is required';
      }

      if (!fields.urgency) { 
        errors.urgency = 'Specify Item\'s urgency';
      }

      if (!fields.termsAndConditions) { 
        errors.termsAndConditions = 'Accept Terms and Conditions to proceed';
      }

      if (fields.email && !this.isEmail(fields.email)) {
        errors.email = 'Email for must be test@test.com';
      } 
      
      return errors;
    },
    isEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  }
}


new Vue({
  el: '#app',
  components: {
    'InputComponent': InputComponent,
  }
})
