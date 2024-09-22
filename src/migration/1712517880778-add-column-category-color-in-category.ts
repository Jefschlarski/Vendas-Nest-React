import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AddColumnCategoryColorInCategory1712517880778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table | undefined = await queryRunner.getTable('category');
        const column = new TableColumn({ name: 'category_color', type: 'varchar', default: "'#FFFFFF'"  });

        if (table) {
             await queryRunner.addColumn(table, column);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropColumn('category', 'category_color');
    }

}
