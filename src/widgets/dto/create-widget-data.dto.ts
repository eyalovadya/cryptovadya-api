import { WidgetType } from '../../shared/types/widget-types.type';
import { CreateStatCardDataDto } from './widget-types/stat-card/create-stat-card-data.dto';

export type CreateWidgetDataDto<T extends WidgetType = WidgetType> = T extends 'STAT_CARD' ? CreateStatCardDataDto : any;
