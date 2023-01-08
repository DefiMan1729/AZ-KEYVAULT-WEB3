var KeyVault = require('azure-keyvault');
var AuthenticationContext = require('adal-node').AuthenticationContext;
var Accounts = require('web3-eth-accounts');
var Web3 = require('web3');
require("dotenv").config();

var web3 = new Web3('http://localhost:1945');


var clientId = process.env.clientId;
var clientSecret = process.env.clientSecret;
var vaultUri = process.env.vaultUri;

// Authenticator - retrieves the access token
var authenticator = function(challenge, callback) {

    // Create a new authentication context.
    var context = new AuthenticationContext(challenge.authorization);

    // Use the context to acquire an authentication token.
    return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, function(err, tokenResponse) {
        if (err) throw err;
        // Calculate the value to be set in the request's Authorization header and resume the call.
        var authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;

        return callback(null, authorizationValue);
    });

};

var credentials = new KeyVault.KeyVaultCredentials(authenticator);
var client = new KeyVault.KeyVaultClient(credentials);

let secretName = 'Manager'
secretVersion = '' //leave this blank to get the latest version;
client.getSecret(vaultUri, secretName, secretVersion).then((result) => {
    console.log(result);
})