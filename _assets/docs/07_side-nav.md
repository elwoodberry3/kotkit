# Side Navigation  
Documentation 

[< Documentation](./README.md)  

### **Explanation of the Addition and Update**

---

### **Addition: `SideNavMain` in `layouts/includes/SideNav.tsx`**

#### **What is `SideNavMain`?**
`SideNavMain` is a **sidebar navigation component** that enhances the application's layout by offering links, suggested accounts, and following lists. It dynamically adapts its width and content based on the current route and device screen size.

---

#### **Key Features in `SideNavMain`**

1. **Responsive Sidebar Width**
   ```tsx
   className={`
       fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto
       ${pathname == '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'}
   `}
   ```
   - The sidebar width adjusts based on the route (`pathname`):
     - Wider on the homepage (`310px`).
     - Narrower on other routes (`220px`).
   - On smaller screens, it defaults to a compact width of `75px`.

2. **Menu Items**
   ```tsx
   <MenuItem iconString="For You" colorString={pathname == '/' ? '#F02C56' : ''} sizeString="25" />
   <MenuItem iconString="Following" colorString="#000000" sizeString="25" />
   <MenuItem iconString="LIVE" colorString="#000000" sizeString="25" />
   ```
   - Three main navigation links are displayed: **For You**, **Following**, and **LIVE**.
   - `MenuItem` dynamically renders icons based on the `iconString` prop (e.g., home, group, or video icons) and applies styling based on the `colorString` and `sizeString`.

3. **Suggested Accounts Section**
   - Displays a list of suggested accounts using the `MenuItemFollow` component.
   - Renders a "See All" button for expanding the list (currently non-functional).

4. **Following Accounts Section**
   - Shows a list of accounts the user follows.
   - Displays a "See More" button for viewing more accounts (currently non-functional).

5. **Static Footer Section**
   ```tsx
   <div className="lg:block hidden text-[11px] text-gray-500">
       <p className="pt-4 px-2">About Newsroom KotKit Shop Contact KrowdKyte</p>
       ...
       <p className="pt-4 px-2">&copy; 2025 KotKit</p>
   </div>
   ```
   - Provides static links and branding information, only visible on larger screens (`lg:block hidden`).

---

### **New Components Supporting `SideNavMain`**

#### **1. `MenuItem` in `components/MenuItem.tsx`**
- A reusable menu item component for rendering sidebar icons and labels.
- **Dynamic Rendering**:
  ```tsx
  const icons = () => {
      if (iconString == 'For You') return <AiOutlineHome size={sizeString} color={colorString} />
      if (iconString == 'Following') return <RiGroupLine size={sizeString} color={colorString} />
      if (iconString == 'Live') return <BsCameraVideo size={sizeString} color={colorString} />
  }
  ```
  - Based on `iconString`, the appropriate icon (e.g., home, group, or video) is rendered.
- **Styling**:
  - Tailwind classes ensure proper alignment, hover effects, and visibility on different screen sizes.

#### **2. `MenuItemFollow`**
- A component (not provided in detail) that renders individual "Suggested Accounts" and "Following Accounts" items.

#### **3. Types in `app/types.tsx`**
- **Purpose**:
  - Defines TypeScript types to enforce the structure of props passed into components.
- **Types**:
  ```tsx
  export interface RandomUsers {
      id: string;
      name: string;
      image: string;
  }
  export interface MenuItemTypes {
      iconString: string;
      colorString: string;
      sizeString: string;
  }
  ```
  - `RandomUsers`: Represents user details for suggested/following accounts.
  - `MenuItemTypes`: Represents props for the `MenuItem` component.

---

### **Update: Adding `SideNavMain` to `MainLayout`**

#### **What Changed in `MainLayout.tsx`?**
```tsx
import SideNavMain from "./includes/SideNav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <>
            <TopNav />
            <div className={`flex justify-between mx-auto w-full lg:px-2.5 px-0 ${pathname == '/' ? 'max-w-[1140px]' : ''}`}>
                <SideNavMain />
                {children}
            </div>
        </>
    );
}
```

1. **Added `SideNavMain` to the Layout**:
   - The `SideNavMain` component is included alongside the `children` content, ensuring that the sidebar is present on all pages that use the `MainLayout`.

2. **Dynamic Styling for Main Content**:
   - The layout ensures proper spacing (`justify-between`) between the sidebar and the main content.

---

### **How Everything Works Together**

1. **Persistent Layout**:
   - `TopNav` (header) and `SideNavMain` (sidebar) are consistently rendered across all pages using the `MainLayout`.

2. **Dynamic Navigation**:
   - The sidebar adapts its width based on the current route and device size.
   - Interactive elements like `MenuItem` and `MenuItemFollow` enhance user engagement.

3. **Responsive Design**:
   - The sidebar and its contents are optimized for both small and large screens using Tailwind classes.

4. **Modularity and Reusability**:
   - Components like `MenuItem` and `MenuItemFollow` are reusable, making the sidebar easy to extend or modify.

5. **Improved User Experience**:
   - Users can easily navigate the app, explore suggested/following accounts, and access additional information through the sidebar.

By adding `SideNavMain` and updating `MainLayout`, the project gains a robust, scalable layout with a dynamic sidebar that enhances navigation and interactivity.