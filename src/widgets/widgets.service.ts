import { Inject, Injectable } from '@nestjs/common';
import { DashboardsService } from '../dashboards/dashboards.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { Widget } from './widget.entity';

@Injectable()
export class WidgetsService {
    constructor(
        @Inject('WidgetsRepository') private readonly widgetsRepository: typeof Widget,
        private readonly dashboardsService: DashboardsService,
    ) {}

    async create(createWidgetDto: CreateWidgetDto, userId: string) {
        const { dashboardId, type, data } = createWidgetDto;

        await this.validateDashboardAuth(dashboardId, userId);

        const widget = new Widget();
        widget.dashboardId = dashboardId;
        widget.type = type;
        widget.data = data;

        return widget.save();
    }

    async delete(id: number, dashboardId: number, userId: string) {
        const widget = await this.getWidget(id, dashboardId, userId);
        await widget.destroy();
        return widget;
    }

    private async getWidget(id: number, dashboardId: number, userId: string) {
        await this.validateDashboardAuth(dashboardId, userId);
        const widget = await this.widgetsRepository.findByPk<Widget>(id);
        return widget;
    }
    private async validateDashboardAuth(dashboardId: number, userId: string) {
        await this.dashboardsService.getUserDashboard(dashboardId, userId);
    }
}
