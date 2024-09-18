import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const InputField = ({
  control,
  name,
  label,
  defaultValue,
  onChange,
  placeholder,
  leftElement,
  disabled = false,
  type = "text",
}: {
  control?: any;
  name: string;
  label: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  leftElement?: React.ReactNode;
  disabled?: boolean;
  type?: string;
}) => {
  if (!control)
    return (
      <div className="flex flex-col w-full my-2">
        <div className="w-full flex items-center border rounded-md px-2 py-2 relative">
          <Label className="absolute -top-[10px] left-[10px] text-xs mobile:text-sm text-light-1 bg-background px-2">
            {label}*
          </Label>
          {leftElement}
          <Input
            type={type}
            defaultValue={defaultValue}
            onChange={onChange}
            className="text-base border-none outline-none shadow-none focus-visible:ring-transparent disabled:cursor-default disabled:opacity-60"
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      </div>
    );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col w-full my-2">
          <div className="w-full flex items-center border rounded-md px-2 py-2 relative">
            <FormLabel className="absolute -top-[10px] left-[10px] text-xs mobile:text-sm text-light-1 bg-background px-2">
              {label}*
            </FormLabel>
            {leftElement}
            <Input
              type={type}
              className="text-base border-none outline-none shadow-none focus-visible:ring-transparent disabled:cursor-default disabled:opacity-100"
              {...field}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>
          <FormMessage className="mx-2" />
        </div>
      )}
    />
  );
};
export default InputField;
