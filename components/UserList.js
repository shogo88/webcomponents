import AveComp from "./AveComp.js";
import {} from "./UserEditForm.js";

class UserList extends AveComp {
  constructor() {
    super();
    this.state = {
      items: ["a", "b", "c", "d"]
    };
  }

  static get observedAttributes() {
    return ["filter", "ord"];
  }

  events() {
    this.onClick("#add_btn", (e) => this.addEventClickHandler());
    this.onClick("#close_btn", (e) => this.closeEventClickHandler());
  }

  addEventClickHandler() {
    this.setState({ showUserForm: true });
  }

  closeEventClickHandler() {
    this.setState({ showUserForm: false });
  }

  renderUserForm() {
    const { showUserForm } = this.state;
    if (!showUserForm) {
      return "";
    }
    return `
      <h4>User form</h4>
      <user-form user_id="0"></user-form>
    `;
  }

  renderList() {
    const { items } = this.state;
    return `
      <ul>
      ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }

  // get style() {
  //   // FIXME: szeritnem template kell hozzá
  //   return `
  //     <style>
  //       :host{
  //         display: block;
  //       }
  //       .my-list{
  //         display:block;
  //         background: red;
  //       }
  //     </style>
  //   `;
  // }

  render() {
    const { filter, showUserForm, ord } = this.state;
    super.render(`
    <div class="my-list>
      <p>Hello list</p>
      <code>
        filter:<span class="filter">${filter}</span>
        order: ${ord}
      </code>
      ${this.renderList()}
      <br />
      id slot test:<span slot="filter">${filter}</span>
      ${this.renderUserForm()}
      <br />
      <br />
      <br />
      ${
        showUserForm
          ? '<button id="close_btn">Close</button>'
          : '<button id="add_btn">Add new</button>'
      }
    </div>
    `);
  }
}
customElements.define("user-list", UserList);
