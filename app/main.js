const InputComponent = {
  template: `
    <div class="input-form">
      <form class="ui form" @submit="submitForm">
        <div class="field">
          <input type="text" v-model="newItem" placeholder="Add an item">
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
    newItem: '',
    items: []
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
