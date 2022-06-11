import { WidgetDto } from '../../widgets/dto/widget.dto';
import { Dashboard } from './../dashboard.entity';

export class DashboardDto {
    readonly id: number;

    readonly userId: string;

    readonly title: string;

    readonly widgets: WidgetDto[];

    readonly createdAt: Date;

    readonly updatedAt: Date;

    constructor(dashboard: Dashboard, dashboardWidgets?: WidgetDto[]) {
        this.id = dashboard.id;
        this.title = dashboard.title;
        this.widgets = dashboardWidgets || dashboard.widgets.map((widget) => new WidgetDto(widget));
        this.createdAt = dashboard.createdAt;
        this.updatedAt = dashboard.updatedAt;
    }
}
