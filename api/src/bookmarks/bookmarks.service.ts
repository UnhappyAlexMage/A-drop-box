import { Injectable } from "@nestjs/common";

import * as path from 'path';
import * as fs from 'fs/promises';

import type { Bookmark } from "./interfaces/bookmark.interface";

@Injectable()
export class BookmarksService {
   
    private filePath = path.join(process.cwd() ,'data', 'bookmarks.json');

    async getAllDataOfBookmarks() : Promise<Bookmark[]> { 
        try { 
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch(error) {
            if(this.filePath.length === 0) {
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

        } catch(error) {
            throw new Error("POST: не удалось создать новую закладку")
        }
    };

    async deleteSelectedBookmark(id: string) : Promise<void> {
        try {
            const bookmarks = await this.getAllDataOfBookmarks();
            const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
            const stringifiedData = JSON.stringify(filteredBookmarks);
            await fs.writeFile(this.filePath, stringifiedData, 'utf-8');
        } catch(error) {
            throw new Error("DELETE: не удалось выполнить удаление выбранного элемента");
        }
    };
}