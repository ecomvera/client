import { Button } from "@/components/ui/button";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
      <p className="text-lg text-gray-600 mb-6">Our blog is under development. Stay tuned for updates!</p>
      {/* <Button className="px-6 py-2 text-lg font-semibold">Notify Me</Button> */}
    </div>
  );
}
