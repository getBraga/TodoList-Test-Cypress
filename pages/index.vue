<template>
  <div>
    <div class="div-principal">
      <h1>TodoList</h1>
      <b-button @click="ativarNovoTodo = !ativarNovoTodo">Nova tarefa</b-button>
    </div>
    <Card
      :todoLists="todoLists"
      :enviarDados="enviarDados"
      @meu-evento="novoDadosTodo"
      :ativarNovoTodo="ativarNovoTodo"
      :excluirTodo="excluirTodo"
      :alterarTodo="alterarTodo"
    />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Service from "@/Services/Services";

export default {
  components: {
    Card
  },
  data() {
    return {
      todoLists: [],
      novoTodo: [],
      ativarNovoTodo: false
    };
  },
  methods: {
    async pegarTodo() {
      const response = await Service.getTodoList();
      this.todoLists = await response.data;
    },
    async enviarDados(event) {
      try {
        let resultado = confirm("Deseja alterar?");
        console.log(event);
        if (resultado) {
          event.alterar = false;
          await Service.putTodoList(event.id, event);
          this.pegarTodo();
        }
      } catch (error) {
        console.error("Deu ruim!!!", error);
      }
    },
    async novoDadosTodo(payload) {
      try {
        await Service.postTodoList(payload);
        this.ativarNovoTodo = false;
        this.pegarTodo();
      } catch (error) {
        console.error(error);
      }
    },
    async excluirTodo(id) {
      try {
        let resultado = confirm("Deseja excluir?");
        if (resultado) {
          await Service.deleteTodoList(id);
          this.pegarTodo();
        }
      } catch (error) {
        console.error("Deu ruim!!!", error);
      }
    },
    async alterarTodo(id) {
      try {
        id.alterar = !id.alterar;
        await Service.patchTodoList(id.id, id.alterar);
      } catch (error) {
        console.error("Deu ruim!!!", error);
      }
    }
  },
  created() {
    this.pegarTodo();
  }
};
</script>
<style lang="scss">
body,
h1,
p,
a,
ul,
li {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
}
.div-principal {
  max-width: 960px;
  margin: 40px auto;
  text-align: center;
  h1 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    text-transform: uppercase;
  }
}
.div-white {
  background: #ffff;
  width: 100%;
  height: 100vh;
}
</style>
