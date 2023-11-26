import { Client, Databases, Account, ID, Storage } from 'appwrite';

const client = new Client();
client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject('655f7dc765e9d70fd799'); // Replace with your project ID
export const storage = new Storage(client);
export const account = new Account(client);
export const databases = new Databases(client);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
export { ID, Query } from 'appwrite';
=======
=======
>>>>>>> Stashed changes
export { ID } from 'appwrite';
>>>>>>> Stashed changes
