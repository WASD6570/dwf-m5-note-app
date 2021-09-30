class HeaderComponent extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
    this.connectedCallback();
  }
  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = `
    .header{
      background-color: #FF8282;
      width: 100%;
      height: 60px;
    }
    `;
    this.shadow.appendChild(style);
  }
  render() {
    const header = document.createElement("header");
    header.setAttribute("class", "header");
    this.shadow.appendChild(header);
  }
}

customElements.define("custom-header", HeaderComponent);
