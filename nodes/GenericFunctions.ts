import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';

export async function jiraApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
) {

	const credentials = await this.getCredentials('JiraOnPrem');

	const baseUrl = credentials.baseUrl as string;
	const patToken = credentials.patToken as string;

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}/rest/api/2${endpoint}`,

		headers: {
			Authorization: `Bearer ${patToken}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	if (Object.keys(body).length) {
		options.body = body;
	}

	if (Object.keys(qs).length) {
		options.qs = qs;
	}

	return await this.helpers.httpRequest(options);
}