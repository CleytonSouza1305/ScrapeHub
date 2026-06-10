import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function GroupInput({
  placeholder,
  value,
  type,
  label,
  id,
  setOnChange,
  icon,
}) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <label className="text-white/60" htmlFor={id}>
        {label}
      </label>
      <div className="w-full relative">
        <input
          className="outline-none border w-full pl-7 pr-4 py-3 rounded-md border-[hsl(244,77%,29%)] hover:border-[#5046E7] focus:border-[#5046E7] focus:ring-1 focus:ring-[#5046E7] transition-all duration-200"
          placeholder={placeholder}
          value={value}
          type={showPassword ? "text" : type}
          id={id}
          onChange={(e) => setOnChange(e.target.value)}
        />
      
        <div className="w-[96%] absolute top-1/2 left-2 -translate-y-1/2 flex items-center justify-between text-white/60 text-[18px] pointer-events-none">
          {icon && <span className="pointer-events-auto">{icon}</span>}
          
          {type === "password" && (
            <span
              className="cursor-pointer pointer-events-auto"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}