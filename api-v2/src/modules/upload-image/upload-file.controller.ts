import {
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { isFileExtensionSafe, removeFile, saveImageToStorage } from './helpers/image-storage';

@ApiTags('upload')
@Controller('upload')
export class UploadFilesController {
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully file upload',
  })
  @ApiOperation({
    summary: 'upload new single file',
    description: 'upload new single file',
  })
  @Post('single')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadSingleImage(@UploadedFile() file: Express.Multer.File) {
    const fileName = file?.filename;

    if (!fileName) return of({ error: 'File must be a png, jpg/jpeg' });

    const imagesFolderPath = join(process.cwd(), '../uploads');
    const fullImagePath = join(imagesFolderPath + '/' + file.filename);

    return fullImagePath;

    //   return isFileExtensionSafe(fullImagePath).pipe(
    //     switchMap((isFileLegit: boolean) => {
    //       if (isFileLegit) {
    //         const userId = req.user.id;
    //         return this.userService.updateUserImageById(userId, fileName).pipe(
    //           map(() => ({
    //             modifiedFileName: file.filename,
    //           })),
    //         );
    //       }
    //       removeFile(fullImagePath);
    //       return of({ error: 'File content does not match extension!' });
    //     }),
    //   );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully file upload',
  })
  @ApiOperation({
    summary: 'upload new file',
    description: 'upload new file',
  })
  @Post('multiple')
  @UseInterceptors(AnyFilesInterceptor(saveImageToStorage))
  uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
    return files.map((el) => {
      const fileName = el?.filename;

      if (!fileName) return of({ error: 'File must be a png, jpg/jpeg' });

      const imagesFolderPath = join(process.cwd(), '../uploads');
      const fullImagePath = join(imagesFolderPath + '/' + el.filename);
      return fullImagePath;
    });
    // return fullImagePath;

    //   return isFileExtensionSafe(fullImagePath).pipe(
    //     switchMap((isFileLegit: boolean) => {
    //       if (isFileLegit) {
    //         const userId = req.user.id;
    //         return this.userService.updateUserImageById(userId, fileName).pipe(
    //           map(() => ({
    //             modifiedFileName: file.filename,
    //           })),
    //         );
    //       }
    //       removeFile(fullImagePath);
    //       return of({ error: 'File content does not match extension!' });
    //     }),
    //   );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get file by file name',
  })
  @ApiOperation({
    summary: 'get file by file name',
    description: 'get file by file name',
  })
  @Get(':filename')
  getImage(@Param('filename') filename, @Res() res): Observable<unknown> {
    return of(res.sendFile(join(process.cwd(), '../uploads/' + filename)));
  }
}
