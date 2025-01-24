# MAIN PAGE
Documentation 

[< Documentation](./README.md)  

### Explanation of Additions and Updates:

#### 1. **Update in `app/page.tsx`**:
The `Home` component now:
- **Uses `MainLayout`**: This integrates the `TopNav` and `SideNavMain` components into the page, creating a consistent layout across the app.
- **Displays a `PostMain` component**: Inside a `ClientOnly` wrapper to ensure proper rendering on the client side, it passes a mock post object as a prop. The `PostMain` component is the main focus here, representing an individual post with user details, video, and other metadata.

#### 2. **New Component: `PostMain.tsx`**:
The `PostMain` component:
- **Accepts a `post` object**: Based on the `PostWithProfile` interface, which contains details like the post's video, text, user profile, and creation date.
- **Video autoplay on visibility**: Uses the `IntersectionObserver` API to automatically play the video when the post is visible on the screen (at least 60% in view) and pause when it isn't.
- **Displays user profile**: Shows the user's name, profile image, and a "Follow" button with hover effects.
- **Text and hashtags**: Displays the post's text and hashtags.
- **Music and interactions**: Includes an original sound label and a heart icon to indicate likes. 
- **Video container**: Contains a styled video player that loops, is muted, and shows a watermark image at the bottom-right corner.
- **Includes `PostMainLikes`**: For handling likes, comments, and sharing functionality.

#### 3. **Update in `app/types.tsx`**:
New and updated interfaces:
- **`PostWithProfile`**: Represents a post with user details (profile), video URL, text, and creation date.
- **`PostMainCompTypes`**: Type for the `PostMain` component's `post` prop.
- **`PostMainLikesCompTypes`**: Type for the `PostMainLikes` component's `post` prop.
- **`Like` and `Comment` interfaces**: Represent individual likes and comments associated with a post.

These updates standardize the data structure and enforce type safety for components.

#### 4. **New Component: `PostMainLikes.tsx`**:
The `PostMainLikes` component:
- **Handles likes**: 
  - Tracks whether the user has clicked the "like" button (`hasClickedLike`) and whether the user has already liked the post (`userLiked`).
  - Simulates a `likeOrUnlike` function that would toggle the like state (currently logs to the console).
- **Tracks likes and comments**: State for the number of likes and comments, though these are placeholders for now.
- **Displays buttons**: 
  - A "Like" button that changes appearance based on the user's interaction.
  - A "Comment" button that navigates to the post's detailed page when clicked.
  - A "Share" button with a static count of `55`.
- **Integration with `PostMain`**: Positioned adjacent to the video and provides user interaction options for each post.

#### Summary of Changes:
- **Layout (`MainLayout`)**: Establishes the primary structure of the app, adding navigation elements (`TopNav`, `SideNavMain`).
- **Home Page (`app/page.tsx`)**: Integrates `PostMain` into the layout, demonstrating a typical post structure with its associated video and user interactions.
- **Post Component (`PostMain`)**: Focused on presenting and interacting with a single post, including autoplaying videos.
- **Like/Comment/Share (`PostMainLikes`)**: Manages the interaction functionality for each post.
- **Types (`app/types.tsx`)**: Updated to reflect the data structures needed for posts, likes, comments, and related components.

This structure lays the foundation for a social media-style app with posts, videos, and user interactions.