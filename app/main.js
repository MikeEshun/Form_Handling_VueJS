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
          <!-- <div>
            <span style="color: red;" v-if="isEmailFormatValid">
              Must be of the format test@test.com
            </span>
          </div> -->
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
          <div>
            <span style="color: red;" v-if="isNotUrgent">
              Must be Moderate or Urgent
            </span></div>
        </div>

        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" v-model="fields.termsAndConditions"/>
            <label><strong>I accept the terms and conditions</strong></label>
          <span style="color: red;">{{ fieldErrors.termsAndConditions }}</span>
          </div>
        </div>

        <button class="ui button" 
          v-if="saveStatus === 'SAVING'"
          disabled="isNewItemInputExceeded || isNotUrgen || isEmailFormatValidt">
          Saving...
        </button>

        <button class="ui button" 
          v-if="saveStatus === 'SUCCESS'"
          :disabled="isNewItemInputExceeded || isNotUrgent || isEmailFormatValid">
          Saved! Submit another
        </button>

        <button class="ui button" 
          v-if="saveStatus === 'ERROR'"
          :disabled="isNewItemInputExceeded || isNotUrgent || isEmailFormatValid">
          Saved failed - Retry
        </button>

        <button class="ui button" 
          v-if="saveStatus === 'READY'"
          :disabled="isNewItemInputExceeded || isNotUrgent || isEmailFormatValid">
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
    loading: false,
    saveStatus: 'READY',
  }),
  computed: {
    isNewItemInputExceeded() {
      return this.fields.newItem.length > 20;
    },
    isNotUrgent() {
      return this.fields.urgency === 'Nonessential';
    },
    isEmailFormatValid() {
      return this.fields.email.length <= 4;
    }
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault();

      this.fieldErrors = this.validateForm(this.fields);

      if (Object.keys(this.fieldErrors).length > 0) return;

      const items = [...this.items, this.fields.newItem];

      this.saveStatus = 'SAVING';
      apiClient.saveItems(items)
        .then(() => {
          this.items = items;
          this.fields.newItem = '';
          this.fields.email = '';
          this.fields.urgency = '';
          this.fields.termsAndConditions = false;
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
    this.loading = true,
    apiClient.loadItems().then((items) => {
      this.items = items;
      this.loading = false;
    })
  },
}


let apiClient = {
  loadItems: function () {
    return {
      then: function (cb) {
        setTimeout(() => {
          cb(JSON.parse(localStorage.items || '[]'));
        }, 1000);
      },
    };
  },
  saveItems: function (items) {
    const success = !!(this.count++ % 2);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({ success });
        localStorage.items = JSON.stringify(items);
        return resolve({ success });
      }, 1000);
    });
  },

  count: 1,
}


/*
use console.log(
  setTimeout(() => {
    'saveStatus'
  }, 1000)
)

to render error, saving or saved status for  second

--saveStatus [error, saved, saving]
*/


new Vue({
  el: '#app',
  components: {
    'InputComponent': InputComponent,
  },
})