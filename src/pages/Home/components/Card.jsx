import { useState } from "react";
import { LuBarcode, LuCalendar, LuMapPin, LuX } from "react-icons/lu";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

export default function Card({
  unitilizer,
  quantity,
  destination,
  date,
  objects,
  number,
  isSelectionMode,
  isSelected,
  onSelect,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        onClick={isSelectionMode ? onSelect : undefined}
        className="bg-[#0E121D] border border-white/5 rounded-lg flex flex-col hover:border-[#5046E7]/50 transition-colors"
      >
        <div className="p-5 border-b border-white/5 bg-white/2">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-[#5046E7]">{unitilizer}</h3>
            {!isSelectionMode ? (
              <span className="bg-[#5046E7]/20 text-[#5046E7] text-xs px-2 py-1 rounded-full font-medium">
                {quantity} pacotes
              </span>
            ) : isSelected ? (
              <span className="text-xl text-white bg-red-600 p-1 rounded border border-red-500 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-fade-in">
                <MdCheckBox className="cursor-pointer" />
              </span>
            ) : (
              <span className="text-xl text-white/30 bg-black/40 p-1 rounded border border-white/5 flex items-center justify-center hover:text-red-500/80 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-200">
                <MdCheckBoxOutlineBlank className="cursor-pointer" />
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white/60 text-sm flex items-center gap-2">
              <LuMapPin className="text-white/40" />
              {destination}
            </p>
            <p className="text-[#5046E7] text-lg flex items-center gap-2">
              <LuBarcode />
              {number}
            </p>
          </div>
          <p className="text-white/40 text-xs flex items-center gap-2 mt-1">
            <LuCalendar />
            {date}
          </p>
        </div>

        <div className="p-5 flex-1">
          <p className="text-xs text-white/50 uppercase tracking-wider mb-3">
            Etiquetas:
          </p>
          <ul className="space-y-2">
            {objects.data.slice(0, 4).map((code) => (
              <li
                key={code}
                className="bg-white/5 rounded px-3 py-2 text-sm font-mono text-white/80 border border-white/5"
              >
                {code}
              </li>
            ))}
          </ul>

          {!isSelectionMode && objects.quantity > 4 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="w-full mt-4 text-sm text-[#5046E7] hover:text-white transition-colors cursor-pointer font-medium"
            >
              + Ver mais {objects.quantity - 4} objetos
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#121625] border border-white/10 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl animate-fade-in">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-[#5046E7]">
                  {unitilizer}
                </h4>
                <p className="text-xs text-white/40 mt-0.5">
                  Todos os {quantity} objetos
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer p-1 text-white/50 hover:text-white"
              >
                <LuX className="text-xl" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-2 scrollbar-none">
              {objects.data.map((code) => (
                <div
                  key={code}
                  className="bg-white/5 rounded px-3 py-2 text-sm font-mono text-white/90 border border-white/5"
                >
                  {code}
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/2 border-t border-white/5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-medium rounded-md text-white w-full"
              >
                Fechar Janela
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
