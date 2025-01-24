/**
 * TYPES
 * Centeral location for all interfaces.
 */

// RANDOM USER
export interface RandomUsers {
    id: string,
    name: string,
    image: string
}

export interface Like {
    id: string;
    user_id: string;
    post_id: string
}

export interface Comment {
    id:string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string
}

export interface PostWithProfile {
    id:string;
    user_id:string;
    video_url:string;
    text:string;
    created_at:string;
    profile: {
      user_id:string;
      name:string;
      image:string;
    }
}

export interface UploadError {
    type: string;
    message:string;
}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

/**
 * COMPONENTS
 */

export interface PostMainCompTypes {
    post: PostWithProfile
}

export interface PostMainLikesCompTypes {
    post: PostWithProfile
}

// MENU ITEMS
export interface MenuItemTypes {
    iconString:string,
    colorString:string,
    sizeString:string
}

// MENU ITEM COMPONENTS
export interface MenuItemCompTypes{
    user: RandomUsers
}