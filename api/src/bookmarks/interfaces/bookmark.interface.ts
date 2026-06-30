import type { Folder } from "../../folders/interfaces/folder.interface";
import type { Tag } from "../../tags/interfaces/tag.interface";

export interface Bookmark {  
    id: string;
    title: string;
    url: string;
    description: string;
    started: boolean;
    readLater: boolean;
    foldersId: string | null;
    tagsId: string[];
};

export interface PopulatedBookmark {
    id: string;
    title: string;
    description: string;
    url: string;
    started: boolean;
    readLater: boolean;
    foldersId: Folder | null;
    tagsId: Tag[];
}