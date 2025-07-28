import {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TwitchApi implements ICredentialType {
	name = 'twitchApi';
	displayName = 'Twitch API';
	documentationUrl = 'https://github.com/CodelyTV/n8n-nodes-twitch?tab=readme-ov-file#-how-to-get-twitch-credentials';
	properties: INodeProperties[] = [
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://id.twitch.tv',
			url: '/oauth2/token',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			qs: {
				client_id: '={{$credentials.clientId}}',
				client_secret: '={{$credentials.clientSecret}}',
				grant_type: 'client_credentials',
			},
		},
	};
}
