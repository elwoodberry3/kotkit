# PROFILE PAGE
Documentation 

[< Documentation](./README.md)  

Here’s a detailed explanation of the additions and updates made across the project:

---

### **1. New `Profile` Page in `app/profile/[id]/page.tsx`**
#### **Purpose**:
This new page dynamically renders a user’s profile based on the `id` parameter in the URL.

#### **Key Features**:
- **Dynamic Routing**:
  - Utilizes Next.js's file-based routing to serve a profile page dynamically based on the user ID (`[id]`).
  - The `params` object in the `ProfilePageTypes` interface ensures type safety when accessing `id`.

- **Layout and Content**:
  - The `MainLayout` component wraps the profile page, providing consistent structure.
  - Displays user information (e.g., name, bio, followers, and following counts) and actions like editing the profile or following.

- **Client-Side Rendering with `ClientOnly`**:
  - Ensures components are rendered only on the client side. This avoids potential hydration errors with server-side rendering.

- **Tabs and Posts**:
  - Tabs (`Videos`, `Likes`) let users navigate content.
  - Displays a grid of posts using the `PostUser` component.

- **Default User**:
  - A `defaultUser` object is hardcoded for demonstration. In production, this would likely be fetched based on the `id` parameter.

---

### **2. Updates to `app/types.tsx`**
#### **Purpose**:
The type definitions were updated to ensure type safety for all new components, props, and data structures.

#### **Key Additions**:
1. **`ProfilePageTypes`**:
   - Defines the shape of the props for the `Profile` page, specifically the `params` object with a dynamic `id`.

2. **`PostUserCompTypes`**:
   - Defines the type for the `post` prop in the `PostUser` component. It enforces the structure of a `Post` object used in the grid.

3. **Miscellaneous**:
   - Other interfaces (e.g., `RandomUsers`, `Like`, `Comment`) remain as supporting types for future extensibility.

---

### **3. New Component: `PostUser` in `app/components/profile/PostUser.tsx`**
#### **Purpose**:
This component is responsible for rendering a single video post in the user’s profile.

#### **Key Features**:
1. **Video Interaction**:
   - Uses a `ref` with `useRef` to access the video element.
   - Adds `mouseenter` and `mouseleave` event listeners to play and pause the video on hover.
   - Ensures proper cleanup of event listeners in the `useEffect` return function.

2. **Conditional Rendering**:
   - Displays a loading animation (`AiOutlineLoading3Quarters`) if no `video_url` is provided.
   - Renders the video content with a `Link` to the post details page (`/post/${post.id}/${post.user_id}`).

3. **Styling**:
   - Uses `brightness` effects to create a hover interaction, improving user experience.

---

### **4. Integration of `PostUser` in the Profile Page**
#### **How It Works**:
- The `Profile` page passes a hardcoded `post` object to the `PostUser` component.
- The `PostUser` component renders the post in a visually appealing grid layout.

---

### **5. Why These Changes Were Made**
1. **Dynamic User Profiles**:
   - Adding the `Profile` page enables personalized profiles for different users, accessible via `/profile/[id]`.

2. **Component-Based Design**:
   - `PostUser` encapsulates logic for rendering video posts, making the code modular and reusable for other pages.

3. **Type Safety**:
   - Adding and updating types in `app/types.tsx` ensures that all components and their props conform to expected data structures, reducing runtime errors.

4. **Interactive UI**:
   - The hover-to-play functionality in `PostUser` enhances user engagement, especially in content-heavy profiles.

---

### **Summary**
This update lays the foundation for a dynamic and interactive user profile system:
- **Dynamic profiles** are created using Next.js's dynamic routing.
- **Reusable components** like `PostUser` streamline post rendering.
- **Client-side rendering** and type safety improve stability and scalability.
These updates prepare the project for scaling, user personalization, and richer user interactions.