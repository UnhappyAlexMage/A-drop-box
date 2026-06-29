import { Module } from "@nestjs/common";

import { FoldersService } from "./folders.service";
import { FoldersConstroller } from "./folders.controller";

@Module({
    imports: [],
    exports: [],
    controllers: [FoldersConstroller],
    providers: [FoldersService],
})
export class FolderModule {}