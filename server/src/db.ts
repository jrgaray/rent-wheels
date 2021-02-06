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
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
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
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        modelName: 'Car',
        sequelize,
        tableName: 'Car',
        timestamps: false,
    }
)

User.hasMany(Car, { foreignKey: { name: 'userID' } })
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
