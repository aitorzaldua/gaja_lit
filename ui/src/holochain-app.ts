import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AppWebsocket } from '@holochain/conductor-api';

//Header
@customElement("header-navi")
export class HeaderNavi extends LitElement{
    render() {
        return html`
        <h1>Hi, this is the Header</h1>
        `;
    }

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
        <h1>${this.title}</h1>

        <p>Edit <code>src/holochain-app.ts</code> and save to reload.</p>
        <a
          class="app-link"
          href="https://open-wc.org/guides/developing-components/code-examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code examples
        </a>
      </main>

      ${this.postHash
        ? html`<span
            >Created new Holochain entry! Post with hash: ${this.postHash}</span
          >`
        : html`<span>Creating...</span>`}

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
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
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
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

}
