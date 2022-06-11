import { WidgetType } from './../../shared/types/widget-types.type';
import { StatCardData } from './stat-card.type';

export type WidgetData<T extends WidgetType = WidgetType> = T extends 'STAT_CARD' ? StatCardData : any;
