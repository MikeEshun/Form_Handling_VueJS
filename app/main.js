const InputComponent = {
  template: `
    <div class="input-form">
      <form class="ui form" @submit="submitForm">
        <div class="field">
          <label>New Item</label>
          <input type="text" v-model="fields.newItem">
        </div>
        <div class="field">
          <label>Email</label>
          <input type="text" v-model="fields.email">
        </div>
        <div class="field">
          <label>Urgency</label>
          <select class="ui fluid search dropdown" v-model="fields.urgency">
            <option disabled value="">Please select one</option>
            <option>Nonessential</option>
            <option>Moderate</option>
            <option>Urgent</option>
          </select>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" v-model="fields.termsAndConditions"/>
            <label><strong>I accept the terms and conditions</strong></label>
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
    items: [],
  }),
  methods: {
    submitForm(evt) {
      this.items.push(this.newItem);
      this.newItem = ''
      evt.preventDefault();
    }
  },
}



new Vue({
  el: '#app',
  components: {
    'InputComponent': InputComponent,
  }
})
