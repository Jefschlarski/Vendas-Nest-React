import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCartProduct1707867400689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'cart_product',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'cart_id',
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
                    columnNames: ['cart_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'cart',
                },
                {
                    columnNames: ['product_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'product',
                }    
            ],  
        })
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cart_product');
    }

}
