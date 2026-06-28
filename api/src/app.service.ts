import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';

export interface Bookmark {  
    id: string;
    title: string;
    url: string;
    description: string;
    folders: string;
    tags: string;
};

@Injectable()
export class AppService {
  
    async getAllDataOfBookmarks() : Promise<Bookmark[]> { 
        const filePath = path.join(process.cwd() ,'data', 'bookmarks.json');

        try { 
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch(error) {
            throw new Error("Не удалось прочитать файл");
        }
        };

    async createNewBookmark() : Promise<Bookmark[]> {
        const booksmarks = await this.getAllDataOfBookmarks();
    }
}
