export default class AveComp extends HTMLElement {
  mode = "closed"; // open|closed
  state = {};
  #rendered = false;
  #renderInex = 0;

  constructor() {
    super();
    this.state = {};

    this.stage = this.attachShadow({ mode: "closed" });
  }

  getClassName() {
    return this.constructor.name;
  }

  setState(newStateElement, cb) {
    const newState = {
      ...this.state,
      ...newStateElement
    };
    if (JSON.stringify(newState) !== JSON.stringify(this.state)) {
      this.state = newState;
      this.render();
    }

    if (cb !== undefined) {
      cb();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute(name) && oldValue !== newValue) {
      this.setState({ [name]: newValue });
    }
  }

  connectedCallback() {
    if (this.#rendered === false) {
      console.log("connected");
      this.render();
    }
  }

  // disconnectedCallback() { ... }

  events() {
    // class method
  }

  onClick(selector, cb) {
    const btn = this.stage.querySelector(selector);
    if (btn !== null) {
      btn.addEventListener("click", (e) => cb(e));
    }
  }

  static get observedAttributes() {
    const error =
      "Abstract Method has no implementation: static get observeredAttributes";
    console.error(error);
    throw new Error(error);
  }

  // get style() {
  //   return `
  //     <style>
  //       :host{
  //         display: block;
  //       }
  //     </style>
  //   `;
  // }

  render(html) {
    ++this.#renderInex;
    console.log("render log index:" + this.#renderInex, this.state);
    this.stage.innerHTML = html;
    // const template = document.createElement("template");
    // template.innerHTML = html;
    // this.stage.innerHTML = "";
    // this.stage.appendChild(template.content);
    this.#rendered = true;
    this.events();
  }
}
// customElements.define("user-list", UserList);
