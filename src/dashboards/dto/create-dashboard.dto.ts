import { Length, IsString } from 'class-validator';

export class CreateDashboardDto {
    @IsString()
    @Length(3, 60)
    readonly title: string;
}
