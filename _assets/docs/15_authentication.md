# AUTHENTICATION  
Documentation 

[< Documentation](./README.md) 

### **Explanation of Additions and Updates**  

This update introduces **user authentication and profile management** using AppWrite in the Kround application. It implements **user registration, login, and session management**, ensuring a smooth authentication flow.

---

## **New Additions**

### **1. Created `/app/context/user.tsx` (User Context)**
- Provides a **global authentication state** for managing user sessions.
- Handles **register, login, logout, and session checking**.
- Uses the AppWrite `account` API to manage user authentication.
- Calls `useGetProfileByUserId` to **fetch user profiles** and `useCreateProfile` to **create a profile** during registration.
- Automatically checks if a user is logged in using `checkUser()` on **component mount**.

#### **Key Functions**
1. **`checkUser()`**  
   - Retrieves the current session from AppWrite.
   - Fetches user details and profile information.
   - Updates the global state with the user data.

2. **`register(name, email, password)`**  
   - Registers a new user in AppWrite.
   - Creates a user session.
   - Generates a new user profile with a **default image**.

3. **`login(email, password)`**  
   - Logs in a user and updates the session.

4. **`logout()`**  
   - Deletes the current session and resets the user state.

---

### **2. Created `/app/hooks/useGetProfileByUserId.tsx`**
- Retrieves the user profile from the **Profile collection** based on `user_id`.
- Uses `database.listDocuments()` with `Query.equal('user_id', userId)`.
- Returns user profile data: **id, name, image, and bio**.

---

### **3. Created `/app/hooks/useCreateProfile.tsx`**
- Creates a new profile in the **Profile collection** during registration.
- Uses `database.createDocument()` to store **user_id, name, image, and bio**.

---

## **Updates**

### **4. Updated `/app/layout.tsx`**
- **Wraps the entire app** with `<UserProvider>` to make authentication accessible globally.
- Adds `<AuthOverlay />`, which will likely manage authentication popups or UI components.

---

### **5. Updated `/app/components/auth/Register.tsx`**
- Implements **user registration** form with:
  - Name, email, password, confirm password fields.
  - Validation for required fields, email format, and password strength.
  - Uses `contextUser.register(name, email, password)`.
- **Handles registration errors** and displays appropriate messages.
- Disables the register button if input fields are empty.

---

### **6. Updated `/app/components/auth/Login.tsx`**
- Implements **user login** form with:
  - Email and password fields.
  - Validation for required fields.
  - Uses `contextUser.login(email, password)`.
- **Handles login errors** and displays messages.
- **Uses a loading indicator (`BiLoaderCircle`)** during login.

---

### **Key Takeaways**
- **Centralized user authentication** with a React Context.
- **Session persistence** to keep users logged in.
- **Automatic profile creation** upon registration.
- **User-friendly validation and error handling**.
- **Improved state management** using React hooks.

This update **lays the foundation for user authentication**, ensuring a seamless experience in the Kround social media application. 🚀