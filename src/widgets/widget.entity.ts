import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
} from 'sequelize-typescript';
import { WidgetType } from '../shared/types/widget-types.type';
import { Dashboard } from './../dashboards/dashboard.entity';
import { WidgetData } from './types/widget-data.type';

@Table({
    tableName: 'widgets',
    underscored: true,
})
export class Widget<T extends WidgetType = WidgetType> extends Model<Widget<T>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @ForeignKey(() => Dashboard)
    @Column(DataType.BIGINT)
    dashboardId: number;

    @Column
    type: T;

    @Column(DataType.JSONB)
    data: WidgetData<T>;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;

    @BelongsTo(() => Dashboard)
    dashboard: Dashboard;
}
