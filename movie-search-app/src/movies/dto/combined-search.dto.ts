import {
    IsOptional,
    IsString,
    IsNumberString,
  } from 'class-validator';
  
  export class CombinedSearchDto {
    @IsString()
    q: string;
  
    @IsOptional()
    @IsString()
    genre?: string;
  
    @IsOptional()
    @IsNumberString()
    year?: string;
  }