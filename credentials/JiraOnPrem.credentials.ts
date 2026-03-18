import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class JiraOnPrem implements ICredentialType {
	name = 'JiraOnPrem';
	displayName = 'Jira On-prem API Credential';

	documentationUrl = 'https://developer.atlassian.com/server/jira/platform/rest-apis/';

	properties: INodeProperties[] = [
		{
			displayName: 'Jira Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://rb-tracker.bosch.com/',
			required: true,
		},
		{
			displayName: 'Personal Access Token',
			name: 'patToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Jira Personal Access Token',
		},
	];
}