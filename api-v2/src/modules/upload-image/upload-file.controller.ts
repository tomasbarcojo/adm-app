import { Controller, HttpStatus, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('upload')
@Controller('upload')
export class UploadFilesController {
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully file upload',
  })
  @ApiOperation({
    summary: 'upload new file',
    description: 'upload new file',
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
