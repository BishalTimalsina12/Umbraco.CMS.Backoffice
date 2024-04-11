import { UMB_DOCUMENT_WORKSPACE_CONTEXT } from '../document-workspace.context-token.js';
import { UmbWorkspaceActionBase } from '@umbraco-cms/backoffice/workspace';

export class UmbDocumentUnpublishWorkspaceAction extends UmbWorkspaceActionBase {
	async execute() {
		const workspaceContext = await this.getContext(UMB_DOCUMENT_WORKSPACE_CONTEXT);
		return workspaceContext.unpublish();
	}
}

export { UmbDocumentUnpublishWorkspaceAction as api };
