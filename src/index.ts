import "./components/header/index";
import "./components/text/index";
import "./components/todo-item/index";
import { initHomePage } from "./components/page";
import { status } from "./status";
(function () {
  status.init();
  const root = document.querySelector(".root");
  const header = document.createElement("custom-header");
  root.appendChild(header);
  initHomePage(root);
})();
