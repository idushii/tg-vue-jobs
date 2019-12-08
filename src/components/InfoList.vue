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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

import { Items, Item } from "../items";
import InfoCard from "./InfoCard.vue";

@Component({
  components: { InfoCard }
})
export default class InfoList extends Vue {
  @Prop() private msg!: string;

  showItem: Item | false = false;
  items: Items = new Items();

  async mounted() {
    let data = await fetch("/items.json").then(r => r.json());
    this.items.parse(data);
  }

  @Emit("select")
  localSelect(index: number) {
    //@ts-ignore
    return this.items.value[index];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
