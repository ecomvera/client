"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Send } from "lucide-react";
import { Share1Icon } from "@radix-ui/react-icons";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

const ShareModal = ({ pageLink }: { pageLink: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pageLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Share1Icon className="cursor-pointer w-5 h-5  mobile:w-6 mobile:h-6" />
      </DialogTrigger>
      <DialogContent className="w-full max-w-[400px] p-2 bg-transparent border-none">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Share</h3>
          <div className="flex justify-around mt-4">
            <a href={`https://api.whatsapp.com/send?text=${pageLink}`} target="_blank">
              <FaWhatsapp className="w-8 h-8 text-gray-600 hover:text-black" />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${pageLink}`} target="_blank">
              <FaTwitter className="w-8 h-8 text-gray-600 hover:text-black" />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${pageLink}`} target="_blank">
              <FaFacebook className="w-8 h-8 text-gray-600 hover:text-black" />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageLink}`} target="_blank">
              <FaLinkedin className="w-8 h-8 text-gray-600 hover:text-black" />
            </a>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">Page Link</label>
            <div className="flex items-center mt-1">
              <Input value={pageLink} readOnly className="flex-1 text-sm" />
              <Button onClick={handleCopy} variant="ghost" size="icon">
                <Copy className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
            {copied && <p className="text-green-600 text-xs mt-1">Copied!</p>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
