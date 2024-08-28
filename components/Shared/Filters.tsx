import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const colors = ["red", "yellow", "green", "blue", "indigo", "purple", "pink"];

const Filters = () => {
  const [selectedColor, setSelectedColor] = React.useState<string>("red");
  const [selectedItem, setSelectedItem] = React.useState<{ key: string; value: string[] }[]>([]);

  return (
    <>
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger style={{ textDecoration: "none" }}>Gender</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 px-5">
          <Item category="gender" value="men" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Men
          </Item>
          <Item category="gender" value="women" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Women
          </Item>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-none" value="item-2">
        <AccordionTrigger style={{ textDecoration: "none" }}>Sizes</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 px-5">
          <Item category="sizes" value="xs" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            XS
          </Item>
          <Item category="sizes" value="s" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            S
          </Item>
          <Item category="sizes" value="m" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            M
          </Item>
          <Item category="sizes" value="l" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            L
          </Item>
          <Item category="sizes" value="xl" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            XL
          </Item>
          <Item category="sizes" value="2xl" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            2XL
          </Item>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-none" value="item-3">
        <AccordionTrigger style={{ textDecoration: "none" }}>Color</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 px-5">
          {colors.map((color) => (
            <div
              key={color}
              className="w-7 h-7 text-center rounded cursor-pointer"
              style={{
                border: selectedColor === color ? `2px solid ${color}` : "none",
                padding: selectedColor === color ? "1px" : "0",
              }}
              onClick={() => {
                if (selectedColor === color) {
                  setSelectedColor("");
                  return;
                }
                setSelectedColor(color);
              }}
            >
              <div key={color} className={`rounded w-full h-full`} style={{ backgroundColor: color }} />
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-none" value="item-4">
        <AccordionTrigger style={{ textDecoration: "none" }}>Fit</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 px-5">
          <Item category="fit" value="regular_fit" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Regular Fit
          </Item>
          <Item category="fit" value="oversized_fit" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Oversized Fit
          </Item>
          <Item category="fit" value="relaxed_fit" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Relaxed Fit
          </Item>
          <Item category="fit" value="slim_fit" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Slim Fit
          </Item>
          <Item category="fit" value="loose_fit" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Loose Fit
          </Item>
          <Item category="fit" value="extra_loose_fit" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Extra Loose Fit
          </Item>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-none" value="item-5">
        <AccordionTrigger style={{ textDecoration: "none" }}>Sleeve</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 px-5">
          <Item category="sleeve" value="full_sleeve" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Full Sleeve
          </Item>
          <Item category="sleeve" value="half_sleeve" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Half Sleeve
          </Item>
          <Item category="sleeve" value="short_sleeve" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Short Sleeve
          </Item>
          <Item category="sleeve" value="long_sleeve" selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
            Long Sleeve
          </Item>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

const Item = ({
  selectedItem,
  setSelectedItem,
  category,
  value,
  children,
}: {
  selectedItem: {
    key: string;
    value: string[];
  }[];
  setSelectedItem: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        value: string[];
      }[]
    >
  >;
  category: string;
  value: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={`cursor-pointer text-muted-foreground hover:text-foreground ${
        selectedItem === children ? "text-accent font-bold" : ""
      }`}
      onClick={() => {}}
    >
      {children}
    </p>
  );
};

export default Filters;
