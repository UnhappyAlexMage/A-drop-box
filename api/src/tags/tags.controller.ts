import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { TagsService } from "./tags.service";

import type { Tag } from "./interfaces/tag.interface";

@Controller()
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get('home/tags')
        getDataTags() {
            return this.tagsService.getAllDataOfTags();
        }
    
    @Post('home/createtags')
        postDataTags(@Body() newTag: Tag) {
            return this.tagsService.createNewTag(newTag);
        }

    @Delete('home/tags/:id')
        deleteDataTags(@Param(':id') id: string) {
            return this.tagsService.deleteSelectedTag(id);
        }
}