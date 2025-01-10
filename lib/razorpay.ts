import { toast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const makePayment = async (id: string, amount: number) => {
  try {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const res = await fetch("/api/user/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, amount: 1 }),
    }).then((res) => res.json());

    if (!res.ok) {
      console.log("error -", res);
      toast({ description: res.error || "Payment failed", variant: "destructive" });
      await handleUpdateOrderPaymentStatus(id, "PAYMENT_FAILED", res.paymentId);
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
        const data = await fetch("/api/user/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
          body: JSON.stringify({
            orderId: id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          }),
        }).then((res) => res.json());
        if (!data.ok) {
          toast({ description: data.error || "Something went wrong", variant: "destructive" });
          await handleUpdateOrderPaymentStatus(id, "PAYMENT_FAILED");
          return;
        } else {
          toast({ description: "Payment successful", variant: "success" });
        }

        window.location.replace("/myaccount/orders");
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
      console.log(response);
      toast({ description: response.error.description || "Payment failed", variant: "destructive" });
      await handleUpdateOrderPaymentStatus(id, "PAYMENT_FAILED");
    });
  } catch (error) {
    console.error(error);
    toast({ description: "Payment failed", variant: "destructive" });
    await handleUpdateOrderPaymentStatus(id, "PAYMENT_FAILED");
  }
};

const handleUpdateOrderPaymentStatus = async (id: string, status: string, paymentId?: string) => {
  const token = localStorage.getItem("accessToken");
  if (!paymentId) {
    await fetch("/api/user/orders/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    });
  }
  window.location.replace("/myaccount/orders");
};
