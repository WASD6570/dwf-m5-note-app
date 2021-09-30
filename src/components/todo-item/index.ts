class ToDoItem extends HTMLElement {
  shadow: ShadowRoot;
  title: string;
  checked: string;
  id: any;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.title = this.getAttribute("title") || "";
    this.checked = this.getAttribute("checked");
    this.id = this.getAttribute("id");
    this.render();
    const style = document.createElement("style");
    style.innerHTML = `
    .root{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: #FFF599;
      border-radius: 4px;
      margin: 11px 0px;
      width: 311px;
    }
    @media(min-width:769px) {
      .root{
        margin-left: 12px;
      }
    }

    h4{
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      margin-left: 10px;
    }
    h4.checked{
      text-decoration: line-through 2px;
    }
    .container{
      display:flex;
      flex-direction: column;
      align-items: space-between;
      justify-content: space-between;
    }
    .checkbox{
      margin: 12px 10px 12px 19px;
    }
    .button{
      background-color: Transparent;
      border: none;
    }
    .delete{
      margin: 12px 10px 12px 12.9px;
    }
    `;
    this.shadow.appendChild(style);
  }

  checkedChecker() {
    if (this.checked === "true") {
      return "checked";
    } else return "notchecked";
  }
  checkboxListener() {
    const chEl = this.shadow.querySelector(".checkbox");
    chEl.addEventListener("change", (e) => {
      const target = e.target as any;
      const event = new CustomEvent("change", {
        detail: {
          id: this.id,
          value: target.checked,
        },
      });
      this.dispatchEvent(event);
    });
  }
  deleteListener() {
    const deleteEl = this.shadow.querySelector(".button");
    deleteEl.addEventListener("click", () => {
      const event = new CustomEvent("delete", {
        detail: {
          id: this.id,
          value: true,
        },
      });
      this.dispatchEvent(event);
    });
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `
       <h4 class="${this.checkedChecker()}" id="${this.id}">${this.title}</h4>
       <div class="container">
        <input class="checkbox" type="checkbox" ${this.checkedChecker()}>
        <button class="button">
        <img class="delete" width="14px" height="16px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXf359F_vly13w8tonJFxqYYZM7iYNhItnfg&usqp=CAU" />
        </button>
       </div>
    `;
    div.setAttribute("class", "root");
    this.shadow.appendChild(div);
    this.checkboxListener();
    this.deleteListener();
  }
}

customElements.define("todo-item", ToDoItem);
