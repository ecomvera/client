import React, { useEffect, useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { IAttribute, ICategory, ICollection, IColor } from "@/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ISelectedItem {
  key: string;
  value: string[];
}

type SetFilters = React.Dispatch<React.SetStateAction<ISelectedItem[]>>;

interface FiltersProps {
  genders?: string[];
  productTypes?: string[];
  sizes: string[];
  attributes: IAttribute[];
  colors: IColor[];
  filters: ISelectedItem[];
  setFilters: SetFilters;
}

interface ItemValue {
  key: string;
  value: string;
  hex?: string;
}

const Filters: React.FC<FiltersProps> = ({ genders, productTypes, sizes, attributes, colors, filters, setFilters }) => {
  const handleSelectItem = React.useCallback(
    (category: string, value: string) => {
      setFilters((prev) => {
        const index = prev.findIndex((item) => item.key === category);
        if (index === -1) {
          return [...prev, { key: category, value: [value] }];
        }
        if (prev[index].value.includes(value)) {
          const copy = [...prev];
          copy[index] = { ...copy[index], value: copy[index].value.filter((item) => item !== value) };
          if (copy[index].value.length === 0) {
            copy.splice(index, 1);
          }
          return copy;
        } else {
          const copy = [...prev];
          copy[index] = { ...copy[index], value: [...copy[index].value, value] };
          return copy;
        }
      });
    },
    [setFilters]
  );

  return (
    <>
      {genders && genders.length > 0 && (
        <AccordionItem className="border-none" value="item-1">
          <AccordionTriggerItem value="Gender" />
          <AccordionContent className="flex flex-col px-4 p-0">
            <CollapsibleList data={genders} category="gender" filters={filters} handleSelectItem={handleSelectItem} />
          </AccordionContent>
        </AccordionItem>
      )}

      {productTypes && productTypes.length > 0 && (
        <AccordionItem className="border-none" value="item-2">
          <AccordionTriggerItem value="Category" />
          <AccordionContent className="flex flex-col px-4 p-0">
            <CollapsibleList data={productTypes} category="category" filters={filters} handleSelectItem={handleSelectItem} />
          </AccordionContent>
        </AccordionItem>
      )}

      {colors && colors.length > 0 && (
        <AccordionItem className="border-none" value="item-3">
          <AccordionTriggerItem value="Colors" />
          <AccordionContent className="flex flex-col px-4 p-0">
            <CollapsibleList data={colors} category="color" filters={filters} handleSelectItem={handleSelectItem} />
          </AccordionContent>
        </AccordionItem>
      )}

      {sizes && sizes.length > 0 && (
        <AccordionItem className="border-none" value="item-4">
          <AccordionTriggerItem value="Sizes" />
          <AccordionContent className="flex flex-col px-4 p-0">
            <CollapsibleList data={sizes} category="size" filters={filters} handleSelectItem={handleSelectItem} />
          </AccordionContent>
        </AccordionItem>
      )}

      {attributes?.map((attribute, index) => (
        <AccordionItem key={attribute.id} className="border-none" value={`item-${index + 5}`}>
          <AccordionTriggerItem value={attribute.key} />
          <AccordionContent className="flex flex-col px-4 p-0">
            <CollapsibleList
              data={attribute.value}
              category={attribute.key.toLowerCase()}
              filters={filters}
              handleSelectItem={handleSelectItem}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
};

const AccordionTriggerItem = ({ value }: { value: string }) => {
  return (
    <AccordionTrigger className="hover:no-underline text-[16px] pb-2 text-left">
      <span className="line-clamp-2">{value}</span>
    </AccordionTrigger>
  );
};

interface CollapsibleListProps {
  limit?: number;
  data: IColor[] | string[];
  category: string;
  filters: ISelectedItem[];
  handleSelectItem: (category: string, value: string) => void;
}

const CollapsibleList: React.FC<CollapsibleListProps> = ({ limit = 5, data, category, filters, handleSelectItem }) => {
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
          <span className="font-semibold text-[--c1] text-base">{isOpen ? "Less" : "More"}</span>
        </CollapsibleTrigger>
      )}
    </Collapsible>
  );
};

interface ItemProps {
  filters: ISelectedItem[];
  handleSelectItem: (category: string, value: string) => void;
  category: string;
  value: IColor | ICollection | string;
}

const Item: React.FC<ItemProps> = ({ filters, handleSelectItem, category, value }) => {
  const [values, setValues] = useState<ItemValue>({ key: "", value: "" });

  useEffect(() => {
    if (typeof value === "object" && value !== null) {
      if (category === "color" && "name" in value && "hex" in value) {
        const colorValue = value as IColor;
        setValues({
          key: colorValue.name,
          value: colorValue.name,
          hex: colorValue.hex,
        });
      } else if ("name" in value && "slug" in value) {
        const collectionValue = value as ICollection;
        setValues({ key: collectionValue.name, value: collectionValue.slug });
      }
    } else {
      setValues({ key: String(value), value: String(value) });
    }
  }, [value, category]);

  const isClicked = filters.filter((item) => item.key === category)[0]?.value?.includes(values.value);

  return (
    <div
      className={`flex gap-2 items-center px-2 py-1 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted rounded ${
        isClicked ? "text-black font-bold" : ""
      }`}
      onClick={() => handleSelectItem(category, values.value)}
    >
      {isClicked ? <ImCheckboxChecked size={16} className="text-primary" /> : <ImCheckboxUnchecked size={16} />}
      {category === "color" ? (
        <div className="flex justify-between items-center w-full">
          {values.key}
          <div className="rounded w-5 h-5 border" style={{ backgroundColor: values.hex }} />
        </div>
      ) : (
        <div className="text-base w-full">{values.key}</div>
      )}
    </div>
  );
};

export default Filters;
