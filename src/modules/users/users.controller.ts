import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UnsupportedMediaTypeException, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './interfaces/create-user.dto';
import { UpdateUserDto } from './interfaces/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: "./uploads/photo",
      filename: (req, file, cb) => {
        let posterName = file.originalname
        cb(null, posterName)
      }
    }),

    fileFilter: (req, file, callback) => {
      let allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowed.includes(file.mimetype)) {
        callback(new UnsupportedMediaTypeException("File tpe must be .jpg | .jpeg | .png "), false)

      }
      callback(null, true)
    }
  }))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() photo: Express.Multer.File) {
    return this.usersService.create(createUserDto, photo);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'User fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: "./uploads/photo",
      filename: (req, file, cb) => {
        let posterName = file.originalname
        cb(null, posterName)
      }
    }),

    fileFilter: (req, file, callback) => {
      let allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowed.includes(file.mimetype)) {
        callback(new UnsupportedMediaTypeException("File tpe must be .jpg | .jpeg | .png "), false)

      }
      callback(null, true)
    }
  }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() photo: Express.Multer.File) {
    return this.usersService.update(+id, updateUserDto, photo);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
