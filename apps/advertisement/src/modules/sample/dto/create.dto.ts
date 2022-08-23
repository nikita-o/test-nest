import { ArrayNotEmpty, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags!: string[];

  @IsNumber()
  public likes: number;

  @IsBoolean()
  public isDeleted: boolean;
}
