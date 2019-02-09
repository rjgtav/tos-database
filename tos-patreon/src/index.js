const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const sharedVariables = require("../../variables");
const url = require('url');

// Add timestamp to logs
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss');

(async () => {
    try {
        // Get access token
        console.log('Get access token');
        let token = await patreonAccessToken();

        // Get members per tier
        console.log('Get members tier');
        let campaigns = await patreonCampaigns(token);
        let members = await patreonCampaignMembers(campaigns[0], token)
        let membersPerTier = members.reduce((accumulator, member) => {
            let tier = accumulator[member.tier] = accumulator[member.tier] || [];
                tier.push("'" + member.name + "'");

            return accumulator;
        }, {});

        // Update patreon component
        console.log('Update patreon component');
        let patreonPath = path.join('..', 'web', 'src', 'app', 'home', 'patreon', 'patreon.service.ts');
        let patreon = fs.readFileSync(patreonPath, 'utf8') + '';

        for (let tier in membersPerTier) {
            console.log(`[${ tier }] ${ membersPerTier[tier] }`);
            patreon = patreon.replace(new RegExp(`(\\[.*\\]); \\/\\* ${ tier }-needle \\*\\/`), (match, p1) => match.replace(p1, '[' + membersPerTier[tier].sort().join(',') + ']'));
        }

        fs.writeFileSync(patreonPath, patreon);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

//----------------------------------------------------------------------------------------------------------------------

async function patreonAccessToken() {
    let headers = { 'Authorization': 'Bearer ' + sharedVariables.PATREON_CREATOR_ACCESS_TOKEN };

    return fetch('https://www.patreon.com/api/oauth2/v2/identity', { method: 'GET', headers })
        .then((response) => response.status === 200
            ? sharedVariables.PATREON_CREATOR_ACCESS_TOKEN
            : patreonAccessTokenRefresh()
        );
}
async function patreonAccessTokenRefresh() {
    let params = new url.URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', sharedVariables.PATREON_CREATOR_REFRESH_TOKEN);
        params.append('client_id', sharedVariables.PATREON_CLIENT_ID);
        params.append('client_secret', sharedVariables.PATREON_CLIENT_SECRET);

    let response = await fetch('https://www.patreon.com/api/oauth2/token', { method: 'POST', body: params });
        response = await response.json();

    let accessToken = response.access_token;
    let refreshToken = response.refresh_token;

    // As Patreon immediately destroys the current refresh token, we need to store the new one
    let variablesPath = path.join('..', 'variables.js');
    let variables = fs.readFileSync(variablesPath, 'utf8') + '';
        variables = variables.replace(/exports\.PATREON_CREATOR_ACCESS_TOKEN = '(.*)';/g, (match, p1) => match.replace(p1, accessToken));
        variables = variables.replace(/exports\.PATREON_CREATOR_REFRESH_TOKEN = '(.*)';/g, (match, p1) => match.replace(p1, refreshToken));

    fs.writeFileSync(variablesPath, variables);

    return accessToken;
}

// Small script to collect rjgtav's patrons list and put them on a special thank you page
// https://tos.guru/assets/favicon.png
// https://tos.guru:8080/oauth/patreon

async function patreonCampaigns(token) {
    let headers = { 'Authorization': 'Bearer ' + token };
    let response = await fetch('https://www.patreon.com/api/oauth2/v2/campaigns', { method: 'GET', headers });
        response = await response.json();

    return response.data;
}
async function patreonCampaignMembers(campaign, token) {
    let headers = { 'Authorization': 'Bearer ' + token };
    let fields = patreonUrlEncode('fields[member]=full_name&fields[tier]=amount_cents');
    let response = await fetch('https://www.patreon.com/api/oauth2/v2/campaigns/' + campaign.id + '/members?include=currently_entitled_tiers&' + fields, { method: 'GET', headers });
        response = await response.json();

    let tiers = response.included
        .filter(tier => tier.type === 'tier')
        .map(tier => ({ id: tier.id, cents: tier.attributes.amount_cents }));

    let members = response.data
        .filter(member => member.relationships.currently_entitled_tiers.data.length)
        .map(member => ({ name: member.attributes.full_name, tier: tiers.find((tier) => tier.id === member.relationships.currently_entitled_tiers.data[0].id) }))
        .map(member => ({ name: member.name, tier: member.tier && member.tier.cents }));

    return members;
}

function patreonUrlEncode(url) {
    return url
        .replace(/\[/g, '%5B')
        .replace(/\]/g, '%5D');
}