import { BaseComponent } from "../BaseComponents";
import { html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sidebar-navi")
export class SidebarNavi extends BaseComponent{
    render() {
        return html`
        <h1>Hi lit Component</h1>
        `;
    }

}