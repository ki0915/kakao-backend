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
import User from "./user.model";
import Chat from "./chat.model";

@Table
export default class Message extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint;

  @Column
  @ForeignKey(() => User)
  senderId: bigint;

  @Column
  @ForeignKey(() => Chat)
  chatId: bigint;

  @Column(DataType.STRING(2048))
  message: string;

  @Column(DataType.BOOLEAN)
  isReade: boolean;
}
