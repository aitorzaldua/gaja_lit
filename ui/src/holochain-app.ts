import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AppWebsocket } from '@holochain/conductor-api';

//Header
@customElement("header-navi")
export class HeaderNavi extends LitElement{
    render() {
        return html`
        <p class="app-header">
        Welcome to Gaja
        </p>
        `;
    }

    static styles = css`

    .app-header {
      font-size: calc(12px + 0.5vmin);
      display: flex;
      justify-content: center;
      color: green;
      padding-bottom: 20px;
    }

  `;

}

//Body
@customElement('holochain-app')
export class HolochainApp extends LitElement {
  @state() postHash: string | undefined;

  async firstUpdated() {
    const appWebsocket = await AppWebsocket.connect(
      `ws://localhost:${process.env.HC_PORT}`
    );

    const appInfo = await appWebsocket.appInfo({
      installed_app_id: 'gaja_lit',
    });

    const cellData = appInfo.cell_data[0];

    this.postHash = await appWebsocket.callZome({
      cap: null as any,
      cell_id: cellData.cell_id,
      zome_name: 'zome_001',
      fn_name: 'create_post',
      payload: 'my post',
      provenance: cellData.cell_id[1],
    });
  }
  

  render() {
    return html`
      <main>
      ${this.postHash
        ? html`<span
            >Created new Holochain entry! 
            Post with this hash: ${this.postHash}</span
          >`
        : html`<span>Creating...</span>`}       
      </main>
      
    `;
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-element-background-color);
      padding-top: 60px;
    }

    main {
      flex-grow: 1;
    }
  `;
}

//Footer
@customElement("footer-message")
export class FooterMessage extends LitElement{
    render() {
        return html`
        <p class="app-footer">
        Made with love by
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://draftdigital.org"
            >draft digital</a
          >.
        </p>
        `;
    }
  
    static styles = css`

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      display: flex;
      justify-content: center;
      color: green;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

}
