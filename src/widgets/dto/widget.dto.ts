import { WidgetData } from './../types/widget-data.type';
import { WidgetType } from './../../shared/types/widget-types.type';
import { Widget } from './../widget.entity';

export class WidgetDto<T extends WidgetType = WidgetType> {
    readonly id: number;

    readonly type: T;

    readonly data: WidgetData<T>;

    readonly createdAt: Date;

    readonly updatedAt: Date;

    constructor(widget: Widget<T>) {
        this.id = widget.id;
        this.type = widget.type;
        this.data = widget.data;
        this.createdAt = widget.createdAt;
        this.updatedAt = widget.updatedAt;
    }
}
