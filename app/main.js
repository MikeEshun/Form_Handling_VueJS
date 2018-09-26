const InputComponent = {
  template: `
    <div class="input-form">
      <form class="ui form" @submit="submitForm">
        <div class="field">
          <input type="text" :value="newItem" name="NEW_ITEM" placeholder="Add an item" @input="onInputChange">
          <span style="float: right;">{{ newItemLength }} / 20</span>
          <span style="color: red;">{{ fieldErrors.newItem }}</span>
          <span style="color: red;" v-if="isItemLengthLimitExceeded">
            Must be under twenty characters
          </span>
        </div>

        <div class="field">
          <input type="text" :value="email" name="EMAIL" placeholder="Enter your email" @input="onInputChange">
          <span style="color: red;">{{ fieldErrors.email }}</span>
        </div>

        <div class="field">
          <select class="ui fluid search dropdown" :value="urgency" name="URGENCY" @change="onInputChange">
            <option disabled value="">Please select one</option>
            <option>Nonessential</option>
            <option>Moderate</option>
            <option>Urgent</option>
          </select>
          <span style="color: red;">{{ fieldErrors.urgency }}</span>
          <div>
            <span style="color: red;" v-if="isNotUrgent">
              Must be Moderate or Urgent
            </span></div>
        </div>

        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" :checked="termsAndConditions" name="TERMS_AND_CONDITIONS" @change="onInputChange"/>
            <label><strong>I accept the terms and conditions</strong></label>
          <span style="color: red;">{{ fieldErrors.termsAndConditions }}</span>
          </div>
        </div>

        <button class="ui button" 
          v-if="saveStatus === 'SAVING'"
          disabled="isItemLengthLimitExceeded || isNotUrgent">
          Saving...
        </button>

        <button class="ui button" 
          v-if="saveStatus === 'SUCCESS'"
          :disabled="isItemLengthLimitExceeded || isNotUrgent">
          Saved! Submit another
        </button>

        <button class="ui button" 
          v-if="saveStatus === 'ERROR'"
          :disabled="isItemLengthLimitExceeded || isNotUrgent">
          Saved failed - Retry
        </button>

        <button class="ui button" 
          v-if="saveStatus === 'READY'"
          :disabled="isItemLengthLimitExceeded || isNotUrgent">
          Submit
        </button>
      </form>
      <div class="ui segment">
        <h4 class="ui header">Items</h4>
        <ul>
          <div class="ui active inline loader" v-if="loading"></div>
          <li class="item" v-for="item in items">{{ item }} </li>
        </ul>
      </div>
    </div>
  `,
  data: () => ({
    fieldErrors: {
      newItem: undefined,
      email: undefined,
      urgency: undefined,
      termsAndConditions: undefined,
    },
    loading: false,
    saveStatus: 'READY',
  }),
  
  computed: Vuex.mapGetters({
    newItem: 'newItem',
    newItemLength: 'newItemLength',
    email: 'email',
    isItemLengthLimitExceeded: 'isItemLengthLimitExceeded',
    urgency: 'urgency',
    isNotUrgent: 'isNotUrgent',
    termsAndConditions: 'termsAndConditions',
    items: 'items'
  }),

  methods: {
    onInputChange(evt) {
      const element = evt.target;

      let value = element.name === 'TERMS_AND_CONDITIONS' ? element.checked : element.value;
      
      this.$store.commit(`UPDATE_${element.name}`, value);
    },

    submitForm(evt) {
      evt.preventDefault();

      this.fieldErrors = this.validateForm(this.$store.state.fields);

      if (Object.keys(this.fieldErrors).length) return;

      const items = [
        ...this.$store.state.items, 
        this.$store.state.fields.newItem
      ];

      this.saveStatus = 'SAVING';
      this.$store.dispatch('saveItems', items)
        .then(() => {
          this.saveStatus = 'SUCCESS';
        })
        .catch((err) => {
          console.log(err);
          this.saveStatus = 'ERROR';
        })
    },

    validateForm(fields) {
      const errors = {};

      if (!fields.newItem) errors.newItem = 'New item required';

      if (!fields.email) errors.email = 'Email is required';

      if (!fields.urgency) errors.urgency = 'Specify Item\'s urgency';

      if (!fields.termsAndConditions) errors.termsAndConditions = 'Accept Terms and Conditions to proceed';

      if (fields.email && !this.isEmail(fields.email)) {
        errors.email = 'Must be of format test@test.com';
      }

      return errors;
    },

    isEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  },

  created() {
    this.loading = true;
    this.$store.dispatch('loadItems')
      .then((response) => {
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      })
  },  
}


new Vue({
  el: '#app',
  store,
  components: {
    'InputComponent': InputComponent,
  },
})