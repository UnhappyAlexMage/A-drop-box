import type { Folder } from "../../folders/interfaces/folder.interface";
import type { Tag } from "../../tags/interfaces/tag.interface";

export interface Bookmark {  
    id: string;
    title: string;
    url: string;
    description: string;
    foldersId: Folder | null;
    tagsId: Tag[] | null;
};