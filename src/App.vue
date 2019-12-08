<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Канал vuejs_jobs</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a target="_blank" href="https://t.me/vuejs_jobs">Канал vuejs_jobs</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              <label>
                <input type="checkbox" v-model="showVakancies" />
                <span>Вакансии</span>
              </label>
              <label>
                <input type="checkbox" v-model="showRezume" />
                <span>Резюме</span>
              </label>
            </div>
          </div>
        </div>
        <div class="col s12 m4">
          <InfoList
            ref="InfoList"
            @select="select"
            :showVakancies="showVakancies"
            :showRezume="showRezume"
          />
        </div>
        <div class="col s12 m8 preview">
          <div class="card" v-if="showItem">
            <div class="card-content" v-html="showItem.text" />
          </div>
          <div class="card" v-else>
            <div class="card-content">
              <p>Информация актуальна на 08 12 2019</p>
              <p>
                <a href="https://github.com/idushii/tg-vue-jobs" target="_blank">Репозиторий</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      ИП Ильинов &copy; 2019
      <br />
      <a href="http://xn----dtbqbarpid7k.xn--p1ai/">www.ип-ильинов.рф</a>
    </footer>
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

  showVakancies: Boolean = true;
  showRezume: Boolean = true;

  select(item: Item) {
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

label {
  margin-right: 2rem;
}

footer {
  text-align: center;
  padding: 2rem;
}
</style>
