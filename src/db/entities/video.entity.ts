import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'videos' })
export class Video {
  @PrimaryGeneratedColumn()
  id!: string;

  @Index()
  @Column('uuid')
  unique_id!: string;

  @Column('varchar', { nullable: false, length: 100 })
  title!: string;

  @Column('varchar', { nullable: false, length: 100 })
  mime_type!: string;

  @Column('text')
  description!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
