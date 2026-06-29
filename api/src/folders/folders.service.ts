import { Injectable } from "@nestjs/common";

import * as path from 'path';
import * as fs from 'fs/promises';

import type { Folder } from "./interfaces/folder.interface";

@Injectable()
export class FoldersService {
    private filePath = path.join(process.cwd(), 'data', 'folders.json');
    
    //GET data of all array folders
    async getAllDataOfFolders() : Promise<Folder[]> {
        try {
            const fileContent = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(fileContent);
        } catch(error) {
            if(this.filePath.length === 0) {
                return [];
            }
            throw new Error("GET: не удалось прочиать файл folders");
        }
    };

    //POST data a new folder
    async createNewFolder(newFolder: Folder) : Promise<Folder[]> {
        const folders = await this.getAllDataOfFolders();
        folders.push(newFolder);

        try {
            const stringifiedData = JSON.stringify(folders);
            await fs.writeFile(this.filePath, stringifiedData, 'utf-8');
            return folders;
        } catch(error) {
            throw new Error("POST: не удалось создать новую папку");
        }
    };

    //DELETE data a selected folder 
    async deleteSelectedFolder(id: string) : Promise<void>{
        try {
            const folders = await this.getAllDataOfFolders();
            const filteredFolders = folders.filter(folder => folder.id !== id);
            const stringifiedData = JSON.stringify(filteredFolders);
            await fs.writeFile(this.filePath, stringifiedData, 'utf-8');

        } catch(error) {
            throw new Error("DELETE: не удалось удалить выбранную папку");
        } 
    };
}