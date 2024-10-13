import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCreate1728842401300 implements MigrationInterface {
	name = "PostCreate1728842401300";
	public async up(queryRunner: QueryRunner): Promise<void> {
		// Add store_id to product table
		await queryRunner.query(`
      ALTER TABLE "product"
      ADD COLUMN "store_id" character varying,
      ADD CONSTRAINT "FK_product_store" FOREIGN KEY ("store_id") REFERENCES "store"("id");
    `);

		// Add store_id to user table
		await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN "store_id" character varying,
      ADD CONSTRAINT "FK_user_store" FOREIGN KEY ("store_id") REFERENCES "store"("id");
    `);

		// Add is_seller to user table
		await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "is_seller" boolean NOT NULL DEFAULT false;
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// Revert foreign key for store_id in product table
		await queryRunner.query(`
      ALTER TABLE "product"
      DROP CONSTRAINT "FK_product_store",
      DROP COLUMN "store_id";
    `);

		// Revert foreign key for store_id in user table
		await queryRunner.query(`
      ALTER TABLE "user"
      DROP CONSTRAINT "FK_user_store",
      DROP COLUMN "store_id";
    `);

		// Revert is_seller from user table
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_seller";`);
	}
}
