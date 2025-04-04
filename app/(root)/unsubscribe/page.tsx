import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function UnsubscribePage({ searchParams }: { searchParams: { email: string } }) {
  const email = searchParams.email;

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      {!email ? (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Please provide an email</CardTitle>
            <CardDescription>Please provide an email to unsubscribe from our mailing list.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Unsubscribed</CardTitle>
            <CardDescription>You have been successfully unsubscribed</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              The email address <span className="font-medium">{email || ""}</span> has been removed from our mailing list.
            </p>
            <p className="text-sm text-muted-foreground">If you change your mind, you can always subscribe again later.</p>
            <div className="mt-6">
              <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Return to homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
