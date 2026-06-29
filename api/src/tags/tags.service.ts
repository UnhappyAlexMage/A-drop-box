import { Injectable } from "@nestjs/common";

import * as path from 'path';
import * as fs from 'fs/promises';

import { Tag } from "./interfaces/tag.interface";

@Injectable()
export class TagsService {
    private filePath = path.join(process.cwd(), 'data', 'tags.json');

    //GET data of all array tags
    async getAllDataOfTags() : Promise<Tag[]> {
        try {
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch(error: any) {
            if(error.code === 'ENOENT') {
                return [];
            }
            throw new Error("GET: не удалось прочитать теги");
        }
    };

    //POST data a new tag
    async createNewTag(newTag: Tag) : Promise<Tag[]> {
        const tags = await this.getAllDataOfTags();
        tags.push(newTag);

        try {
            const stringifiedDataTags = JSON.stringify(tags);
            await fs.writeFile(this.filePath, stringifiedDataTags, 'utf-8');
            return tags; 
        } catch(error: any) {
            throw new Error("POST: не удалось создать тег");
        }
    };

    //DELETE data a selected tag
    async deleteSelectedTag(id: string) : Promise<void> {
        try {
            const tags = await this.getAllDataOfTags();
            const filteredTags = tags.filter(tag => tag.id !== id);
            const stringifiedDataTags = JSON.stringify(filteredTags);
            await fs.writeFile(this.filePath, stringifiedDataTags, 'utf-8');
        } catch(error: any) {
            throw new Error("DELETE: не удалось удалить выбранный тег");
        }
    };
}