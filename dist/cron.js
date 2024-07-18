"use strict";
// Cron job to hit endpoint every 14 sec to keep backend alive always
const cron = require('cron');
const https = require('https');
const backendUrl = 'https://chess-backend-2.onrender.com';
const job = new cron.CronJob('*/14 * * * *', function () {
    // This function will be executed every 14 minutes.
    console.log('Restarting server');
    // Perform an HTTPS GET request to hit any backend api.
    https.get(backendUrl, (res) => {
        if (res.statusCode === 200) {
            console.log('Server restarted');
        }
        else {
            console.error(`Failed to restart server with status code: ${res.statusCode}`);
        }
    });
});
module.exports = {
    job,
};
