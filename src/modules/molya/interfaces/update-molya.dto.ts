import { PartialType } from '@nestjs/swagger';
import { CreateMolyaDto } from './create-molya.dto';

export class UpdateMolyaDto extends PartialType(CreateMolyaDto) {}
