import { PartialType } from '@nestjs/swagger';
import { CreateHisobotlarDto } from './create-hisobotlar.dto';

export class UpdateHisobotlarDto extends PartialType(CreateHisobotlarDto) {}
