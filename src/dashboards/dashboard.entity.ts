import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    ForeignKey,
    Length,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from './../users/user.entity';

@Table({
    tableName: 'dashboards',
    underscored: true,
})
export class Dashboard extends Model<Dashboard> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
    })
    userId: string;

    @Length({
        min: 3,
        max: 60,
        msg: `The length of dashboard title can't be shorter than 3 and longer than 60`,
    })
    @Column
    title: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;

    @BelongsTo(() => User)
    user: User;
}
