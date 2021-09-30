import { status } from "../../status";

export function initHomePage(containerEl: Element) {
  const div = document.createElement("div");
  div.setAttribute("class", "container");
  const listContainer = document.createElement("div");
  listContainer.setAttribute("class", "task-container");
  const style = document.createElement("style");
  style.innerHTML = `
    ul.task-list {
      width: 311px;
      height: 112px;
      padding-inline-start: 0px;
    }

    @media(min-width:769px) {
      ul.task-list{
        width: 90%;
      }
    }

    .task-container {
      padding-bottom: 10px;
    }


    @media(min-width:769px) {
      .task-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
      }
    }

    div.container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1.main-title{
      font-family: Roboto, sans-serif;
      font-weight: 700;
      display: flex;
      flex-direction: column;
      text-align: left;
      font-size: 52px;
      margin-left: -52px
    }

    @media(min-width:769px) {
      h1.main-title{
        display: flex;
        flex-direction: row;
        text-align: left;
        font-size: 52px;
      }
    }

    .form{
      display: flex;
      flex-direction: column;
      width: 311px;
    }

    @media(min-width:769px) {
      .form{
        display: flex;
        flex-direction: row;
        width: 80vw;
      }
    }

    @media(min-width:769px) {
      .form-container{
        display: flex;
        flex-direction: row;
        width: 80vw;
      }
    }

    .form > span{
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: 18px;
    }

    .button{
      font-family: Roboto, sans-serif;
      font-weight: 500;
      font-size: 22px;
      width: 100%;
      height: 55px;
      background-color: #9CBBE9;
      margin-top: 12px;
      border-radius: 4px;
    }

    @media(min-width:769px) {
      .button{
        width: 312px;
        margin-top: 6px;
        margin-left: 22px;
      }
    }

    .todo{
      width: 100%;
      height: 55px;
      border-radius: 4px;
      margin-top: 6px;
    }

    @media(min-width:769px) {
      .todo{
        width: 100%;
      }
  `;
  div.innerHTML = `
  <h1 class="main-title">Mis&nbsp<span>Pendientes</span></h1>
  <div class="form">
  <span>Nuevo pendiente</span>
  <div class="form-container"></div>
  </div>
  <ul class="task-list">
  </ul>
  `;

  const input = document.createElement("input");
  input.setAttribute("class", "todo");
  input.setAttribute("name", "todo");
  input.setAttribute("type", "text");

  const button = document.createElement("button");
  button.setAttribute("class", "button");
  button.setAttribute("type", "button");
  button.textContent = "add To Do";
  button.addEventListener("click", () => {
    status.addTask(Math.random(), input.value);
    input.value = "";
  });

  containerEl.appendChild(div);
  document.querySelector(".task-list").appendChild(listContainer);
  document.querySelector(".form-container").appendChild(input);
  document.querySelector(".form-container").appendChild(button);
  div.appendChild(style);

  status.subscribe(() => {
    createTask(status.getStatus().tasks);
  });

  createTask(status.getStatus().tasks);

  function createTask(tasks) {
    listContainer.innerHTML = "";
    for (const t of tasks) {
      const todoItemEl = document.createElement("todo-item");
      todoItemEl.setAttribute("title", t.title);
      todoItemEl.setAttribute("checked", t.completed);
      todoItemEl.setAttribute("id", t.id);
      todoItemEl.addEventListener("change", (e: any) => {
        status.updateStatus(e.detail.id, e.detail.value);
      });
      todoItemEl.addEventListener("delete", (e: any) => {
        status.deleteItem(e.detail.id, e.detail.value);
      });
      if (t.deleted !== true) {
        listContainer.appendChild(todoItemEl);
      }
    }
  }
}
