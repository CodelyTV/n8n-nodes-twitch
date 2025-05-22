import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TwitchApi implements ICredentialType {
	name = 'twitchApi';
	displayName = 'Twitch API';
	documentationUrl = 'https://dev.twitch.tv/docs/authentication/';
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
