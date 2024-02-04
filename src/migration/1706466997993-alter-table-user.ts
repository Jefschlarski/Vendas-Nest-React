import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableUser1706466997993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('user');
        if (table) {
            await queryRunner.changeColumn('user', 'email', new TableColumn({name :'email', type: 'varchar', isNullable: false, isUnique: true}));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('user');
        if (table) {
            const column = table.findColumnByName('email');
            if (column) {
                column.isUnique = false;
                await queryRunner.changeColumn('user', 'email', column);
            }
        }
    }

}
