import {
	Column,
	Entity,
	PrimaryColumn,
	Index,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { Store } from "./store";

@Entity({ name: "product" })
@Index("IDX_cf9cc6c3f2e6414b992223fff1", ["handle"], {
	unique: true,
	where: "deleted_at IS NULL",
})
@Index("idx_gin_product_description", { synchronize: false })
@Index("idx_gin_product_title", { synchronize: false })
export class Product extends BaseEntity {
	@PrimaryColumn("varchar")
	id: string;

	@Column({ nullable: true })
	external_id: string;

	@ManyToOne(() => Store, (store) => store.products)
	@JoinColumn({ name: "store_id" })
	store: Store;
}
