"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWebsite = void 0;
const cron_1 = require("cron");
const axios_1 = __importDefault(require("axios"));
// URL of the website to check
const url = 'https://chess-backend-2.onrender.com';
// Function to check if the website is up
const checkWebsite = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url);
        if (response.status === 200) {
            console.log(`${new Date().toISOString()}: Website is up`);
        }
        else {
            console.error(`${new Date().toISOString()}: Website is down with status ${response.status}`);
        }
    }
    catch (error) {
        console.error(`${new Date().toISOString()}: Website is down with error ${error}`);
    }
});
exports.checkWebsite = checkWebsite;
// Schedule the task to run every 14 minutes
const job = new cron_1.CronJob('*/14 * * * *', exports.checkWebsite);
// Start the cron job
job.start();
console.log('Cron job started, checking website every 14 minutes');
