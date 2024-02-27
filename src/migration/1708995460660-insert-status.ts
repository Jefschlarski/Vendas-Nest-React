import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertStatus1708995460660 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            INSERT INTO public.payment_status (id, name) VALUES ('1', 'Done');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM public.payment_status WHERE id = '1';
        `);
    }

}
