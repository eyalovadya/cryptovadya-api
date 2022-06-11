import { WidgetData } from './../types/widget-data.type';
import { WidgetType, WIDGET_TYPES } from '../../shared/types/widget-types.type';
import { Length, IsString, IsEnum, Validate } from 'class-validator';
import { WidgetDataIntegrity } from '../validation/widget-data.validation';

export class CreateWidgetDto<T extends WidgetType = WidgetType> {
    readonly dashboardId: number;

    @IsEnum(WIDGET_TYPES)
    readonly type: T;

    @Validate(WidgetDataIntegrity)
    readonly data: WidgetData<T>;
}
