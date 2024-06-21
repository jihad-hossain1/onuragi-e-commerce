import { toast } from "sonner";

// Define interfaces
interface Product {
  _id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  discount: number;
  quantity: number;
}

interface CartItem {
  productId: string;
  size: string | undefined;
  color: string | undefined;
  quantity: number;
  price: number;
}

// Simulated API call to save cart items to user account
const saveCartToUserAccount = async (
  cartItems: CartItem[]
): Promise<boolean> => {
  // Replace this with your actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.8; // Simulating success 80% of the time
      if (success) {
        resolve(true);
      } else {
        reject(new Error("Failed to save cart items to user account"));
      }
    }, 1000);
  });
};

export const handleAddToCart = async (
  product: Product,
  selectedSize: string | undefined,
  selectedColor: string | undefined,
  cardQuantity: number,
  currentPrice: number,
  isLoggedIn: boolean
) => {
  try {
    // Build cart items from local storage
    const getCartItems = localStorage.getItem("cartItems");
    const cartItems: CartItem[] = getCartItems ? JSON.parse(getCartItems) : [];
    const newItem: CartItem = {
      productId: product._id,
      size: selectedSize,
      color: selectedColor,
      quantity: cardQuantity,
      price: currentPrice,
    };

    // Check if the product already exists in the cart
    const existProduct = cartItems.find(
      (item) =>
        item.productId === product._id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );
    if (existProduct) {
      toast.error("Product already exists in cart", {
        position: "top-right",
        duration: 3000,
        style: {
          background: "red",
          color: "#fff",
        },
      });
    } else {
      // Push new item to cart
      cartItems.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      toast.success("Product added to cart", {
        position: "top-right",
        duration: 3000,
        style: {
          background: "green",
          color: "#fff",
        },
      });

      // If user is logged in, save cart items to user account
      if (isLoggedIn) {
        const savedToUserAccount = await saveCartToUserAccount(cartItems);
        if (savedToUserAccount) {
          // Clear local storage after saving to user account
          localStorage.removeItem("cartItems");
          toast.success("Product added to your account's cart", {
            position: "top-right",
            duration: 3000,
            style: {
              background: "green",
              color: "#fff",
            },
          });
        } else {
          // Handle if saving to user account fails
          throw new Error("Failed to save cart items to user account");
        }
      }
    }
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    toast.error("Failed to add product to cart", {
      position: "top-right",
      duration: 3000,
      style: {
        background: "red",
        color: "#fff",
      },
    });
  }
};

// // cartUtils.ts
// import { toast } from "sonner";

// interface Product {
//   _id: string;
//   name: string;
//   image: string;
//   rating: number;
//   price: number;
//   discount: number;
//   quantity: number;
// }

// interface CartItem {
//   productId: string;
//   size: string | undefined;
//   color: string | undefined;
//   quantity: number;
//   price: number;
// }

// export const handleAddToCart = (
//   product: Product,
//   selectedSize: string | undefined,
//   selectedColor: string | undefined,
//   cardQuantity: number,
//   currentPrice: number
// ) => {
//   // Build cart items on local storage
//   const getCartItems = localStorage.getItem("cartItems");
//   const cartItems: CartItem[] = getCartItems ? JSON.parse(getCartItems) : [];
//   const newItem: CartItem = {
//     productId: product._id,
//     size: selectedSize,
//     color: selectedColor,
//     quantity: cardQuantity,
//     price: currentPrice,
//   };

//   // Check exist cart product
//   const existProduct = cartItems.find(
//     (item) =>
//       item.productId === product._id &&
//       item.size === selectedSize &&
//       item.color === selectedColor
//   );
//   if (existProduct) {
//     toast.error("Product already exists in cart", {
//       position: "top-right",
//       duration: 3000,
//       style: {
//         background: "red",
//         color: "#fff",
//       },
//     });
//   } else {
//     // Push new item to cart
//     cartItems.push(newItem);
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     toast.success("Product added to cart", {
//       position: "top-right",
//       duration: 3000,
//       style: {
//         background: "green",
//         color: "#fff",
//       },
//     });
//   }
// };
