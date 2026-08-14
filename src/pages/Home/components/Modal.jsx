import { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { ImSpinner11 } from "react-icons/im";
import { TiWarningOutline } from "react-icons/ti";

function Button({ text, fn, style, disabled }) {
  const baseStyles =
    "px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:active:scale-100";

  return (
    <button onClick={fn} disabled={disabled} className={`${baseStyles} ${style}`}>
      {text}
    </button>
  );
}

export default function Modal({ message, type, showModal, confirmFn, reloadPageFn }) {
  const typeConfig = {
    success: {
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      solid:
        "bg-emerald-600 hover:bg-emerald-700 text-white focus-visible:ring-emerald-500",
      label: "CONCLUIR",
      Icon: BsCheck2Circle,
    },
    error: {
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      solid: "bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500",
      label: "VOLTAR",
      Icon: MdOutlineReportGmailerrorred,
    },
    processing: {
      iconBg: "bg-[#5046E7]/10",
      iconColor: "text-[#5046E7]",
      solid:
        "bg-[#5046E7] hover:bg-[#3831a3] text-white focus-visible:ring-[#5046E7]",
      label: "PROCESSAR DADOS",
      Icon: ImSpinner11,
    },
    warning: {
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      solid:
        "bg-amber-500 hover:bg-amber-600 text-white focus-visible:ring-amber-500",
      label: "OK",
      Icon: TiWarningOutline,
    },
  };

  const dinamicType = typeConfig[type] ?? null;

  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await confirmFn();
    } finally {
      setIsConfirming(false);
    }
  };

  const ghostStyle =
    "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus-visible:ring-gray-300 shadow-none";

  return (
    <div className="bg-white w-full max-w-100px max-h-[85vh] flex flex-col text-black rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto flex items-start gap-4 p-6">
        {dinamicType && (
          <span
            className={`inline-flex shrink-0 items-center justify-center w-12 h-12 rounded-full ${dinamicType.iconBg}`}
          >
            <dinamicType.Icon
              className={`w-6 h-6 ${dinamicType.iconColor} ${
                type === "processing" ? "animate-spin" : ""
              }`}
            />
          </span>
        )}
        <p className="whitespace-pre-line text-lg leading-relaxed text-gray-700 pt-2.5 font-medium">
          {message}
        </p>
      </div>

      <div className="shrink-0 flex items-center justify-end gap-3 px-6 pb-6 pt-4 border-t border-gray-100">
        {(type === "success" || type === "error" || type === "warning") && (
          <Button
            text={dinamicType.label}
            fn={() => type !== "success" ? showModal(false) : reloadPageFn((v) => v + 1)}
            style={dinamicType.solid}
          />
        )}

        {type === "processing" && (
          <>
            <Button
              text={"CANCELAR"}
              fn={() => showModal(false)}
              style={ghostStyle}
              disabled={isConfirming}
            />

            <Button
              text={isConfirming ? "PROCESSANDO..." : dinamicType.label}
              fn={handleConfirm}
              style={dinamicType.solid}
              disabled={isConfirming}
            />
          </>
        )}
      </div>
    </div>
  );
}