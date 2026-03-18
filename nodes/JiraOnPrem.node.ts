import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';

import { jiraApiRequest } from './GenericFunctions';
import { issueFields, issueOperations } from './IssueDescription';

export class JiraOnPrem implements INodeType {
	
	description: INodeTypeDescription = {
		displayName: 'Jira On-prem',
		name: 'JiraOnPrem',
		icon: 'file:../../icons/jira.svg',
		group: ['transform'],
		version: 1,
		description: 'Interact with Jira on-prem APIs',
		defaults: {
			name: 'JiraOnPrem',
		},

		inputs: ['main'],
		outputs: ['main'],

		credentials: [
			{
				name: 'JiraOnPrem',
				required: true,
			},
		],

		properties: [

			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Issue',
						value: 'issue',
					},
				],
				default: 'issue',
			},

			...issueOperations,
			...issueFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {

			const resource = this.getNodeParameter('resource', i);
			const operation = this.getNodeParameter('operation', i);

			try {

				if (resource === 'issue') {

					if (operation === 'get') {

						const issueKey = this.getNodeParameter('issueKey', i);

						const response = await jiraApiRequest.call(
							this,
							'GET',
							`/issue/${issueKey}`,
						);

						returnData.push({
							json: response,
						});

					}

				}

			} catch (error) {

				throw new NodeApiError(this.getNode(), error);

			}
		}

		return [returnData];
	}
}