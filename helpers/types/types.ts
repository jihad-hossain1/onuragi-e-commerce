export type User = {
  fullname: string;
  email: string;
  id: string;
  username: string;
  role: Role;
  carts?: Cart[];
  deliveries?: Delivery[];
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
};

enum Role {
  USER = "user",
  ADMIN = "admin",
}

export type Favorite = {
  productID: string;
};

export type Cart = {
  product: string;
  quantity: number;
};

export type Delivery = {
  products: {
    productId: string;
  };
  transactionId: string;
  deliveryAddress: {
    street: String;
    city: String;
    zipCode: String;
  };
};

export type Profile = {
  image: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  deliveryAddress: {
    street: string;
    city: string;
    zipCode: string;
  };
};


export type ProductType = {
  [x: string]: any;
  name: string;
  image: string;
  categoryID: string;
  price: number;
  _id: string;
};

export type ImageType = {
  image: string;
  _id: string;
  productID: string;
};