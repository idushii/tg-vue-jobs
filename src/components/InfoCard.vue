<template>
<div class="card">
  <div class="card-content">
    {{items}}
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Items, Item } from "../items";

@Component
export default class InfoCard extends Vue {
  @Prop() private msg!: string;

  items: Items = new Items()

  async mounted() {
    let data = await fetch('/items.json').then(r => r.json())
    this.items.parse(data)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
