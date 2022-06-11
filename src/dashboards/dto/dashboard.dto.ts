import { Dashboard } from './../dashboard.entity';

export class DashboardDto {
    readonly id: number;

    readonly userId: string;

    readonly title: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;

    constructor(dashboard: Dashboard) {
        this.id = dashboard.id;
        this.title = dashboard.title;
        this.createdAt = dashboard.createdAt;
        this.updatedAt = dashboard.updatedAt;
    }
}
