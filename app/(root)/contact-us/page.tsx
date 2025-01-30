import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  return (
    <div className="max-w-desktop mx-auto px-2 py-24">
      <h1 className="text-xl md:text-2xl">Contact Us</h1>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <Input placeholder="Your Name" />
          <Input placeholder="Your Email" />
          <Textarea rows={5} placeholder="Your Message" />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Page;
