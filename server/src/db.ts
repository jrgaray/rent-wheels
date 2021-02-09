import { Sequelize, Model, DataTypes } from 'sequelize'

// Type guard.
if (!process.env.DATABASE_URL) throw new Error('No database url defined.')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
})

class Car extends Model {
    public id!: string
    public model!: string
    public vin!: string
    public year!: string
    public isActive!: boolean
    public make!: string
    public userID!: string
}
class User extends Model {
    public id!: string
    public username!: string
    public email!: string
    public password!: string
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            allowNull: false,
            unique: true,
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
        sequelize,
        tableName: 'User',
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
        sequelize,
        tableName: 'Car',
    }
)
// Many to One Relationship
User.hasMany(Car, { foreignKey: 'userID' })
Car.belongsTo(User, { foreignKey: 'userID' })

// sequelize.addModels([User, Car])
export interface DatabaseObject {
    sequelize: Sequelize
    User: typeof User
    Car: typeof Car
}

const db = {
    sequelize,
    User,
    Car,
}

export default db
