# React Advanced Cropper  

## Dependecy Conflict  
```bash
Troubleshoot the following:
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: prjct@0.1.0
npm error Found: react@19.0.0
npm error node_modules/react
npm error   react@"^19.0.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer react@"^16.8.0 || ^17.0.0 || ^18.0.0" from react-advanced-cropper@0.20.0
npm error node_modules/react-advanced-cropper
npm error   react-advanced-cropper@"*" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error /Users/adbyrd/.npm/_logs/2025-01-20T08_58_18_634Z-eresolve-report.txt
npm error A complete log of this run can be found in: /Users/adbyrd/.npm/_logs/2025-01-20T08_58_18_634Z-debug-0.log
```  


This error occurs because there is a **dependency conflict** in your project. Specifically:

1. Your project uses **React 19.0.0**, but the package `react-advanced-cropper@0.20.0` has a **peer dependency** on React versions `^16.8.0 || ^17.0.0 || ^18.0.0`.  
2. Since React 19 is outside the compatible range, npm fails to resolve the dependency tree.

---

### **How to Fix the Issue**

#### 1. **Verify React Version**
   - Check if your project actually needs React 19.0.0. The current stable version of React is **18.x** (as of Jan 2025), and React 19 may be experimental or unsupported by most libraries.
   - Downgrade React to a compatible version, like React 18:
     ```bash
     npm install react@18 react-dom@18
     ```

#### 2. **Force or Ignore Peer Dependency Conflicts**
   - You can bypass the dependency check (not recommended for production):
     ```bash
     npm install --legacy-peer-deps
     ```
   - Alternatively, force install:
     ```bash
     npm install --force
     ```

#### 3. **Use a Compatible Version of `react-advanced-cropper`**
   - Check if there’s a newer version of `react-advanced-cropper` that supports React 19:
     ```bash
     npm view react-advanced-cropper versions
     ```
   - Install a compatible version if available:
     ```bash
     npm install react-advanced-cropper@latest
     ```

#### 4. **Consider Alternative Libraries**
   - If React 19 is essential, switch to an alternative library for cropping that supports newer React versions.

---

### **Steps to Resolve (Recommended Approach)**
1. Downgrade React to version 18.x:
   ```bash
   npm install react@18 react-dom@18
   ```
2. Reinstall dependencies:
   ```bash
   npm install
   ```
3. Verify that the app builds and runs correctly.

This approach ensures compatibility while avoiding unstable or unsupported configurations.