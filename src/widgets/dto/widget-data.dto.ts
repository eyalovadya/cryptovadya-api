import { StatCardDataDto } from '../dto/widget-types/stat-card/stat-card-data.dto';
import { WidgetType } from './../../shared/types/widget-types.type';

export type WidgetDataDto<T extends WidgetType = WidgetType> = T extends 'STAT_CARD' ? StatCardDataDto : any;
