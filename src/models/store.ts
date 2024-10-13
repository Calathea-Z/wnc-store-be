import { Column, Entity, PrimaryColumn, Index, OneToMany } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { Product } from "./product";

@Entity({ name: "store" })
@Index("IDX_cf9cc6c3f2e6414b992223fff1", ["handle"], {
	unique: true,
	where: "deleted_at IS NULL",
})
@Index("idx_gin_product_description", { synchronize: false })
@Index("idx_gin_product_title", { synchronize: false })
export class Store extends BaseEntity {
	@PrimaryColumn("varchar")
	id: string;

	@Column({ nullable: true })
	external_id: string;

	@Column({ type: "varchar", default: "usd" })
	default_currency_code: string;

	@OneToMany(() => Product, (product) => product.store)
	products: Product[];
}
