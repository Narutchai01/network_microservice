export interface Orderv2 {
    user_id:    string;
    order:      OrderElement[];
    totalPrice: number;
}

export interface OrderElement {
    menu_id:  string;
    quantity: number;
    price:    number;
}
