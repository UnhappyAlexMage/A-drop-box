export interface Bookmark {  
    id: string;
    title: string;
    url: string;
    description: string;
    foldersId: string | null;
    tagsId: string[] | null;
};