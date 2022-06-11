import { Dashboard } from './../dashboards/dashboard.entity';
import { Table, Column, Model, Unique, IsEmail, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, Length } from 'sequelize-typescript';

@Table({
    tableName: 'users',
    underscored: true,
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @Length({
        min: 2,
        msg: `The length of user first name can't be shorter than 2`,
    })
    @Column
    firstName: string;

    @Length({
        min: 2,
        msg: `The length of user first name can't be shorter than 2`,
    })
    @Column
    lastName: string;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

    @DeletedAt
    @Column
    deletedAt: Date;

    @HasMany(() => Dashboard)
    dashboard: Dashboard[];
}
