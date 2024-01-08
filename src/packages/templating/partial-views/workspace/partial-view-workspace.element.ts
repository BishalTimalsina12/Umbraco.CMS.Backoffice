import { UmbPartialViewWorkspaceContext } from './partial-view-workspace.context.js';
import { UmbPartialViewWorkspaceEditElement } from './partial-view-workspace-edit.element.js';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { css, html, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { UmbRoute, IRoutingInfo, PageComponent } from '@umbraco-cms/backoffice/router';
import { UmbWorkspaceIsNewRedirectController } from '@umbraco-cms/backoffice/workspace';

import '../../components/insert-menu/templating-insert-menu.element.js';

@customElement('umb-partial-view-workspace')
export class UmbPartialViewWorkspaceElement extends UmbLitElement {
	#workspaceContext = new UmbPartialViewWorkspaceContext(this);

	#createElement = () => new UmbPartialViewWorkspaceEditElement();

	@state()
	_routes: UmbRoute[] = [
		{
			path: 'create/:parentUnique/:snippetName',
			component: this.#createElement,
			setup: async (component: PageComponent, info: IRoutingInfo) => {
				const parentUnique = info.match.params.parentUnique === 'null' ? null : info.match.params.parentUnique;
				const snippetName = info.match.params.snippetName;
				await this.#workspaceContext.create(parentUnique, snippetName);

				new UmbWorkspaceIsNewRedirectController(
					this,
					this.#workspaceContext,
					this.shadowRoot!.querySelector('umb-router-slot')!,
				);
			},
		},
		{
			path: 'edit/:unique',
			component: this.#createElement,
			setup: (component: PageComponent, info: IRoutingInfo) => {
				const unique = info.match.params.unique;
				this.#workspaceContext.load(unique);
			},
		},
	];

	render() {
		return html`<umb-router-slot .routes=${this._routes}></umb-router-slot>`;
	}

	static styles = [UmbTextStyles, css``];
}

export default UmbPartialViewWorkspaceElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-partial-view-workspace': UmbPartialViewWorkspaceElement;
	}
}
