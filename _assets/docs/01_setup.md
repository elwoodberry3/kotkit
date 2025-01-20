# Set Up

## Commands  

**Create a New Project**  

```bash  
$ npx create-next-app@latest kotkit
```
   - Typescript: YES
   - ESLint: NO
   - Tailwind CSS: YES
   - 'src/' directory: NO
   - Use App Router: YES
   - Use Turbopack for `next dev`?: YES
   - Customize the default import alias?: NO
  
**Run New Project**  
Change directory to new project.

```bash  
$ npm run dev
```







## Summary
Here’s a detailed breakdown of the Next.js project you’re creating with your selected settings:

---

### **Project Command**
`npx create-next-app@latest kotkit`
- **Purpose**: This initializes a new Next.js project in a directory called `kotkit` with the latest version of the framework.
- **Next.js**: A full-stack React framework optimized for building scalable web applications with SSR (Server-Side Rendering), SSG (Static Site Generation), and API capabilities.

---

### **Selected Settings & Their Impact**

1. **TypeScript: YES**
   - **Effect**: The project will use TypeScript, a superset of JavaScript, for enhanced type safety, better tooling, and reduced runtime errors.
   - **Benefit**: Improves code maintainability and reduces bugs by catching issues at compile-time.

2. **ESLint: NO**
   - **Effect**: ESLint, a linter tool to enforce consistent code style and catch potential errors, will not be included.
   - **Impact**: You won’t have default linting or code-quality checks in the project. You can add it later if needed.

3. **Tailwind CSS: YES**
   - **Effect**: Tailwind CSS, a utility-first CSS framework, will be pre-configured.
   - **Benefit**: Enables rapid and responsive UI development using utility classes, eliminating the need for writing custom CSS.

4. **'src/' Directory: NO**
   - **Effect**: The project will not include a `src/` directory to organize source code. Instead, all files will reside in the root directory.
   - **Impact**: This keeps the structure simple but may become less organized as the project scales. 

5. **Use App Router: YES**
   - **Effect**: The project will adopt Next.js’s **App Router**, a new file-based routing system introduced in Next.js 13, instead of the older **Pages Router**.
   - **Benefit**: Enables powerful features like layouts, server components, and nested routing for better modularity and scalability.


6. **Use Turbopack for `next dev`?: YES**
   - It is designed faster performance and better scalability. Leverages incremental computation for hot module replacement (HMR).

7. **Customize the Default Import Alias?: NO**
   - **Effect**: The default alias (`@/`) for imports will not be changed.
   - **Impact**: You can still use `@/` to simplify importing files (e.g., `@/components/Button`), which improves readability without the need for relative paths.

---

### **Final Project Setup**
- **TypeScript** will ensure code safety.
- **Tailwind CSS** is pre-installed for efficient styling.
- **App Router** enables modern, feature-rich routing.
- A **flat folder structure** without a `src/` directory simplifies initial setup.
- **No ESLint** means you’ll need to manage code quality manually or integrate a linter later.

This setup is beginner-friendly and efficient for modern Next.js development with a focus on scalability and speed.