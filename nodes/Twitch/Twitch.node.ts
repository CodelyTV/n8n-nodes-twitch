import {
    IDataObject,
    IExecuteFunctions,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import { twitchApiRequest } from './GenericFunctions.js';

export class Twitch implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Twitch',
        name: 'twitch',
        icon: 'file:twitch.svg',
        group: ['transform'],
        version: 1,
        description: 'Interact with Twitch',
        defaults: {
            name: 'Twitch',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'twitchApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                default: 'getChannelStreams',
                options: [
                    {
                        name: 'Get Channel Streams',
                        value: 'getChannelStreams',
                        action: 'Get channel streams',
                    },
                ],
            },
            {
                displayName: 'Channel Name',
                name: 'channel_name',
                type: 'string',
                required: true,
                default: '',
                description: 'Name of the channel whose streams to retrieve',
            },
        ],
    };

    async execute(this: IExecuteFunctions) {
        const items = this.getInputData();
        const returnData: IDataObject[] = [];

        for (let i = 0; i < items.length; i++) {
            const channelName = this.getNodeParameter('channel_name', i) as string;

            const response = await twitchApiRequest.call(
                this,
                'GET',
                '/streams',
                {},
                { user_login: channelName },
            );

            if (Array.isArray(response.data)) {
                returnData.push(...response.data);
            }
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}
