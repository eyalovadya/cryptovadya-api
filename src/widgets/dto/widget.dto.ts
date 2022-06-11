import { WidgetType } from './../../shared/types/widget-types.type';
import { Widget } from './../widget.entity';
import { WidgetDataDto } from './widget-data.dto';

export class WidgetDto<T extends WidgetType = WidgetType> {
    readonly id: number;

    readonly dashboardId: number;

    readonly type: T;

    readonly data: WidgetDataDto<T>;

    readonly createdAt: Date;

    readonly updatedAt: Date;

    constructor(widget: Widget<T>, additionalDataProps?: any) {
        this.id = widget.id;
        this.dashboardId = widget.dashboardId;
        this.type = widget.type;

        if (this.type === 'STAT_CARD') {
            this.data = { ...widget.data, ...additionalDataProps };
        }

        this.createdAt = widget.createdAt;
        this.updatedAt = widget.updatedAt;
    }
}
