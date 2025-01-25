# EDIT PROFILE OVERLAY
Documentation 

[< Documentation](./README.md)  

Here’s an explanation of the **additions** and **updates** in your codebase:

---

### 1. **Addition of `EditProfileOverlay.tsx`**
This component is a pop-up overlay allowing users to edit their profile. Key functionalities include:
- **Profile Photo Update:**
  - Users can upload a new profile picture. The uploaded image is displayed using a cropper (`react-advanced-cropper`) for cropping before saving.
  - Includes a preview of the current profile photo with an edit button.
- **User Details:**
  - Fields to update the user's name and bio. Validations for username formatting and bio character limit are implemented.
- **Save/Cancel Buttons:**
  - Conditional rendering for two modes: 
    - Normal mode: Displays "Save" and "Cancel" buttons for profile updates.
    - Cropper mode: Displays "Apply" and "Cancel" for image cropping.
- **State Management:**
  - States to manage user input (`userName`, `userBio`), file uploads (`file`, `uploadedImage`), and error handling.

---

### 2. **Update to `types.tsx`**
New types and interfaces were added to improve type safety and scalability:
- **`CropperDimensions`:** Defines dimensions of the cropping area (height, width, left, top).
- **`ShowErrorObject`:** Manages error handling for input validation (type and message).
- **`TextInputCompTypes`:** Type definition for the `TextInput` component's props, enabling reusable input logic.

These additions enhance TypeScript support and make the code more robust.

---

### 3. **Addition of `page.tsx` in `app/profile/[id]/`**
This page serves as the **user profile page**. Key elements include:
- **Profile Details:**
  - Displays user's profile picture, name, follower/following counts, and bio.
  - Default user data (`defaultUser`) is used as a placeholder.
- **Edit Profile Button:**
  - When clicked, it shows the `EditProfileOverlay` for editing the profile details.
- **Posts Section:**
  - A grid layout displays posts by the user (e.g., videos). The `PostUser` component is used for rendering individual posts.

---

### 4. **Addition of `TextInput.tsx`**
This reusable component standardizes input fields across the app:
- Props include `string` (current value), `inputType` (e.g., text, password), `placeholder`, `onUpdate` (callback for updates), and `error`.
- Highlights errors in a user-friendly way by displaying an error message below the input.

This promotes reusability and consistency in handling inputs.

---

### Key Changes in Functionality
#### **Profile Editing Workflow:**
1. **Overlay Activation:**
   - Triggered by the "Edit Profile" button in the profile page (`page.tsx`).
   - Shows the `EditProfileOverlay` component for updating profile details.

2. **User Actions:**
   - **Photo Upload:**
     - Users can upload a profile picture, crop it using the cropper, and save it.
   - **Edit Name and Bio:**
     - Users can update their username and bio with validation to ensure correctness.
     - Error messages guide users for invalid inputs (e.g., username format).

3. **State Management and Navigation:**
   - State is used to manage user inputs, errors, and cropping dimensions. No API calls are implemented yet, but the logic supports future integration.

---

### Why These Changes Are Important
1. **User-Friendly Design:**
   - The overlay improves user experience by focusing on profile editing within a pop-up interface, avoiding unnecessary navigation.
   - Clear validation messages and real-time feedback reduce errors during input.

2. **Scalability:**
   - Modular components like `TextInput` and reusable types in `types.tsx` promote consistency and simplify future updates or feature additions.

3. **Profile Customization:**
   - Allowing users to update their profile photo, name, and bio improves personalization and engagement.

---

This setup establishes a solid foundation for profile-related features. Future enhancements could include API integrations for saving updates, animations for the overlay, and a smoother cropping experience.