import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableCart1707868792826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('cart');
        if (table) {
            await queryRunner.addColumn('cart', new TableColumn({name :'active', type: 'boolean', isNullable: false}));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('cart', 'active');
    }

}
