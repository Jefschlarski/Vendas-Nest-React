import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCart1707853022833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'cart',
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
                }    
            ],  
        })
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cart');
    }

}
