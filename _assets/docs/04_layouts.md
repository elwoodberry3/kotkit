# LAYOUT  

#### **What is `MainLayout.tsx`?**
- `MainLayout` is a **custom layout component** created to wrap other components and provide a consistent layout structure across the application.
- It uses the **`usePathname`** hook from `next/navigation` to dynamically adjust its styling based on the current route.

#### **Key Features**
1. **Dynamic Layout Styling**
   - The layout checks the current `pathname` (URL) using `usePathname`.
   - If the user is on the homepage (`'/'`), it applies the class `max-w-[1140px]`, restricting the container's width to 1140px. For other pages, it allows the container to use the full width.

2. **Flexbox Layout**
   - Uses Tailwind CSS utility classes (`flex justify-between mx-auto w-full`) to create a flexible layout where content is centered and spaced appropriately.

3. **Props**
   - Accepts a `children` prop of type `React.ReactNode` to render any child components passed to it dynamically.

---

### **Explanation of the Update: `app/page.tsx`**

#### **What Changed?**
The `Home` component in `app/page.tsx` now wraps its content (`<div>Home</div>`) inside the `MainLayout` component.

#### **Key Features**
1. **Using `MainLayout`**
   - By wrapping the page content in `MainLayout`, the layout structure and dynamic styling defined in `MainLayout.tsx` are applied to the homepage.
   - This ensures consistent styling and structure for the homepage and any other pages that use `MainLayout`.

2. **`"use client"` Directive**
   - The `"use client"` directive makes the `Home` component a client-side component.
   - This is necessary because `usePathname` is a client-side hook from `next/navigation`, and it requires the component using it (or its parent) to be rendered on the client.

---

### **How It All Comes Together**
1. **`MainLayout`** defines a flexible, responsive layout with conditional styling based on the current route.
2. **`Home` (`app/page.tsx`)** now uses `MainLayout` to apply this consistent structure and styling.
3. Future pages can reuse `MainLayout` to standardize layout behavior across the app, making it easier to maintain and scale.