import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { FoldersService } from "./folders.service";

import type { Folder } from "./interfaces/folder.interface";


@Controller()
export class FoldersConstroller {
    constructor(private readonly folderService: FoldersService) {}

    @Get('home/folders')
        getDataFolders() {
            return this.folderService.getAllDataOfFolders();
        }
    
    @Post('home/createfolder')
        postDataFolders(@Body() newFolder: Folder) {
            return this.folderService.createNewFolder(newFolder);
        }
    
    @Delete('home/folders/:id')
        deleteDataFolders(@Param(':id') id: string) {
            return this.folderService.deleteSelectedFolder(id);
        }
}