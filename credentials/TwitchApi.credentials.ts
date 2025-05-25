import {
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
}
