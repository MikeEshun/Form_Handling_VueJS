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
    onHoodieClick() {
      console.log('Hoodie');
    },
    onFittedCapClick() {
      console.log('Fitted Cap');
    },
    onJacketClick() {
      console.log('Jacket');
    },
    onTeeClick() {
      console.log('Tee');
    },
  },
}

new Vue({
  el: '#app',
  components: {
    'button-row': ButtonRow,
  }
})
