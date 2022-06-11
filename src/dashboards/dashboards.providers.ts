import { Dashboard } from './dashboard.entity';

export const dashboardsProviders = [{ provide: 'DashboardsRepository', useValue: Dashboard }];
