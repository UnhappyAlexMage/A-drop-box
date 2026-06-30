import { Injectable } from "@nestjs/common";

import * as path from 'path';
import * as fs from 'fs/promises';

import { FoldersService } from "../folders/folders.service";
import { TagsService } from "../tags/tags.service";

import type { Bookmark, PopulatedBookmark } from "./interfaces/bookmark.interface";

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
                const sortTags = dataTags.filter(tag => bookmark.tagsId?.includes(tag.id) || false);

                return {
                    id: bookmark.id,
                    title: bookmark.title,
                    url: bookmark.url,
                    description: bookmark.description || "",
                    started: bookmark.started,
                    readLater: bookmark.readLater,
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

    async createNewBookmark(newBookmark: Bookmark) : Promise<PopulatedBookmark> {
        try {
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            const bookmarks = JSON.parse(fileContent);

            const [dataFolders, dataTags] = await Promise.all([
                this.foldersService.getAllDataOfFolders(),
                this.tagsService.getAllDataOfTags()
            ]);

            const bookmarkToSave: Bookmark = {
                id: newBookmark.id,
                title: newBookmark.title,
                description: newBookmark.description || "",
                url: newBookmark.url,
                started: false,
                readLater: false,
                foldersId: newBookmark.foldersId ?? null,
                tagsId: newBookmark.tagsId ?? []
            };

            bookmarks.push(bookmarkToSave);
            const stringifiedData = JSON.stringify(bookmarks, null, 2);
            await fs.writeFile(this.filePath, stringifiedData, 'utf-8');
            
            const sortFolder = dataFolders.find(folder => folder.id === bookmarkToSave.foldersId) ?? null;
            const sortTags = dataTags.filter(tag => bookmarkToSave.tagsId?.includes(tag.id));

            return {
                ...bookmarkToSave,
                foldersId: sortFolder,
                tagsId: sortTags
            }

        } catch(error: any) {
            throw new Error("POST: не удалось создать новую закладку")
        }
    };

    async deleteSelectedBookmark(id: string) : Promise<void> {
        try {
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            const bookmarks = JSON.parse(fileContent);
            const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
            const stringifiedData = JSON.stringify(filteredBookmarks, null, 2);
            await fs.writeFile(this.filePath, stringifiedData, 'utf-8');
        } catch(error: any) {
            throw new Error("DELETE: не удалось выполнить удаление выбранного элемента");
        }
    };
}