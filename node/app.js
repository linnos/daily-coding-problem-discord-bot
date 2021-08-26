const express = require('express');

const app = express();

app.get('/', function(req, res){
    res.send('Hello World');
});

// app.get('/wherearewegoing', function(req, res){
//     res.send('To The Mines!');
// });

app.listen(80, function(){
    console.log("Server started on port 80...");
})


// Base64 encoded string
// const base64 = 'SGV5IHRoZXJlLA0KDQpBIG5ldyB1c2VyIGp1c3QgYXNrZWQgZm9yIHRoZSBiYWNrIHN0b3J5IGJlaGluZCBEYWlseSBDb2RpbmcgUHJvYmxlbSwgc28gSQ0KdGhvdWdodCBJIHdvdWxkIHNoYXJlIGl0IHdpdGggeW91IGFzIHdlbGwuDQoNCkEgd2hpbGUgYmFjaywgbXkgZnJpZW5kcyB3ZXJlIHByYWN0aWNpbmcgZm9yIGNvZGluZyBpbnRlcnZpZXdzLCBhbmQgSSBzdGFydGVkIGENCmdyb3VwIGNoYXQgd2hlcmUgd2UgdHJpZWQgdG8gc29sdmUgYSBjb2RpbmcgcHJvYmxlbSBldmVyeSBkYXkuDQoNCkl0IHdvcmtlZCBpbnNhbmVseSB3ZWxsIOKAlCBhbGwgb2YgdGhlbSBnb3Qgb2ZmZXJzIGZyb20gdG9wIHRlY2ggY29tcGFuaWVzIGFuZA0Kc3RhcnR1cHMuDQoNCkZhc3QgZm9yd2FyZCwgSSBzdGFydGVkIERhaWx5IENvZGluZyBQcm9ibGVtIHdpdGggYSBidWRkeS4gVGhlIG9yaWdpbmFsIHdlYnNpdGUNCndhcyByaWRpY3Vsb3VzbHkgaGlkZW91czoNCg0KW2h0dHBzOi8vd3d3LmRhaWx5Y29kaW5ncHJvYmxlbS5jb20vc3RhdGljL29sZF9sYW5kaW5nX3BhZ2UuanBnXQ0KDQpEYWlseSBDb2RpbmcgUHJvYmxlbSBpcyBsaWtlIHRoYXQgZ3JvdXAgY2hhdCwgdHJ5aW5nIHRvIHNvbHZlIGEgY29kaW5nIGludGVydmlldw0KcXVlc3Rpb24gdG9nZXRoZXIuIFdoYXQgSSBsb3ZlIGlzIHRoYXQgd2l0aCBjb25zaXN0ZW50IHByYWN0aWNlLCB5b3UgZ2V0IG11Y2gNCmZhc3RlciBhbmQgYmV0dGVyIGF0IGNvbWluZyB1cCB3aXRoIHNvbHV0aW9ucy4NCg0KV2UndmUgZm91bmQgdGhhdCB3b3JraW5nIG9uIHRoZSBzYW1lIHByb2JsZW1zIHdpdGggeW91ciBmcmllbmRzIGhlbHBzIGEgbG90IHdpdGgNCm1vdGl2YXRpb24uIEp1c3Qgc2VuZCB0aGVtIHRoaXMgbGluayDigJQgaHR0cHM6Ly93d3cuZGFpbHljb2Rpbmdwcm9ibGVtLmNvbQ0KW2h0dHBzOi8vd3d3LmRhaWx5Y29kaW5ncHJvYmxlbS5jb21dIOKAlCBhbmQgdGVsbCB0aGVtIHRvIHN1YnNjcmliZS4gV2l0aCBkYWlseQ0KcHJhY3RpY2UsIEnigJltIHN1cmUgeW914oCZbGwgbGFuZCB0aGF0IGRyZWFtIGpvYiBvZmZlci4gR29vZCBsdWNrIGFuZCBoYXBweQ0Kc3R1ZHlpbmchDQoNCk1hcmMNCg0KRm91bmRlcg==';

// // create a buffer
// const buff = Buffer.from(base64, 'base64');

// // decode buffer as UTF-8
// const str = buff.toString('utf-8');

// // print normal string
// console.log(str);

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://mail.google.com/'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('gmailcredentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listLabels);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  query = 'founders@dailycodingproblem.com';
  return new Promise((resolve, reject) => {    
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list(      
      {        
        userId: 'me',  
        q:query,      
        maxResults:5     
      },            (err, res) => {        
        if (err) {
          reject(err);          
          return;        
        }        
        if (!res.data.messages) {
          resolve([]);          
          return;        
        }

        resolve(res.data);
        getMail(res.data.messages[0].id, auth);
      }    
    );  
  })
}


function getMail(msgId, auth){
  // console.log(msgId)
  const gmail = google.gmail({version: 'v1', auth});
  //This api call will fetch the mailbody.
  gmail.users.messages.get({
      userId:'me',
      id: msgId ,
  }, (err, res) => {
      // console.log(res.data.payload.parts)

      if(!err){
        const base64 = res.data.payload.parts[0].body.data;

        // create a buffer
        const buff = Buffer.from(base64, 'base64');

        // decode buffer as UTF-8
        const str = buff.toString('utf-8');

        // print normal string
        console.log(str.split("--------------------------------------------------------------------------------")[0]);
      }
  });
}