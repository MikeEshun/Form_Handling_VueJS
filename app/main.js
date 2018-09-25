const ButtonRow = {
  template: `
    <div>
      <button 
        class="ui button" 
        @click="onButtonClick" 
        name="button-hoodie" 
        value="fullstack-hoodie">
        Hoodie
      </button>
      <button 
        class="ui button" 
        @click="onButtonClick" 
        name="button-tee" 
        value="fullstack-tee">
        Hoodie
      </button>
      <button 
        class="ui button" 
        @click="onButtonClick" 
        name="button-fitted-cap" 
        value="fullstack-fitted-cap">
        Hoodie
      </button>
      <button 
        class="ui button" 
        @click="onButtonClick" 
        name="button-jacket" 
        value="fullstack-jacket">
        Hoodie
      </button>
    </div>
  `,
  methods: {
    onButtonClick(evt) {
      const button = evt.target;
      console.log(`The user clicked ${button.name}: ${button.value}`);
    }
  },
}

new Vue({
  el: '#app',
  components: {
    'button-row': ButtonRow,
  }
})
