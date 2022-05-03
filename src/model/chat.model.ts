import {
  AutoIncrement,
  Column,
  BelongsTo,
  ForeignKey,
  HasMany,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Message from "./message.model";
import User from "./user.model";

@Table
export default class Chat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint;

  @Column
  @ForeignKey(() => User)
  userId: bigint;

  @Column
  @ForeignKey(() => User)
  friendId: bigint;

  @BelongsTo(() => User, "friendId")
  friend: User;

  @HasMany(() => Message, "chatId")
  messages: Message[];
}
