import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablePayment1708819141134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'payment',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'status_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'price',
                    type: 'double precision',
                    isNullable: false,
                },
                {
                    name: 'discount',
                    type: 'double precision',
                    isNullable: false,
                },
                {
                    name: 'final_price',
                    type: 'double precision',
                    isNullable: false,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'amount_payments',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'code',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'date_payment',
                    type: 'timestamp without time zone',
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
                    columnNames: ['status_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'payment_status',
                }    
            ],  
        })
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payment');
    }

}

