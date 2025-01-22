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