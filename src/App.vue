<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Канал vuejs_jobs</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a target="_blank" href="https://www.xn----dtbqbarpid7k.xn--p1ai/#/">Основной сайт</a>
          </li>
          <li>
            <a target="_blank" href="https://t.me/vuejs_jobs">Канал vuejs_jobs</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col s12"></div>
        <div class="col s12 m4">
          <InfoList @select="select" />
        </div>
        <div class="col s12 m8 preview">
          <div class="card" v-if="showItem">
            <div class="card-content" v-html="showItem.text" />
          </div>
          <div class="card" v-else>
            <div class="card-content">
              <p>Информация актуальна на 08 12 2019</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoList from "./components/InfoList.vue";
import { Items, Item } from "./items";

@Component({
  components: {
    InfoList
  }
})
export default class App extends Vue {
  showItem: Item | false = false;

  select(item: Item) {
    console.log(item);
    this.showItem = item;
  }
}
</script>

<style lang="scss">
.preview {
  position: sticky !important;
  top: 0px;
  .card {
    max-height: 95vh;
    overflow-y: auto;
  }
}

nav {
  padding: 0 1rem;
}
</style>
