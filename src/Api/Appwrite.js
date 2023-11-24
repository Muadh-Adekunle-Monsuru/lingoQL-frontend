import { Client, Databases, Account, ID } from 'appwrite';

const client = new Client();
client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject('655f7dc765e9d70fd799'); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';
