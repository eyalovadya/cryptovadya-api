import { WidgetType, WIDGET_TYPES } from '../../shared/types/widget-types.type';
import { IsEnum, Validate } from 'class-validator';
import { WidgetDataIntegrity } from '../validation/widget-data.validation';
import { CreateWidgetDataDto } from './create-widget-data.dto';

export class CreateWidgetDto<T extends WidgetType = WidgetType> {
    readonly dashboardId: number;

    @IsEnum(WIDGET_TYPES)
    readonly type: T;

    @Validate(WidgetDataIntegrity)
    readonly data: CreateWidgetDataDto<T>;
}
