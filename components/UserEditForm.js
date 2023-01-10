export default class UserEditForm extends HTMLElement {
  constructor() {
    super();
    this.stage = {};

    this.attachShadow({ mode: "open" });
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("changed", name, newValue);
    switch (name) {
      case "user_id":
        this.stage.userId = newValue;
        // this.querySelector(".user_id").innerText = newValue;
        break;
      default:
    }
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = "hello form form id:" + this.stage.userId;
  }

  static get observedAttributes() {
    return ["user_id"];
  }
}
customElements.define("user-form", UserEditForm);
