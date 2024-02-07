import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  recordCreatedAt: Date = new Date();

  @Column({
    type: 'timestamp',
  })
  recordUpdatedAt: Date = new Date(new Date(new Date()).setMilliseconds(0));

  @BeforeUpdate()
  updateDates() {
    this.recordUpdatedAt = new Date();
  }
}
