import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableOrderProduct1708889226415 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'order_product',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'order_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'product_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'amount',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'price',
                    type: 'double precision',
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
                    columnNames: ['order_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'order',
                },
                {
                    columnNames: ['product_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'product',
                }
            ]
        })
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_product');
    }

}
