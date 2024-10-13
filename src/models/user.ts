import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { User as MedusaUser } from "@medusajs/medusa";
import { Store } from "../models/store";

@Entity()
export class User extends MedusaUser {
	@OneToOne(() => Store)
	@JoinColumn({ name: "store_id" })
	store: Store;

	@Column({ type: "boolean", default: false })
	is_seller: boolean;
}
