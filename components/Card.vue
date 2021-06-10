<template>
  <div>
    <div class="card-container">
      <ul class="ul-card" v-for="todo in todoLists" :key="todo.id">
        <div class="div-alterar">
          <div class="button-alterar" @click="alterarTodo(todo)">
            <b-tooltip label="Alterar tarefa">
              <b-icon icon="pencil"></b-icon
            ></b-tooltip>
          </div>
        </div>
        <div class="div-excluir">
          <div class="button-excluir" @click="excluirTodo(todo.id)">
            <b-tooltip label="Excluir tarefa"
              ><b-icon icon="delete"></b-icon
            ></b-tooltip>
          </div>
        </div>
        <li>
          <input
            :readonly="!todo.alterar"
            class="input-titulo"
            placeholder="titulo..."
            v-model="todo.titulo"
          />
        </li>
        <li>
          <input
            :readonly="!todo.alterar"
            class="input-prioridade"
            type="number"
            placeholder="prioridade"
            v-model="todo.prioridade"
          />
        </li>
        <li>
          <textarea
            :readonly="!todo.alterar"
            placeholder="tarefa"
            class="textarea-tarefa"
            v-model="todo.descricao"
          ></textarea>
        </li>
        <b-button
          @click="enviarDados(todo)"
          :disabled="!todo.alterar"
          class="botao-enviar"
          >Enviar</b-button
        >
      </ul>
      <ul class="ul-card" v-if="ativarNovoTodo">
        <li>
          <input
            class="input-novo-titulo"
            placeholder="titulo..."
            v-model="inputTitulo"
          />
        </li>
        <li>
          <input
            class="input-novo-prioridade"
            type="number"
            placeholder="prioridade"
            v-model="inputPrioridade"
          />
        </li>
        <li>
          <textarea
            placeholder="tarefa"
            class="textarea-nova-tarefa"
            v-model="inputDescricao"
          ></textarea>
        </li>
        <b-button @click="criarDados" class="criar-todo">Enviar</b-button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alterarTodo: {
      type: Function
    },
    excluirTodo: {
      type: Function
    },
    ativarNovoTodo: {
      type: Boolean
    },
    desabilitado: {
      type: Boolean
    },
    todoLists: {
      type: Array,
      require: true
    },
    enviarDados: {
      type: Function
    }
  },
  data() {
    return {
      ativarItem: true,
      inputTitulo: "",
      inputPrioridade: "",
      inputDescricao: ""
    };
  },
  watch: {
    ativarNovoTodo() {
      this.inputTitulo = "";
      this.inputPrioridade = "";
      this.inputDescricao = "";
    }
  },
  methods: {
    criarDados() {
      this.$emit("meu-evento", {
        titulo: this.inputTitulo,
        prioridade: this.inputPrioridade,
        descricao: this.inputDescricao,
        alterar: false
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 960px;
  margin: 0 auto;
  padding: 0.5rem;
}
.ul-card {
  width: 200px;
  min-height: 200px;
  padding: 0.5rem;
  margin: 5px;
  background: #00a9ff;
}

.input-titulo,
.input-prioridade,
.textearea-tarefa,
.input-novo-titulo,
.input-novo-prioridade,
.textearea-nova-tarefa {
  width: 100%;
  outline: none;
  border: none;
  background: #fff;
  margin-bottom: 10px;
}
textarea {
  width: 100%;
  height: 80px;
  outline: none;
}
.div-excluir {
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: -25px;
  right: -18px;
}
.button-excluir {
  position: absolute;
  background: none;

  outline: none;
  border: none;
  color: #000;
  cursor: pointer;
  z-index: 0;
}
.div-alterar {
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: -25px;
  right: 5px;
}
.button-alterar {
  position: absolute;
  background: none;
  outline: none;
  border: none;
  color: #000;
  cursor: pointer;
  z-index: 0;
}
.criar-todo,
.botao-enviar {
  margin-top: 5px;
  margin-bottom: 5px;
  max-width: 80px;
  font-size: 0.875rem;
  height: 30px;
}
</style>
