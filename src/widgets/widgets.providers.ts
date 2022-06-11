import { Widget } from './widget.entity';

export const widgetsProviders = [{ provide: 'WidgetsRepository', useValue: Widget }];
