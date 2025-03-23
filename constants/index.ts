import {
  BadgeCheck,
  Ban,
  CheckCheck,
  CircleDashed,
  PackageOpen,
  Ship,
  Timer,
  Truck,
  Undo2,
  XCircle,
  RefreshCcwDot,
  RotateCcw,
} from "lucide-react";

export const categories = [
  {
    route: "men",
    label: "Men's Clothing",
  },
  {
    route: "women",
    label: "Women's Clothing",
  },
  {
    route: "kids",
    label: "Kids's Clothing",
  },
  {
    route: "watch",
    label: "Watches",
  },
  {
    route: "accessories",
    label: "Accessories",
  },
];

export const footer = {
  about: [
    {
      label: "About Us",
      route: "about",
    },
    {
      label: "Blogs",
      route: "blogs",
    },
  ],
  company: [
    {
      label: "Our Stores",
      route: "stores",
    },
    {
      label: "Careers",
      route: "careers",
    },
  ],
  help: [
    {
      label: "FAQ",
      route: "faq",
    },
    {
      label: "Contact Us",
      route: "contact-us",
    },
    {
      label: "Privacy Policy",
      route: "privacy-policy",
    },
    {
      label: "Terms & Conditions",
      route: "terms-and-conditions",
    },
    {
      label: "Shipping & Returns",
      route: "shipping-and-returns",
    },
    {
      label: "Cancellation & Refunds",
      route: "cancellation-and-refunds",
    },
  ],
  popularSearches: [
    {
      label: "T-shirts",
      route: "t-shirts",
    },
    {
      label: "Shirts",
      route: "shirts",
    },
    {
      label: "Jeans",
      route: "jeans",
    },
    {
      label: "Sweatshirts",
      route: "sweatshirts",
    },
  ],
  links: [
    {
      label: "Blog",
      route: "blog",
    },
    {
      label: "Careers",
      route: "careers",
    },
    {
      label: "About Us",
      route: "about-us",
    },
    {
      label: "Track Order",
      route: "myaccount/orders",
    },
    {
      label: "Become a Seller",
      route: "become-a-seller",
    },
  ],
};

export const status_options = [
  {
    value: "PAYMENT_PENDING",
    label: "Payment Pending",
    icon: CircleDashed,
    color: "#000000",
  },
  {
    value: "PAYMENT_FAILED",
    label: "Payment Failed",
    icon: CircleDashed,
    color: "#EF4444",
  },
  {
    value: "PROCESSING",
    label: "Processing",
    icon: Timer,
    color: "#3B82F6",
  },
  {
    value: "CONFIRMED",
    label: "Confirmed",
    icon: BadgeCheck,
    color: "#10B981",
  },
  {
    value: "OUT_FOR_PICKUP",
    label: "Out for pickup",
    icon: RefreshCcwDot,
    color: "#10B981",
  },
  {
    value: "PICKED_UP",
    label: "Picked Up",
    icon: CheckCheck,
    color: "#10B981",
  },
  {
    value: "SHIPPED",
    label: "Shipped",
    icon: Ship,
    color: "#10B981",
  },
  {
    value: "IN_TRANSIT",
    label: "In Transit",
    icon: Truck,
    color: "#10B981",
  },
  {
    value: "REACHED_AT_DESTINATION",
    label: "Reached at destination",
    icon: Truck,
    color: "#10B981",
  },
  {
    value: "OUT_FOR_DELIVERY",
    label: "Out for delivery",
    icon: Truck,
    color: "#10B981",
  },
  {
    value: "DELIVERED",
    label: "Delivered",
    icon: PackageOpen,
    color: "#10B981",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
    icon: Ban,
    color: "#EF4444",
  },
  {
    value: "FAILED",
    label: "Failed",
    icon: XCircle,
    color: "#EF4444",
  },
  {
    value: "RETURN_REQUESTED",
    label: "Return Requested",
    icon: Undo2,
    color: "#F59E0B",
  },
  {
    value: "RETURNED",
    label: "Returned",
    icon: RotateCcw,
    color: "#F59E0B",
  },
  {
    value: "REFUNDED",
    label: "Refunded",
    icon: RefreshCcwDot,
    color: "#F59E0B",
  },
];
