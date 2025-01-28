# APPWRITE
Documentation 

[< Documentation](./README.md)  

### Overview of Additions and Updates

This implementation sets up **AppWrite**, a backend-as-a-service platform, to manage the backend for the **Kround Application**, a social media app. The setup includes configuring the project on AppWrite, creating a database and collections, defining attributes, permissions, and indexes, as well as integrating AppWrite with the Next.js application via an environment file and a client library.

---

### **1. AppWrite Project Setup**
- **Project Name**: "Kround Application"
- **Deployment Region**: Frankfurt, Germany (optimized for users in that region).
- **Platform**: Web (targeting a browser-based app with `localhost` as the hostname during development).

---

### **2. Database Configuration**

#### **Database Name**: `Kround`  
- A database to store and manage app data, with collections tailored for specific use cases in the application.

---

#### **a. `Profile` Collection**
**Purpose**: To store user profile data (e.g., avatar, bio, name).

##### **Attributes**
- `image` (required): Stores the URL of the user's profile picture.
- `bio` (optional): A short bio describing the user.
- `user_id` (optional): A unique identifier linking the profile to a user.
- `name` (required): The user's full name.

##### **Indexes**
- `user_id`: A **Key** index for quick lookups by `user_id`.
- `name`: A **FullText** index for searching users by name.

##### **Permissions**
- **Any**: Can read profiles publicly (e.g., for viewing others' profiles).
- **All Users**: Can create, read, update, and delete their profiles.

---

#### **b. `Like` Collection**
**Purpose**: To track likes for posts by users.

##### **Attributes**
- `user_id` (required): ID of the user who liked a post.
- `post_id` (required): ID of the post that is liked.

##### **Indexes**
- `user_id`: A **Key** index for finding all likes by a user.
- `$id`: A **Unique** index to prevent duplicate entries for the same like.
- `post_id`: A **Key** index for querying all likes for a specific post.

##### **Permissions**
- **Any**: Can read likes (e.g., like count is public).
- **All Users**: Can create, read, update, and delete their likes.

---

#### **c. `Post` Collection**
**Purpose**: To store data for user-created posts.

##### **Attributes**
- `user_id` (required): ID of the user who created the post.
- `video_url` (required): URL of the video in the post.
- `text` (required): Text content of the post.
- `created_at` (required): Timestamp when the post was created.

##### **Indexes**
- `user_id`: A **Key** index for querying all posts by a user.

##### **Permissions**
- **Any**: Can read posts publicly.
- **All Users**: Can create, read, update, and delete their posts.

---

#### **d. `Comment` Collection**
**Purpose**: To store comments on posts.

##### **Attributes**
- `user_id` (required): ID of the user who made the comment.
- `post_id` (required): ID of the post on which the comment was made.
- `text` (required): Text content of the comment.
- `created_at` (required): Timestamp when the comment was created.

##### **Indexes**
- `post_id`: A **Key** index for querying comments for a specific post.

##### **Permissions**
- **Any**: Can read comments publicly.
- **All Users**: Can create, read, update, and delete their comments.

---

### **3. Storage Bucket**
- **Bucket Name**: `kround`.
- **Purpose**: To manage file uploads, such as profile images or post media.
- **Default File**: `placeholder-user.jpg` is a default profile image for newly registered users.
- **Permissions**:
  - Publicly accessible images or restricted to users as needed.

---

### **4. Environment File (`/.env`)**
This file stores configuration variables used in the application to connect with AppWrite. The variables are:

#### **AppWrite API Connection**
- `NEXT_PUBLIC_APPWRITE_URL`: The base URL for AppWrite API.
- `NEXT_PUBLIC_ENDPOINT`: The project ID (`kround`).

#### **Database Identifiers**
- `NEXT_PUBLIC_DATABASE_ID`: Database ID (`kround`).
- `NEXT_PUBLIC_COLLECTION_ID_*`: Collection IDs for `Profile`, `Post`, `Like`, and `Comment`.

#### **Storage Configuration**
- `NEXT_PUBLIC_BUCKET_NAME`: Name of the storage bucket.
- `NEXT_PUBLIC_BUCKET_ID`: ID of the storage bucket.
- `NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID`: File ID of the default user image.

---

### **5. AppWrite Installation**
#### Command:
```bash
npm install appwrite
```
**Purpose**: Adds the AppWrite JavaScript SDK to the project to interact with AppWrite services (e.g., authentication, database, storage).

---

### **6. AppWrite Client (`/libs/AppWriteClient.tsx`)**

This file centralizes the AppWrite configuration for use throughout the app.

#### **Code Explanation**:
1. **Importing AppWrite SDK**:
   - `Account`: To manage user authentication.
   - `Client`: To set up the AppWrite connection.
   - `Databases`: For interacting with collections in the database.
   - `Query`: For filtering or querying database documents.
   - `Storage`: For managing files in the storage bucket.

2. **Setting Up AppWrite Client**:
   ```ts
   const client = new Client()
       .setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_URL))
       .setProject(String(process.env.NEXT_PUBLIC_ENDPOINT));
   ```
   - Initializes the AppWrite client using the endpoint and project ID from the environment file.

3. **Exported Objects**:
   - `account`: For handling user login, logout, and account management.
   - `database`: For CRUD operations on collections.
   - `storage`: For interacting with the storage bucket.
   - `Query` and `ID`: Utility functions for querying documents and generating unique IDs.

---

### **Purpose of Additions and Updates**
These additions set up the backend infrastructure, connect the Next.js frontend with AppWrite, and enable critical app functionalities like:
- User authentication.
- Managing user profiles, posts, likes, and comments.
- File storage for media uploads.

This foundation enables the development of features like a social media feed, user interaction, and account management.