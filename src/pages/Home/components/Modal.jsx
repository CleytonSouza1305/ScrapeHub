import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { ImSpinner11 } from "react-icons/im";
import { TiWarningOutline } from "react-icons/ti";

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

export default function Modal({ message, type, showModal, confirmFN }) {
  const typeConfig = {
    success: {
      style: `bg-green-600 text-white hover:bg-green-700 transition duration-200`,
      label: "CONCLUIR",
      Icon: BsCheck2Circle
    },
    error: {
      style: `bg-red-600 text-white hover:bg-red-700 transition duration-200`,
      label: "VOLTAR",
      Icon: MdOutlineReportGmailerrorred
    },
    processing: {
      style: `bg-[#5046E7] text-[#5046E7] hover:bg-[#3831a3] transition duration-200`,
      label: "PROCESSAR DADOS",
      Icon: ImSpinner11
    },
    warning: {
      style: `bg-amber-500 text-white hover:bg-amber-700 transition duration-200`,
      label: "OK",
      Icon: TiWarningOutline
    },
  };

  const dinamicType = typeConfig[type] ?? null

  return (
    <div className="bg-white/90 w-auto p-5 text-black rounded-sm">
      {dinamicType && (
        <span
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full ${dinamicType.split(" ")[0]}`}
        >
          <dinamicType.Icon className={`w-5 h-5`} />
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
