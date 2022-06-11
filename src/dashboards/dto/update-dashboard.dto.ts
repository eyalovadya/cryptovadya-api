import { Length, IsString } from 'class-validator';

export class UpdateDashboardDto {
    @IsString()
    @Length(3, 60)
    readonly title: string;
}
