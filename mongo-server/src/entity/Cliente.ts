import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

@Entity()
export class Users {

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    cli_id: Number

    @Column()
    date: Date

}
