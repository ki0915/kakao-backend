import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  HasMany
} from "sequelize-typescript";
import Friend from "./friend.model";
import Chat from "./chat.model";

@Table
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: bigint; 

  @AllowNull(false)
  @Column(DataType.STRING(20))
  phone: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  name: string;

  @Default("") //기본 값은 무조건 Column 위에 해줘야 함 안 그럼 오류
  @Column(DataType.STRING(100))
  statusMessage: string;

  @HasMany(() => Friend)
  myFriends: User[];

  @HasMany(() => Chat)
  chats: Chat[];
}
