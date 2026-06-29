import { Injectable } from "@nestjs/common";

import * as path from 'path';
import * as fs from 'fs/promises';

import { Tag } from "./interfaces/tags.interfaces";

@Injectable()
export class TagsService {
    private filePath = path.join(process.cwd(), 'data', 'tags.json');

    //GET data of all array tags
    async getAllDataOfTags() : Promise<Tag[]> {
        try {
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch(error) {
            if(this.filePath.length === 0) {
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
        } catch(error) {
            throw new Error("POST: не удалось создать тег");
        }
    };

    //DELETE data a selected tag
    async daleteSelectedTag(id: string) : Promise<void> {
        try {
            const tags = await this.getAllDataOfTags();
            const filteredTags = tags.filter(tag => tag.id !== id);
            const stringifiedDataTags = JSON.stringify(filteredTags);
            await fs.writeFile(this.filePath, stringifiedDataTags, 'utf-8');
        } catch(error) {
            throw new Error("DELTE: не удалось удалить выбранный тег");
        }
    };
}