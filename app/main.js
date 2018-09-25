const ButtonRow = {
  template: `
    <div>
      <button @click="onHoodieClick" class="ui button">Hoodie</button>
      <button @click="onTeeClick" class="ui button">Tee</button>
      <button @click="onFittedCapClick" class="ui button">Fitted Cap</button>
      <button @click="onJacketClick" class="ui button">Jacket</button>
    </div>
  `,
  methods: {
    onHoodieClick(evt) {
      console.log('Hoodie', evt);
    },
    onFittedCapClick(evt) {
      console.log('Fitted Cap', evt);
    },
    onJacketClick(evt) {
      console.log('Jacket', evt);
    },
    onTeeClick(evt) {
      console.log('Tee', evt);
    },
  },
}

new Vue({
  el: '#app',
  components: {
    'button-row': ButtonRow,
  }
})
