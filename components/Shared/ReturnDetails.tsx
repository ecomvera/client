import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CgArrowsExchange } from "react-icons/cg";

const ReturnDetails = () => {
  return (
    <Accordion type="single" collapsible className="mt-5">
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <CgArrowsExchange className="h-5 w-5" />
            <div className="text-left">
              <p className="text-base font-semibold">24 Hours Replacement Policy</p>
              <p className="text-muted-foreground">Know more about return & exchange policy</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>Easy returns upto 24 hours of delivery.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ReturnDetails;
