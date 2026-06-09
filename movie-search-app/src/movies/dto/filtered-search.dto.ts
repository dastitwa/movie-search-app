import {
    IsOptional,
    IsString,
    IsNumberString,
  } from 'class-validator';
  
  export class FilteredSearchDto {
    @IsOptional()
    @IsString()
    genre?: string;
  
    @IsOptional()
    @IsString()
    language?: string;
  
    @IsOptional()
    @IsNumberString()
    year?: string;
  }