<template>
  <div>
    <div class="card" v-for="(item, index) in items.value" :key="`item-${index}`">
      <div class="card-content">
        {{index+1}}
        <p>Город: {{item.City}}</p>
        <p>Формат работы: {{item.Format}}</p>
        <p>Занятость: {{item.Employment}}</p>
        <p>Оплата: {{item.Rating}}</p>
        {{item.text}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Items, Item } from "../items";

@Component
export default class InfoCard extends Vue {
  @Prop() private msg!: string;

  items: Items = new Items();

  async mounted() {
    let data = await fetch("/items.json").then(r => r.json());
    this.items.parse(data);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
