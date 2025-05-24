import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { nullable: false, unique: true, length: 100 })
  email!: string;

  @Column('varchar', { nullable: false, length: 255 })
  password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
