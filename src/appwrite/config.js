**Folder Name:** Appwrite

**File Name:** service.js

**Line by Line Documented Code:**
```js
// Importing the conf file for appwrite configuration
import conf from '../conf/conf.js';

// Importing the Appwrite client, ID, Databases, Storage and Query modules
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Defining the Service class
export class Service {
    // Creating a new Appwrite Client instance using the configuration in the conf file
    client = new Client();
    // Creating a new Databases instance
    database;
    // Creating a new Storage instance
    bucket;

    // Constructor to initialize the Appwrite Client and set the project and endpoint
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        // Initializing the Databases instance
        this.database = new Databases(this.client);
        // Initializing the Storage instance
        this.bucket = new Storage(this.client);
    }

    // Function to create a new post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            // Creating a new document in the posts collection using the given data
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            // Logging any errors that occur during the createPost function
            console.log("appwrite service :: createPost :: error", error);
        }
    }

    // Function to update a post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            // Updating the document in the posts collection using the given data
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            // Logging any errors that occur during the updatePost function
            console.log("appwrite service :: updatePost :: error", error);
        }
    }

    // Function to delete a post
    async deletePost(slug) {
        try {
            // Deleting the document from the posts collection using the given slug
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            // Returning true if the post was deleted successfully
            return true
        } catch (error) {
            // Logging any errors that occur during the deletePost function
            console.log("appwrite service :: deletePost :: error", error);
            // Returning false if the post was not deleted successfully
            return false
        }
    }

    // Function to get a post by its slug
    async getPost(slug) {
        try {
            // Getting the document from the posts collection using the given slug
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            // Returning true if the post was found
            return true
        } catch (error) {
            // Logging any errors that occur during the getPost function
            console.log("appwrite service :: getPost :: error", error);
            // Returning false if the post was not found
            return false
        }
    }

    // Function to get all posts
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            // Getting all documents from the posts collection using the given queries
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            // Logging any errors that occur during the getPosts function
            console.log("appwrite service :: getPosts :: error", error);
            // Returning false if no posts were found
            return false
        }
    }

    // Function to upload a file
    async uploadFile(file) {
        try {
            // Creating a new file in the bucket using the given file
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(), // Generating a unique ID for the file
                file,
            )
        } catch (error) {
            // Logging any errors that occur during the uploadFile function
            console.log("appwrite service :: uploadFile :: error", error);
            // Returning false if the file was not uploaded successfully
            return false
        }
    }

    // Function to delete a file
    async deleteFile(fileId) {
        try {
            // Deleting the file from the bucket using the given file ID
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            // Returning true if the file was deleted successfully
            return true
        } catch (error) {
            // Logging any errors that occur during the deleteFile function
            console.log("appwrite service :: deleteFile :: error", error);
            // Returning false if the file was not deleted successfully
            return false
        }
    }

    // Function to get a preview of a file
    getFilePreview(fileId) {
        try {
            // Getting a preview of the file from the bucket using the given file ID
            const res = this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
            // Returning the preview of the file
            return res;
        } catch (error) {
            // Logging any errors that occur during the getFilePreview function
            console.log("appwrite service :: getFilePreview :: error", error);
            // Returning false if the file preview could not be retrieved
            return false
        }
    }
}

// Creating a new instance of the Service class and exporting it as default
const service = new Service();
export default service
```