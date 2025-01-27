# APPLICATION AUTHENTICATION OVERLAY
Documentation 

[< Documentation](./README.md)  

### Overview of Additions and Updates:

This project is creating a **user authentication system** for a social media app called "KROWD". The newly added components (`Login`, `Register`, `AuthOverlay`) and updates to the root layout (`layout.tsx`) enable users to log in or register through an overlay on the application.

---

### **1. `Login.tsx`**
**Purpose**: A React component for user login functionality.  

#### **Key Features**:
- **State Management**:
  - Manages user input for `email`, `password`, and an `error` object to handle input errors.
  - Tracks a `loading` state to show a loader during the login process.

- **Error Display**:
  - The `showError` function checks and displays specific error messages for each input field.

- **Dynamic Button State**:
  - Login button is disabled unless both `email` and `password` fields are filled.
  - While loading, a spinning loader icon (`BiLoaderCircle`) is shown instead of text.

- **Integration with `TextInput` Component**:
  - Uses a custom `TextInput` component for reusable and clean input fields with error handling.

---

### **2. `Register.tsx`**
**Purpose**: A React component for user registration functionality.  

#### **Key Features**:
- **State Management**:
  - Handles user input for `name`, `email`, `password`, `confirmPassword`, and `error`.
  - Tracks the `loading` state to indicate registration processing.

- **Error Handling**:
  - Displays specific error messages using the `showError` function.

- **Dynamic Button State**:
  - The registration button is disabled unless all required fields are filled.
  - Displays a spinning loader icon while the form is being submitted.

- **Password Confirmation**:
  - Includes a `confirmPassword` field for verifying that the user entered the correct password.

---

### **3. `AuthOverlay.tsx`**
**Purpose**: A parent component that displays the authentication overlay for both login and registration forms.

#### **Key Features**:
- **Toggle Between Login and Register**:
  - Uses a `isRegister` state to toggle between the `Register` and `Login` components.

- **Overlay Styling**:
  - Creates a modal-like experience:
    - Fullscreen overlay with a black semi-transparent background.
    - A centered, white card containing the authentication form.

- **Close Button**:
  - Includes a close button with the `AiOutlineClose` icon to potentially allow dismissal of the overlay.

---

### **4. `layout.tsx`**
**Purpose**: Sets up the global layout and ensures the `AuthOverlay` is always available.

#### **Key Updates**:
- **Added the `AuthOverlay` Component**:
  - Ensures the authentication modal is globally accessible in the app.
  - Placed above `children` so that it overlays the main content when displayed.

- **Global Metadata**:
  - Updated the `title` and `description` to reflect the application's branding.

---

### **How It Works Together**
1. **Overlay Display**:
   - The `AuthOverlay` component is always rendered globally in the layout. 
   - It dynamically shows the login or registration form based on the `isRegister` state.

2. **Login and Register**:
   - Users can input their credentials, which are validated through state management and error handling.
   - The buttons for login and register are disabled unless required fields are filled.

3. **Reusable Components**:
   - `TextInput` is used in both `Login` and `Register` components to handle consistent input behavior and design.

4. **User Flow**:
   - When a user opens the app, they can access the authentication modal and switch between login and registration forms seamlessly.

---

### **Next Steps** (Optional Enhancements):
1. **Form Submission**:
   - Add API integration for login and registration functionality.
   - Validate user inputs before submission (e.g., email format, password strength).

2. **Close Button Behavior**:
   - Implement functionality to hide the `AuthOverlay` when the close button is clicked.

3. **Error Handling**:
   - Update the `setError` logic to handle specific errors from the backend.

4. **Authentication State**:
   - Use a context or global state (e.g., Redux or React Context API) to manage user authentication across the app.