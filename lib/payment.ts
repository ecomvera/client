import { toast } from "@/components/ui/use-toast";
import { razorpayPayment } from "./razorpay";
import { payuPayment } from "./payu";

export const makePayment = async ({
  orderNo,
  amount,
  user,
  token,
  gateway,
}: {
  orderNo: string;
  amount: number;
  user: any;
  token: any;
  gateway: "razorpay" | "payu";
}) => {
  try {
    if (!orderNo || !amount || !user || !token || !gateway) {
      toast({ description: "Not enough details", variant: "destructive" });
      return;
    }

    if (gateway === "razorpay") {
      await razorpayPayment({ orderNo, amount, user, token });
    } else if (gateway === "payu") {
      await payuPayment({ orderNo, amount, user, token });
    } else {
      toast({ description: "Wrong payment gateway", variant: "destructive" });
    }
  } catch (error) {
    console.log("Error in payment", error);
    toast({ description: "Something went wrong", variant: "destructive" });
  }
};
