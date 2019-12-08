<template>
  <div>
    <InfoCard
      v-for="(item, index) in  items.value"
      :key="`item-${index}`"
      :City="item.City"
      :Format="item.Format"
      :Employment="item.Employment"
      :Rating="item.Rating"
      :Text="item.text"
      @select="localSelect(index)"
    />
    <div class="card" v-if="items.value && items.value.length == 0">
      <div class="card-content">
        Данных нет
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";

import { Items, Item } from "../items";
import InfoCard from "./InfoCard.vue";

@Component({
  components: { InfoCard }
})
export default class InfoList extends Vue {
  @Prop() private showVakancies!: boolean;
  @Prop() private showRezume!: boolean;

  showItem: Item | false = false;
  items: Items = new Items();

  async mounted() {
    let data = await fetch("/items.json").then(r => r.json());
    this.items.parse(data.reverse());
    if (!this.showVakancies) this.items.showVakancies = false;
    if (!this.showRezume) this.items.showRezume = false;
  }

  @Emit("select")
  localSelect(index: number) {
    //@ts-ignore
    return this.items.value[index];
  }

  @Watch("showVakancies")
  f1() {
    this.items.showVakancies = this.showVakancies
  }
  
  @Watch("showRezume")
  f2() {
    this.items.showRezume = this.showRezume
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
