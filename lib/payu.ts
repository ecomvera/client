import { toast } from "@/components/ui/use-toast";

export const payuPayment = async ({
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
    const data = await fetch("/api/user/payment/payu", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token.access}` },
      body: JSON.stringify({
        amount: amount,
        email: user?.email || "",
        firstName: user?.name || "",
        mobile: user?.phone || "",
        orderNo: orderNo,
      }),
    });
    if (!data.ok) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    // try {
    //   const res = await data.json();
    //   if (!res.ok) {
    //     toast({
    //       description: res.error || "Something went wrong",
    //       variant: "destructive",
    //     });
    //     return;
    //   }
    // } catch (error) {}

    const html = await data.text();

    document.open();
    document.write(html);
    document.close();

    // // open a new window
    // const newWindow = window.open();
    // newWindow?.document.write(html);
    // newWindow?.document.close();
  } catch (error: any) {
    console.log("error -", error);
    toast({
      description: "Something went wrong",
      variant: "destructive",
    });
  }
};
