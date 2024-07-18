import cron from 'node-cron';
import axios from 'axios';

// URL of the website to check
const url = 'https://chess-backend-2.onrender.com/';

// Function to check if the website is up
export const checkWebsite = async () => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log(`${new Date().toISOString()}: Website is up`);
    } else {
      console.error(`${new Date().toISOString()}: Website is down with status ${response.status}`);
    }
  } catch (error) {
    console.error(`${new Date().toISOString()}: Website is down with error ${error}`);
  }
};

// Schedule the task to run every 14 minutes
cron.schedule('*/14 * * * *', checkWebsite);

console.log('Cron job started, checking website every 14 minutes');
