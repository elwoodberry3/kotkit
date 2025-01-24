# UPLOAD PAGE
Documentation 

[< Documentation](./README.md)  

### Explanation of the Additions and Updates

#### 1. **Addition: `app/uploads/page.tsx`**
   - A new `Upload` component was created to handle video uploads. It includes:
     - **File Uploading:** 
       - Uses `useState` to manage the file, caption, and error states.
       - Displays a drag-and-drop file upload box or a preview of the uploaded video.
     - **Controls for Video Upload:**
       - Options to clear the selected video or discard the entire upload session.
       - A `createNewPost` function placeholder for posting the uploaded content.
       - Displays a loader during uploading (`isUploading` state) and handles errors (`error` state).
     - **Caption Input:** Text input field with a character limit of 150 for the video caption.
     - **Video Editing Suggestion Section:** Includes a feature prompt to divide or edit videos.

#### 2. **Update: `app/types.tsx`**
   - A new interface, `UploadError`, was added to define the structure of errors related to the upload process. It includes:
     - `type`: The error type.
     - `message`: The error description.
   - This update is used in the `Upload` component to structure and display errors.

#### 3. **Addition: `app/layouts/UploadLayout.tsx`**
   - A new layout component (`UploadLayout`) was created to wrap the `/upload` page. It:
     - Uses `TopNav` for the top navigation.
     - Includes `SideNavMain` for the sidebar.
     - Displays the `children` content in the center, with conditional styling based on the pathname (`/upload`).

---

### **Why the `/upload` URL Displays a 404**

The 404 error is likely due to an incorrect folder structure or file placement. In a **Next.js** project, the directory structure under the `app` folder dictates the routing:

1. **Correct File Placement for Routing:**
   - The file `app/uploads/page.tsx` should be located in a folder named `upload` (singular) if the route is `/upload`.
   - Currently, the file is placed under `uploads` (plural), which maps to the `/uploads` route instead.

2. **How to Fix the Issue:**
   - Rename the folder `uploads` to `upload` to match the desired route `/upload`. The updated file path should be:
     ```
     app/upload/page.tsx
     ```

3. **Verify Routing:**
   - Next.js automatically generates routes based on the folder structure. Ensure the `upload` folder contains the `page.tsx` file directly inside it.

---

### Summary
- **Additions:** New components (`Upload`, `UploadLayout`) and functionality to handle video uploads and editing prompts.
- **Update:** `UploadError` type added to manage upload-related error handling.
- **Fix for 404:** Rename the folder `uploads` to `upload` to align the folder structure with the intended `/upload` route.