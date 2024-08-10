<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h3>Cadastro de Contato</h3>
        <div class="col-3">
          <label for="nomeInput" class="form-label">ID</label>
          <input v-model="currentTutorial.id" type="text" class="form-control" id="id" disabled>
        </div>
        <div class="mb-3">
          <label for="nomeInput" class="form-label">Nome Completo</label>
          <input v-model="currentTutorial.descricao" type="text" class="form-control" id="nomeInput" placeholder="Digite seu nome">
        </div>
        <div class="mb-3">
          <label for="emailInput" class="form-label">Endereço de email</label>
          <input v-model="currentTutorial.estilo" type="email" class="form-control" id="emailInput" placeholder="name@example.com">
        </div>
        <div class="mb-3">
          <label for="telefoneInput" class="form-label">Telefone</label>
          <input v-model="currentTutorial.unidade" type="text" class="form-control" id="telefoneInput" placeholder="Telefone">
        </div>
        <button @click="saveTutorial" type="button" class="btn btn-primary m-1">Salvar</button>
        <button @click="UpdateContato" type="button" class="btn btn-warning m-1">Editar</button>
        <button @click="DeleteById" type="button" class="btn btn-danger">Deletar</button>
      </div>

      <div class="col">
        <h3>Contatos Cadastrados</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Telefone</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(contato, index) in tutorials"
              :key="index"
              :class="{ active: index == currentIndex }"
              @click="setActiveTutorial(contato, index)"
            >
              <td>{{ contato.id }}</td>
              <td>{{ contato.descricao }}</td>
              <td>{{ contato.estilo }}</td>
              <td>{{ contato.unidade }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

     <div v-if="submitted" class="alert alert-warning mt-3" role="alert">
         {{ responseMessage }}
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
      currentTutorial: {
        descricao: '',
        estilo: '',
        unidade: ''
      },
      currentIndex: -1,
      submitted: false,
      responseMessage: ''
    };
  },
  methods: {
     saveTutorial() {
      var data = {
        descricao: this.currentTutorial.descricao,
        estilo: this.currentTutorial.estilo,
        unidade: this.currentTutorial.unidade
      };

      TutorialDataService.create(data)
        .then(response => {
          this.submitted = true;
          console.log(response.data);
          if (response.data.mensagem_erro) {
            this.responseMessage = response.data.mensagem_erro;
        } else {
            this.retrieveTutorials();
            this.responseMessage = response.data.mensagem_sucesso;
        }
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

     UpdateContato() {
      var data = {
        id : this.currentTutorial.id,
        descricao: this.currentTutorial.descricao,
        estilo: this.currentTutorial.estilo,
        unidade: this.currentTutorial.unidade
      };

      TutorialDataService.update(data)
        .then(response => {
          this.submitted = true;
          console.log(response.data);
          if (response.data.mensagem_erro) {
            this.responseMessage = response.data.mensagem_erro;
        } else {
            this.retrieveTutorials();
            this.responseMessage = response.data.mensagem_sucesso;
        }
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    DeleteById() {
      var data = {
        id : this.currentTutorial.id,
      };

      TutorialDataService.delete(data)
        .then(response => {
          this.submitted = true;
          console.log(response.data);
          if (response.data.mensagem_erro) {
            this.responseMessage = response.data.mensagem_erro;
        } else {
            this.retrieveTutorials();
            this.responseMessage = response.data.mensagem_sucesso;
        }
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

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
      this.currentTutorial = {
        descricao: '',
        estilo: '',
        unidade: ''
      };
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = { ...tutorial };
      this.currentIndex = index;
    },
  },
  mounted() {
    this.retrieveTutorials();
  },
};
</script>
