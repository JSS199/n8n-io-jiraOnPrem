import { INodeProperties } from 'n8n-workflow';

export const issueOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['issue'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a Jira issue',
				action: 'Get issue',
			},
		],
		default: 'get',
	},
];

export const issueFields: INodeProperties[] = [
	{
		displayName: 'Issue Key',
		name: 'issueKey',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['issue'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Example: PROJ-123',
	},
];