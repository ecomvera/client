import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Moon/Space Visual */}
        <div className="relative">
          <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-2xl relative overflow-hidden">
            {/* Moon craters */}
            <div className="absolute top-8 left-12 w-6 h-6 rounded-full bg-slate-400 opacity-60"></div>
            <div className="absolute top-20 right-16 w-4 h-4 rounded-full bg-slate-400 opacity-40"></div>
            <div className="absolute bottom-16 left-20 w-8 h-8 rounded-full bg-slate-400 opacity-50"></div>
            <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-slate-400 opacity-60"></div>

            {/* Landing module */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Rocket className="w-8 h-8 text-slate-600 rotate-180" />
            </div>
          </div>

          {/* Stars */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-8 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-12 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-20 left-4 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
            <div className="absolute bottom-8 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
            <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white mb-2">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-200 mb-4">Houston, we have a problem</h2>
          <p className="text-lg text-slate-300 max-w-md mx-auto leading-relaxed">
            Looks like you've landed on the wrong side of the moon. This page doesn't exist in our galaxy.
          </p>
        </div>

        {/* Mission Control Message */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-slate-300 text-sm mb-4">
            <span className="text-green-400 font-mono">MISSION CONTROL:</span> Navigation systems show you're off course.
            Recommend immediate return to base station.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return to Base
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            <Link href="javascript:history.back()" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous Location
            </Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="pt-8 text-slate-500 text-sm">
          <p>Lost in space? Contact mission control for assistance.</p>
        </div>
      </div>
    </div>
  );
}
