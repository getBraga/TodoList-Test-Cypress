describe("Usuário incluindo um card", () => {
  it("Clicar no botão para ativar o card", () => {
    cy.visit("/"); // 1.
    cy.contains("Nova tarefa").click();
  });
  it("Incluir um novo card", () => {
    const typePrioridade = 1;
    const typeTitulo = "Novo item inserido";
    const typeTarefa = "Está é a nova tarefa!!!";
    cy.get(".input-novo-titulo")
      .type(typeTitulo)
      .should("have.value", typeTitulo);

    cy.get(".input-novo-prioridade")
      .type(typePrioridade)
      .should("have.value", typePrioridade);

    cy.get(".textarea-nova-tarefa")
      .type(typeTarefa)
      .should("have.value", typeTarefa);
    cy.get(".criar-todo").click();
  });
  it("Alterar o Card", () => {
    const typePrioridade = 5;
    // const typeTituloAlterado = "Novo item inserido";
    const typeTarefa = " Alterado!!";
    cy.get(".button-alterar").click();

    const typeTitulo = " Alterado";

    cy.get(".input-titulo").type(typeTitulo);

    cy.get(".input-prioridade").type(typePrioridade);

    cy.get(".textarea-tarefa").type(typeTarefa);

    cy.get(".botao-enviar").click();
  });
  it("Remover o card", () => {
    cy.get(".button-excluir").click();
  });
});
