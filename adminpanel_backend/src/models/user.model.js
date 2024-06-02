import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "teacher", "student"),
      defaultValue: "admin", // Default role is admin
    },
    number: {
      type: DataTypes.STRING,
      defaultValue: "1111111111",
    },
    refreshToken: {
      type: DataTypes.STRING, // Define a column to store refresh tokens
    },
    forgetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

// Middleware to hash password before saving
User.beforeCreate(async (user, options) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Custom method to check if password is correct
User.prototype.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Custom method to generate access token
User.prototype.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this.id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Default to 15 minutes
    }
  );
};

// Custom method to generate refresh token
User.prototype.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Default to 7 days
    }
  );
};

// Method to generate and save access and refresh tokens
User.prototype.generateAndSaveTokens = async function () {
  const accessToken = this.generateAccessToken();
  const refreshToken = this.generateRefreshToken();
  this.refreshToken = refreshToken;
  await this.save({ validate: false });
  return { accessToken, refreshToken };
};

export default User;
