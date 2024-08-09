<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Pesquisar produtos"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary m-1" type="button"
            @click="searchTitle"
          >
            Pesquisar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de produtos</h4>
    <table class="table table-striped">
  <thead>
    <tr>
      <th>Descrição</th>
      <th>Estilo</th>
      <th>Unidade</th>
    </tr>
  </thead>
  <tbody>
    <tr 
      v-for="(produto, index) in tutorials"
      :key="index"
      :class="{ active: index == currentIndex }"
      @click="setActiveTutorial(produto, index)"
    >
      <td>{{ produto.descricao }}</td>
      <td>{{ produto.estilo }}</td>
      <td>{{ produto.unidade }}</td>
    </tr>
  </tbody>
</table>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Delete produto
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Detatlhes do produto</h4>
        <div>
          <label><strong>Descrição:</strong></label> {{ currentTutorial.descricao }}
        </div>
        <div>
          <label><strong>Estilo:</strong></label> {{ currentTutorial.estilo }}
        </div>
        <div>
          <label><strong>Unidade:</strong></label> {{ currentTutorial.unidade }}
        </div>

        <router-link :to="'/tutorials/' + currentTutorial.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Selecione um produto...</p>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 1200px;
  margin: auto;
}
</style>
