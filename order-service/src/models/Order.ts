import { Schema, model } from "mongoose";
import { Orderv2, OrderElement } from "../interface/interface";

const OrderSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  order: {
    type: [
      {
        menu_name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

export const OrderS = model<Orderv2>("Order", OrderSchema);
