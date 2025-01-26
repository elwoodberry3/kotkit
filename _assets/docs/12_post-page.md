# POST PAGE
Documentation 

[< Documentation](./README.md)  

Here’s a breakdown of the additions and updates in your project, explaining the purpose and functionality of each change:

---

### **1. `app/post/[postid]/[userid]/page.tsx`**
- **Purpose**: This file implements the Post Page. It fetches and displays a specific post (based on dynamic route parameters `postid` and `userid`) alongside a comments section, a video player, and user interaction buttons.
- **Key Features**:
  - **Dynamic Route**: Uses `params` to dynamically load the post and user data based on the URL.
  - **Video Display**: Includes a `video` element to show a video from `postById.video_url`.
  - **Navigation Buttons**:
    - Close button navigates to the user's profile page.
    - Chevron buttons (`loopThroughPostUp` and `loopThroughPostDown`) mock post navigation logic.
  - **Responsive Layout**: Divided into a video section and an info/comments section with Tailwind CSS styling.
  - **Integration**: Includes `ClientOnly` for ensuring components dependent on the browser render only on the client side.

---

### **2. `app/types.tsx`**
- **Purpose**: Centralized type definitions for TypeScript to ensure strict typing, maintain consistency, and prevent runtime errors.
- **Updates**:
  - Added or extended interfaces:
    - **`PostPageTypes`**: Defines the structure for passing `params` to the `Post` page.
    - **`PostWithProfile` and `CommentWithProfile`**: Include richer data for posts and comments, including associated user profile information.
    - **`CommentsHeaderCompTypes`, `CommentsCompTypes`, `SingleCommentCompTypes`**: Typed props for components (`CommentsHeader`, `Comments`, and `SingleComment`).

---

### **3. `app/components/posts/CommentsHeader.tsx`**
- **Purpose**: Displays the post's user profile, text, and interaction options (like, delete, etc.).
- **Key Features**:
  - **User Profile**: Links to the user’s profile and displays their name and image.
  - **Post Actions**:
    - Like button toggles a like/unlike state (uses placeholder logic for now).
    - Delete button shows a loader when a post is being deleted (logic for deletion is placeholder).
  - **Styling and Accessibility**:
    - Tailwind CSS for responsive and accessible design.
    - Loading indicators (`BiLoaderCircle`) provide visual feedback for actions.

---

### **4. `app/components/posts/Comments.tsx`**
- **Purpose**: Displays all comments associated with a post and includes an input field for adding a new comment.
- **Key Features**:
  - **Mock Comments**: Uses `commentsByPost` as placeholder data for displaying comments.
  - **Comment Form**:
    - Input field for entering a new comment.
    - Post button becomes active only when a comment is typed.
    - Loader shows when a comment is being posted (logic is placeholder).
  - **Empty State**: Displays a "No Comments..." message if `commentsByPost` is empty.
  - **Integration**: Renders each comment using the `SingleComment` component.

---

### **5. `app/components/posts/SingleComment.tsx`**
- **Purpose**: Represents an individual comment with options to delete.
- **Key Features**:
  - Displays comment text, user details (name, image), and timestamp.
  - Delete Button:
    - Prompts the user with a confirmation dialog before deletion.
    - Shows a loader when the comment is being deleted.
  - **Styling**: Uses Tailwind CSS for layout and responsive design.

---

### **Overall Integration**
- **Dynamic Routing**: The app now supports pages for specific posts (`[postid]/[userid]`), dynamically rendering content based on route parameters.
- **User Interaction**: Functional buttons and loaders simulate like, delete, and navigation actions.
- **Type Safety**: Strong typing ensures safer code and better developer experience.
- **Responsive Design**: Tailwind CSS ensures compatibility across devices.
- **Client-Side Rendering**: Components like `ClientOnly` ensure the app works seamlessly with browser-only features (e.g., video rendering).

---

### **What’s Missing or Placeholder?**
- **API Integration**: Mock data is used for posts and comments. Real data fetching and mutation (e.g., fetching posts from an API or deleting a comment) should replace placeholder logic.
- **State Management**: A global state (e.g., `Redux` or `Context API`) might be necessary for managing post and comment data across the app.
- **Error Handling**: Currently, no error handling is implemented for API calls (e.g., when a deletion fails).
- **Styling Enhancements**: Further refinements might be required for production-grade styling.

This structure provides a solid foundation for the post and comments functionality in your app!