import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { IAttribute, ICategory, IColor, ISize } from "@/types";

interface ISelectedItem {
  key: string;
  value: string[];
}

interface ISetFilters extends React.Dispatch<React.SetStateAction<ISelectedItem[]>> {}

const Filters = ({
  genders,
  subCategories,
  isOffer = false,
  sizes,
  attributes,
  colors,
  filters,
  setFilters,
}: {
  genders?: string[];
  subCategories?: ICategory[];
  isOffer?: boolean;
  sizes: ISize[];
  attributes: IAttribute[];
  colors: IColor[];
  filters: ISelectedItem[];
  setFilters: ISetFilters;
}) => {
  const handleSelectItem = (category: string, value: string) => {
    setFilters((prev) => {
      const index = prev.findIndex((item) => item.key === category);
      if (index === -1) {
        return [...prev, { key: category, value: [value] }];
      }
      if (prev[index].value.includes(value)) {
        const copy = [...prev];
        copy[index] = { ...copy[index], value: copy[index].value.filter((item) => item !== value) };
        if (copy[index].value.length === 0) {
          copy.splice(index, 1); // if the value length is 0, remove the category from the filters
        }
        return copy;
      } else {
        const copy = [...prev];
        copy[index] = { ...copy[index], value: [...copy[index].value, value] };
        return copy;
      }
    });
  };

  return (
    <>
      {subCategories && subCategories?.length > 0 && (
        <AccordionItem className="border-none" value="item-2">
          <AccordionTrigger style={{ textDecoration: "none", fontSize: "16px" }}>Category</AccordionTrigger>
          <AccordionContent className="flex flex-col px-4 p-0">
            {subCategories.map((category) => (
              <Item
                key={category.slug}
                category="category"
                value={category.slug}
                filters={filters}
                handleSelectItem={handleSelectItem}
              >
                {category.name}
              </Item>
            ))}
          </AccordionContent>
        </AccordionItem>
      )}

      {genders && genders?.length > 0 && (
        <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger style={{ textDecoration: "none", fontSize: "16px" }}>Gender</AccordionTrigger>
          <AccordionContent className="flex flex-col px-4 p-0">
            {genders.map((gender) => (
              <Item key={gender} category="gender" value={gender} filters={filters} handleSelectItem={handleSelectItem}>
                {gender}
              </Item>
            ))}
          </AccordionContent>
        </AccordionItem>
      )}

      {colors?.length > 0 && (
        <AccordionItem className="border-none" value="item-3">
          <AccordionTrigger style={{ textDecoration: "none", fontSize: "16px" }}>Colors</AccordionTrigger>
          <AccordionContent className="flex flex-col px-4 p-0">
            {colors.map((color) => (
              <Item
                key={color.id}
                category="colors"
                value={color.name}
                filters={filters}
                handleSelectItem={handleSelectItem}
              >
                <div className="flex justify-between items-center">
                  {color.name}
                  <div className={`rounded w-5 h-5`} style={{ backgroundColor: color.hex }} />
                </div>
              </Item>
            ))}
          </AccordionContent>
        </AccordionItem>
      )}

      {sizes?.length > 0 && (
        <AccordionItem className="border-none" value="item-4">
          <AccordionTrigger style={{ textDecoration: "none", fontSize: "16px" }}>Sizes</AccordionTrigger>
          <AccordionContent className="flex flex-col px-4 p-0">
            {sizes?.map((size) => (
              <Item key={size.id} category="sizes" value={size.value} filters={filters} handleSelectItem={handleSelectItem}>
                {size.value}
              </Item>
            ))}
          </AccordionContent>
        </AccordionItem>
      )}

      {attributes?.map((attribute, index) => (
        <AccordionItem key={attribute.key} className="border-none" value={`item-${index + 4}`}>
          <AccordionTrigger style={{ textDecoration: "none", fontSize: "16px" }}>{attribute.key}</AccordionTrigger>
          <AccordionContent className="flex flex-col px-4 p-0">
            {attribute.value.map((value) => (
              <Item
                key={value}
                category={attribute.key.toLowerCase()}
                value={value}
                filters={filters}
                handleSelectItem={handleSelectItem}
              >
                {value}
              </Item>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
};

const Item = ({
  filters,
  handleSelectItem,
  category,
  value,
  children,
}: {
  filters: ISelectedItem[];
  handleSelectItem: (category: string, value: string) => void;
  category: string;
  value: string;
  children: React.ReactNode;
}) => {
  const isClicked = filters.filter((item) => item.key === category)[0]?.value?.includes(value.replace(" ", "-"));
  return (
    <div
      className={`flex gap-2 items-center px-2 py-1 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted rounded ${
        isClicked ? "text-black font-bold" : ""
      }`}
      onClick={() => handleSelectItem(category, value.replace(" ", "-"))}
    >
      {isClicked ? <ImCheckboxChecked size={16} className="text-primary" /> : <ImCheckboxUnchecked size={16} />}
      <div className="text-base w-full">{children}</div>
    </div>
  );
};

export default Filters;
