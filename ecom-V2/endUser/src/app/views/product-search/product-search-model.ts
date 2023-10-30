

    export class OptionDetail {
        attr_name: string;
        attr_grp_name: string;
        opt_name: string;
        opt_val_name: string;
    }

    export class productSearchObject {
        product_id: number;
        sort_order: number;
        image: string;
        name: string;
        description: string;
        model: string;
        cat_name: string;
        meta_title: string;
        meta_description: string;
        price: number;
        manuf_name: string;
        discount_price: number;
        currency_indicator: string;
        discount_off_price: number;
        average_rating: number;
        review_count: number;
        rating_count: number;
        option_status: number;
        recurring_status: number;
        wishlist_status: number;
        wishlist_status_id: number;
        option_details: OptionDetail[];
    }

