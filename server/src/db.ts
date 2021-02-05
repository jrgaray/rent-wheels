import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize(process.env.DATABASE_URL ?? '', {
    dialect: 'postgres',
})

class Car extends Model {}
class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
    },
    {
        modelName: 'User',
        sequelize,
        tableName: 'User',
        timestamps: false,
    }
)
Car.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        make: {
            type: DataTypes.STRING,
        },
        model: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
        userID: {
            type: DataTypes.STRING,
        },
    },
    {
        modelName: 'Car',
        sequelize,
        tableName: 'Car',
        timestamps: false,
    }
)

User.hasOne(Car, { foreignKey: { name: 'userID' } })
Car.belongsTo(User, { foreignKey: 'userID' })

export interface DatabaseObject {
    sequelize: Sequelize
    User: typeof User
    Car: typeof Car
}

const db: DatabaseObject = {
    sequelize,
    User,
    Car,
}

export default db
