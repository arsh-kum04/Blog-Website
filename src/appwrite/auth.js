**Folder Name: appwrite**

**File Name: AuthService.js**

```javascript
// Appwrite configuration
import conf from '../conf/conf.js';
// Import Appwrite Client, Account and ID modules
import { Client, Account, ID } from "appwrite";

// AuthService class handles user authentication and management
export class AuthService {

    client; // Appwrite Client object
    account; // Appwrite Account object

    // Constructor initializes the Appwrite Client and Account objects
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Set Appwrite endpoint URL
            .setProject(conf.appwriteProjectId) // Set Appwrite project ID
        this.account = new Account(this.client); // Create new Appwrite Account object
    }

    // Creates a new user account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name); // Create a new user account
            if (userAccount) { // If account creation is successful
                return this.login({ email, password }); // Automatically log in the newly created user
            } else {
                return userAccount // If account creation fails, return the error object
            }
        } catch (error) {
            // console.log("appwrite service :: authenticaion error:: createAccount", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Logs in a user
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password); // Create an email session for the user

        } catch (error) {
            // console.log("appwrite service :: authenticaion error:: login", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Gets the current logged in user
    async getCurrentUser() {
        try {
            return await this.account.get(); // Get the current logged in user
        } catch (error) {
            // console.log("appwrite service :: authenticaion error:: getCurrentuser", error);
            
        }
        return null; // If there is no logged in user, return null
    }

    // Logs out the current user
    async logout() {
        try {
            return await this.account.deleteSessions(); // Delete all user sessions
        } catch (error) {
            // console.log("appwrite service :: authenticaion error:: logout", error);
        }
    }


}

// Create a new instance of the AuthService class
const authService = new AuthService();

// Export the AuthService instance
export default authService
```