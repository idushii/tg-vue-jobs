<template>
    <div class="card">
      <div class="card-content" @click="select">
        <p>Город: {{City}}</p>
        <p>Формат работы: {{Format}}</p>
        <p>Занятость: {{Employment}}</p>
        <p>Оплата: {{Rating}}</p>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Items, Item } from '../items';

@Component
export default class InfoCard extends Vue {

  public isShowText: Boolean = false;
  @Prop() private City!: string;
  @Prop() private Format!: string;
  @Prop() private Employment!: string;
  @Prop() private Rating!: string;
  @Prop() private Text!: string;

  @Emit('select')
  public select() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  cursor: pointer;
  transition: all .3s;
  &:hover {
    background-color: rgb(218, 208, 208);
  }
}
</style>
