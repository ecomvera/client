import { toast } from "@/components/ui/use-toast";
import { devLog } from "./utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const razorpayPayment = async ({
  orderNo,
  amount,
  user,
  token,
}: {
  orderNo: string;
  amount: number;
  user: any;
  token: any;
}) => {
  try {
    const res = await fetch("/api/user/payment/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({ orderNo, amount }),
    }).then((res) => res.json());

    console.log({ res });

    if (!res.ok) {
      devLog("error -", res);
      toast({ description: res.error || "Payment failed", variant: "destructive" });
      await handleUpdateOrderPaymentStatus(orderNo, "PAYMENT_FAILED", res.paymentId);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: res.data.amount,
      currency: "INR",
      name: "Silkyester",
      description: "Test Transaction",
      image: "https://www.silkyester.com/favicon.ico",
      order_id: res.data.id,
      handler: async function (response: any) {
        const data = await fetch("/api/user/payment/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
          body: JSON.stringify({
            orderNo: orderNo,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          }),
        }).then((res) => res.json());
        if (!data.ok) {
          devLog("error -", data);
          toast({ description: data.error || "Something went wrong", variant: "destructive" });
          await handleUpdateOrderPaymentStatus(orderNo, "PAYMENT_FAILED");
          return;
        } else {
          toast({ description: "Payment successful", variant: "success" });
        }

        window.location.replace("/order/success?orderNo=" + orderNo + "&paymentMode=Razorpay Payment");
      },

      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },
      theme: {
        color: "#2d2d2d",
      },
    };

    const paymentObject = new window.Razorpay(options);
    await paymentObject.open();
    paymentObject.on("payment.failed", async function (response: any) {
      toast({ description: response.error.description || "Payment failed", variant: "destructive" });
      await handleUpdateOrderPaymentStatus(orderNo, "PAYMENT_FAILED");
    });
  } catch (error) {
    console.error(error);
    toast({ description: "Payment failed", variant: "destructive" });
    await handleUpdateOrderPaymentStatus(orderNo, "PAYMENT_FAILED");
  }
};

const handleUpdateOrderPaymentStatus = async (orderNo: string, status: string, paymentId?: string) => {
  const token = localStorage.getItem("accessToken");
  // if (!paymentId) {
  await fetch("/api/user/orders/status", {
    method: "PUT",
    headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    body: JSON.stringify({ orderNo, status }),
  });
  // }
  window.location.replace("/order/failure?paymentMode=Razorpay Payment");
};
