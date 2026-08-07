import { FiAlertTriangle, FiCheckCircle, FiX } from "react-icons/fi";

function Button({ text, fn, variant = "primary" }) {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-amber-500 text-white hover:bg-amber-600",
    ghost:
      "bg-transparent text-gray-600 hover:bg-gray-100 border border-gray-300",
  };

  return (
    <button onClick={fn} className={`${baseStyles} ${variants[variant]}`}>
      {text}
    </button>
  );
}

export default function Modal({ message, type, showModal }) {
  function confirmFn() {
    alert("Confirmado...");
  }

  const isInfoType = type === "info";
  const isErrorType = type === "error";
  const isSuccessType = type === "success";

  const iconConfig = isErrorType
    ? { Icon: FiX, bg: "bg-red-100", fg: "text-red-600" }
    : isInfoType
      ? { Icon: FiAlertTriangle, bg: "bg-amber-100", fg: "text-amber-600" }
      : isSuccessType
        ? { Icon: FiCheckCircle, bg: "bg-emerald-100", fg: "text-emerald-600" }
        : null;

  return (
    <div className="bg-white/90 w-auto p-5 text-black rounded-sm">
      {iconConfig && (
        <span
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full ${iconConfig.bg}`}
        >
          <iconConfig.Icon className={`w-5 h-5 ${iconConfig.fg}`} />
        </span>
      )}
      <p className="whitespace-pre-line">{message}</p>
      <div className="flex items-end justify-end pt-5 gap-3">
        {isSuccessType && (
          <Button
            text={"CANCELAR"}
            fn={() => showModal(false)}
            variant="danger"
          />
        )}

        <Button
          text={isInfoType ? "OK" : "CONFIRMAR"}
          fn={isInfoType ? () => showModal(false) : confirmFn}
          variant={isInfoType ? "warning" : "success"}
        />
      </div>
    </div>
  );
}
