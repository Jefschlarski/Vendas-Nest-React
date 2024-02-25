import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableOrder1708889217763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'order',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'address_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'date',
                    type: 'timestamp without time zone',
                },
                {
                    name: 'payment_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable: false,
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'user',
                },
                {
                    columnNames: ['address_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'address',
                },
                {
                    columnNames: ['payment_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'payment',
                }
            ]
        })
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order');
    }

}
