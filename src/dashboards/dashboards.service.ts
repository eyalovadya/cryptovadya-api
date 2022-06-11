import { Widget } from './../widgets/widget.entity';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './../users/user.entity';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { Dashboard } from './dashboard.entity';
import { DashboardDto } from './dto/dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardsService {
    constructor(@Inject('DashboardsRepository') private readonly dashboardsRepository: typeof Dashboard) {}

    async findAll(userId: string) {
        const dashboards = await this.dashboardsRepository.findAll<Dashboard>({ where: { userId } });
        return dashboards.map((dashboard) => new DashboardDto(dashboard));
    }

    async findOne(id: number, userId: string) {
        const dashboard = await this.dashboardsRepository.findOne<Dashboard>({ where: { id, userId }, include: [Widget] });
        if (!dashboard) {
            throw new HttpException('No dashboard found', HttpStatus.NOT_FOUND);
        }
        return new DashboardDto(dashboard);
    }

    async create(userId: string, createDashboardDto: CreateDashboardDto) {
        const dashboard = new Dashboard();
        dashboard.userId = userId;
        dashboard.title = createDashboardDto.title;
        return dashboard.save();
    }

    async update(id: number, userId: string, updateDashboardDto: UpdateDashboardDto) {
        const dashboard = await this.getUserDashboard(id, userId);
        dashboard.title = updateDashboardDto.title || dashboard.title;
        return dashboard.save();
    }

    async delete(id: number, userId: string) {
        const dashboard = await this.getUserDashboard(id, userId);
        await dashboard.destroy();
        return dashboard;
    }

    async getUserDashboard(id: number, userId: string) {
        const dashboard = await this.dashboardsRepository.findByPk<Dashboard>(id);
        if (!dashboard) {
            throw new HttpException('No dashboard found', HttpStatus.NOT_FOUND);
        }
        if (dashboard.userId !== userId) {
            throw new HttpException('You are unauthorized to manage this dashboard', HttpStatus.UNAUTHORIZED);
        }

        return dashboard;
    }
}
