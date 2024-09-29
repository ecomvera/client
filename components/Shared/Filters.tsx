import React, { use, useEffect, useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { IAttribute, ICategory, IColor } from "@/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ISelectedItem {
  key: string;
  value: string[];
}

interface ISetFilters extends React.Dispatch<React.SetStateAction<ISelectedItem[]>> {}

const Filters = ({
  genders,
  subCategories,
  sizes,
  attributes,
  colors,
  filters,
  setFilters,
}: {
  genders?: string[];
  subCategories?: ICategory[];
  sizes: string[];
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
          <AccordionTrigger className="hover:no-underline text-[16px] pb-2">Category</AccordionTrigger>
          <AccordionContent className="flex flex-col px-4 p-0">
            <CollapsibleList
              data={subCategories}
              category="category"
              filters={filters}
              handleSelectItem={handleSelectItem}
            />
          </AccordionContent>
        </AccordionItem>
      )}

      {genders && genders?.length > 0 && (
        <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger className="hover:no-underline text-[16px] pb-2">Gender</AccordionTrigger>
          <AccordionContent className="flex flex-col px-4 p-0">
            <CollapsibleList data={genders} category="gender" filters={filters} handleSelectItem={handleSelectItem} />
          </AccordionContent>
        </AccordionItem>
      )}

      {colors?.length > 0 && (
        <AccordionItem className="border-none" value="item-3">
          <AccordionTrigger className="hover:no-underline text-[16px] pb-2">Colors</AccordionTrigger>
          <AccordionContent className="flex flex-col px-4 p-0">
            <CollapsibleList data={colors} category="colors" filters={filters} handleSelectItem={handleSelectItem} />
          </AccordionContent>
        </AccordionItem>
      )}

      {sizes?.length > 0 && (
        <AccordionItem className="border-none" value="item-4">
          <AccordionTrigger className="hover:no-underline text-[16px] pb-2">Sizes</AccordionTrigger>
          <AccordionContent className="flex flex-col px-4 p-0">
            <CollapsibleList data={sizes} category="sizes" filters={filters} handleSelectItem={handleSelectItem} />
          </AccordionContent>
        </AccordionItem>
      )}

      {attributes?.map((attribute, index) => (
        <AccordionItem key={attribute.key} className="border-none" value={`item-${index + 4}`}>
          <AccordionTrigger className="hover:no-underline text-[16px] pb-2">{attribute.key}</AccordionTrigger>
          <AccordionContent className="flex flex-col px-4 p-0">
            <CollapsibleList
              data={attribute.value}
              category={attribute.key}
              filters={filters}
              handleSelectItem={handleSelectItem}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
};

const CollapsibleList = ({
  limit = 5,
  data,
  category,
  filters,
  handleSelectItem,
}: {
  limit?: number;
  data: IColor[] | ICategory[] | string[];
  category: string;
  filters: ISelectedItem[];
  handleSelectItem: (category: string, value: string) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      {data?.slice(0, limit).map((value, index) => (
        <Item key={index} category={category} value={value} filters={filters} handleSelectItem={handleSelectItem} />
      ))}

      {isOpen && (
        <CollapsibleContent>
          {data?.slice(limit).map((value, index) => (
            <Item key={index} category={category} value={value} filters={filters} handleSelectItem={handleSelectItem} />
          ))}
        </CollapsibleContent>
      )}

      {data.length > limit && (
        <CollapsibleTrigger asChild>
          <span className="font-semibold text-blue-600 text-base">{isOpen ? "Less" : "More"}</span>
        </CollapsibleTrigger>
      )}
    </Collapsible>
  );
};

const Item = ({
  filters,
  handleSelectItem,
  category,
  value,
}: {
  filters: ISelectedItem[];
  handleSelectItem: (category: string, value: string) => void;
  category: string;
  value: IColor | ICategory | string;
}) => {
  // @ts-ignore
  const { name, slug, hex } = value as IColor | ICategory;
  const [values, setValues] = useState<{ key: string; value: string; hex?: string }>({ key: "", value: "", hex: "" });

  useEffect(() => {
    if (typeof value === "object") {
      if (category === "colors") {
        setValues({ key: name, value: name, hex: hex });
      } else {
        setValues({ key: name, value: slug });
      }
    } else {
      setValues({ key: value, value: value });
    }
  }, []);

  const isClicked = filters.filter((item) => item.key === category)[0]?.value?.includes(values?.value.replace(" ", "-"));
  return (
    <div
      className={`flex gap-2 items-center px-2 py-1 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted rounded ${
        isClicked ? "text-black font-bold" : ""
      }`}
      onClick={() => handleSelectItem(category, values?.value?.replace(" ", "-"))}
    >
      {isClicked ? <ImCheckboxChecked size={16} className="text-primary" /> : <ImCheckboxUnchecked size={16} />}
      {category === "colors" ? (
        <div className="flex justify-between items-center w-full">
          {values.key}
          <div className={`rounded w-5 h-5`} style={{ backgroundColor: values.hex }} />
        </div>
      ) : (
        <div className="text-base w-full">{values.key}</div>
      )}
    </div>
  );
};

export default Filters;
