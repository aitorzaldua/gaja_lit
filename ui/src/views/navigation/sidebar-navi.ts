import { BaseComponent } from "../BaseComponents";
import { html } from "lit";
import { customElements } from "lit/decorators.js";

@customElements("sidebar-navi")
export class SidebarNavi extends BaseComponent{
    render() {
        return html`
        <h1>Hi lit Component</h1>
        `;
    }

}