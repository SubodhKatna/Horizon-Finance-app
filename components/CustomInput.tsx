import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Control, FieldPath } from "react-hook-form";
import { Schema, z } from "zod";
import { authFormSchema } from "@/lib/utils";

// Dynamically infer schema type
  const schema = authFormSchema('sign-up');

interface CustomInputProps {
  control: Control<z.infer<typeof schema>>;
  name: FieldPath<z.infer<typeof schema>>;
  label: string;
  placeholder: string;
  type?: string;
}

const CustomInput = ({ control, name, label, placeholder, type }: CustomInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordField = name.toLowerCase().includes("password");

  const getInputType = () => {
    if (isPasswordField) return showPassword ? "text" : "password";
    if (name.toLowerCase() === "dateofbirth") return "date"; // DOB as date picker
    return type || "text";
  };


  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <div className="relative">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  className={`input-class ${isPasswordField ? "pr-10" : ""}`}
                  type={getInputType()}
                  {...field}
                />
              </FormControl>

              {isPasswordField && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  onKeyDown={(e) => e.key === "Enter" && setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              )}
            </div>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
