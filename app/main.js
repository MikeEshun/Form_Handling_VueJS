const InputComponent = {
  template: `
    <div class="input-form">
      <form class="ui form" @submit="submitForm">
        <div class="field">
          <label>New Item</label>
          <input type="text" v-model="fields.newItem">
          <span style="color: red;">{{ fieldErrors.newItem }}</span>
        </div>

        <div class="field">
          <label>Email</label>
          <input type="text" v-model="fields.email">
          <span style="color: red;">{{ fieldErrors.emal }}</span>
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
        </div>

        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" v-model="fields.termsAndConditions"/>
            <label><strong>I accept the terms and conditions</strong></label>
          <span style="color: red;">{{ fieldErrors.termsAndConditions }}</span>
          </div>
        </div>

        <button class="ui button">Submit</button>
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
  methods: {
    submitForm(evt) {
      this.items.push(this.newItem);
      this.newItem = ''
      evt.preventDefault();
    },
    validateForm(fields) {
      const errors = {};

      if (!fields.newItem) { 
        errors.newItem = 'New item required';
      }
      if (!fields.email && !this.isEmail(fields.email)) { 
        errors.email = 'Email required';
      }
      if (!fields.urgency) { 
        errors.urgency = 'Specify Item\'s urgency';
      }
      if (!fields.termsAndConditions) { 
        errors.termsAndConditions = 'Accept Terms and Conditions to proceed';
      }
      
      return errors;
    },
    isEmail(email) {
      const re = /\S+@\S+\.S+/;
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
