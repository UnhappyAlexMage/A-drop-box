import { Injectable } from "@nestjs/common";

import * as path from 'path';
import * as fs from 'fs/promises';

import { FoldersService } from "../folders/folders.service";
import { TagsService } from "../tags/tags.service";

import type { Bookmark } from "./interfaces/bookmark.interface";

@Injectable()
export class BookmarksService {
    constructor(private readonly foldersService: FoldersService, private readonly tagsService: TagsService) {}

    private filePath = path.join(process.cwd() ,'data', 'bookmarks.json');

    async getAllDataOfBookmarks() : Promise<Bookmark[]> { 
        try { 
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            const dataBookmarks = JSON.parse(fileContent);

            const [dataFolders, dataTags] = await Promise.all([
                this.foldersService.getAllDataOfFolders(),
                this.tagsService.getAllDataOfTags()
            ]);

            return dataBookmarks.map(bookmark => {
                const sortFolder = dataFolders.find(folder => folder.id === bookmark.foldersId) || null;
                // const tags = dataTags.find(tag => tag.id === bookmark.tagsId) || null;
                const sortTags = dataTags.filter(tag => bookmark.tagsId?.includes(tag.id) || null);

                return {
                    id: bookmark.id,
                    title: bookmark.title,
                    description: bookmark.description,
                    foldersId: sortFolder,
                    tagsId: sortTags

                };
            });
        } catch(error: any) {
            if(error.code === 'ENOENT') {
                return [];
            }
            throw new Error("GET: Не удалось прочитать файл bookmarks");
        }
    };

    async createNewBookmark(newBookmark: Bookmark) : Promise<Bookmark[]> {
        const bookmarks = await this.getAllDataOfBookmarks();
        bookmarks.push(newBookmark);

        try {
            const stringifiedData = JSON.stringify(bookmarks)
            await fs.writeFile(this.filePath, stringifiedData, 'utf-8');
            return bookmarks;

        } catch(error: any) {
            throw new Error("POST: не удалось создать новую закладку")
        }
    };

    async deleteSelectedBookmark(id: string) : Promise<void> {
        try {
            const bookmarks = await this.getAllDataOfBookmarks();
            const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
            const stringifiedData = JSON.stringify(filteredBookmarks);
            await fs.writeFile(this.filePath, stringifiedData, 'utf-8');
        } catch(error: any) {
            throw new Error("DELETE: не удалось выполнить удаление выбранного элемента");
        }
    };
}