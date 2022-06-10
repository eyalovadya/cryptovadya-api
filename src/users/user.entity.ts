import { Table, Column, Model, Unique, IsEmail, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';

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

    @Column
    firstName: string;

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
}
