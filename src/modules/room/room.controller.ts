import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RoomService } from './room.service';
import { CreateRoomDto } from './interfaces/create-room.dto';
import { UpdateRoomDto } from './interfaces/update-room.dto';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create room' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findAll() {
    return this.roomService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get one room' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update room' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete room' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
