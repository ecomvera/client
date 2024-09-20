import React from "react";
import { FiFilter } from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ICategory } from "@/types";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { Button } from "../ui/button";

interface ISelectedItem {
  key: string;
  value: string[];
}

interface ISetFilters extends React.Dispatch<React.SetStateAction<ISelectedItem[]>> {}

const MobileFilters = ({
  subCategories,
  isOffer = false,
  sizes = [],
  attributes = [],
  colors = [],
  filters,
  setFilters,
}: {
  subCategories?: ICategory[];
  isOffer?: boolean;
  sizes: string[];
  attributes: { key: string; value: string[] }[];
  colors: string[];
  filters: ISelectedItem[];
  setFilters: ISetFilters;
}) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const isFilterSelected = (category: string) => filters.findIndex((item) => item.key === category);

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
    <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <DrawerTitle className="hidden">Filters</DrawerTitle>
      <DrawerTrigger className="w-full border border-border" onClick={() => setIsFilterOpen(true)}>
        <span className={`${filters.length > 0 && "font-semibold"}`}>
          <FiFilter className="inline mr-1 w-5 h-5" />
          Filters
          <span className="ml-1">({filters.length})</span>
        </span>
      </DrawerTrigger>
      <DrawerContent className="px-5 mb-4 max-h-[60vh] border-none" aria-describedby={undefined}>
        <Tabs
          defaultValue={subCategories && subCategories.length > 0 ? "category" : "color"}
          className="flex overflow-scroll hide-scrollbar"
        >
          <TabsList className="flex flex-col gap-2 h-full">
            {subCategories && subCategories.length > 0 && (
              <TabItem name="Categories" value="category" isFilterSelected={isFilterSelected} />
            )}
            <TabItem name="Colors" value="color" isFilterSelected={isFilterSelected} />
            <TabItem name="Sizes" value="sizes" isFilterSelected={isFilterSelected} />
            {attributes.map((attribute) => (
              <TabItem key={attribute.key} name={attribute.key} value={attribute.key} isFilterSelected={isFilterSelected} />
            ))}
          </TabsList>

          <div className="px-2 w-full">
            {subCategories && subCategories.length > 0 && (
              <TabsContent value="category">
                {subCategories &&
                  subCategories.map((category) => (
                    <Item
                      key={category.name}
                      category="category"
                      value={category.slug}
                      filters={filters}
                      handleSelectItem={handleSelectItem}
                    >
                      {category.name}
                    </Item>
                  ))}
              </TabsContent>
            )}
            <TabsContent value="color">
              {colors.map((color) => (
                <Item key={color} category="color" value={color} filters={filters} handleSelectItem={handleSelectItem}>
                  <div className="w-5 h-5 rounded" style={{ backgroundColor: color }} />
                  <p>{color}</p>
                </Item>
              ))}
            </TabsContent>
            <TabsContent value="sizes">
              {sizes.map((size) => (
                <Item key={size} category="sizes" value={size} filters={filters} handleSelectItem={handleSelectItem}>
                  {size}
                </Item>
              ))}
            </TabsContent>
            {attributes.map((attribute) => (
              <TabsContent value={attribute.key} key={attribute.key}>
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
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <div className="flex gap-2">
          <Button
            onClick={() => setFilters([])}
            disabled={!filters.length}
            className="w-full mt-2 text-base"
            variant="destructive"
          >
            Clear All
          </Button>
          <Button className="w-full mt-2" variant="outline" onClick={() => setIsFilterOpen(false)}>
            Close
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const TabItem = ({
  name,
  value,
  isFilterSelected,
}: {
  name: string;
  value: string;
  isFilterSelected: (category: string) => number;
}) => {
  const isSelected = isFilterSelected(value.toLowerCase()) > -1;
  return (
    <TabsTrigger
      className={`relative w-full py-2 justify-start ${isSelected && "text-primary font-semibold"}`}
      value={value}
    >
      {isSelected && <span className="inline-block absolute top-1 left-1 w-2 h-2 bg-primary rounded-full"></span>}
      {name}
    </TabsTrigger>
  );
};

const Item = ({
  children,
  value,
  filters,
  handleSelectItem,
  category,
}: {
  children: React.ReactNode;
  value: string;
  filters: ISelectedItem[];
  handleSelectItem: (category: string, value: string) => void;
  category: string;
}) => {
  const isClicked = filters.filter((item) => item.key === category)[0]?.value?.includes(value.replace(" ", "-"));
  return (
    <div onClick={() => handleSelectItem(category, value.replace(" ", "-"))}>
      <div key={value} className="flex justify-between items-center mb-2">
        <label
          htmlFor={value}
          className="text-sm mobile:text-base flex items-center gap-2 font-semibold text-muted-foreground"
        >
          {children}
        </label>
        {isClicked ? <ImCheckboxChecked size={16} className="text-primary" /> : <ImCheckboxUnchecked size={16} />}
      </div>
    </div>
  );
};

export default MobileFilters;
