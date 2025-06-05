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
                    {
                        name: 'Get Game Details',
                        value: 'getGameDetails',
                        action: 'Get game details',
                    },
                    {
                        name: 'Get Top Games',
                        value: 'getTopGames',
                        action: 'Get top games',
                    },
                    {
                        name: 'Search Categories',
                        value: 'searchCategories',
                        action: 'Search categories',
                    },
                    {
                        name: 'Search Channels',
                        value: 'searchChannels',
                        action: 'Search channels',
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
                displayOptions: {
                    show: {
                        operation: ['getChannelStreams'],
                    },
                },
            },
            {
                displayName: 'Query',
                name: 'query',
                type: 'string',
                required: true,
                default: '',
                description: 'Search query',
                displayOptions: {
                    show: {
                        operation: ['searchChannels', 'searchCategories'],
                    },
                },
            },
            {
                displayName: 'Game Name',
                name: 'game_name',
                type: 'string',
                required: true,
                default: '',
                description: 'Name of the game',
                displayOptions: {
                    show: {
                        operation: ['getGameDetails'],
                    },
                },
            },
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                typeOptions: { minValue: 1 },
                default: 50,
                description: 'Max number of results to return',
                displayOptions: {
                    show: {
                        operation: ['getTopGames'],
                    },
                },
            },
        ],
    };

    async execute(this: IExecuteFunctions) {
        const items = this.getInputData();
        const returnData: IDataObject[] = [];

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;

            if (operation === 'getChannelStreams') {
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

            if (operation === 'searchChannels') {
                const query = this.getNodeParameter('query', i) as string;
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/search/channels',
                    {},
                    { query },
                );
                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'searchCategories') {
                const query = this.getNodeParameter('query', i) as string;
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/search/categories',
                    {},
                    { query },
                );
                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getGameDetails') {
                const gameName = this.getNodeParameter('game_name', i) as string;
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/games',
                    {},
                    { name: gameName },
                );
                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getTopGames') {
                const limit = this.getNodeParameter('limit', i) as number;
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/games/top',
                    {},
                    { first: limit },
                );
                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}
