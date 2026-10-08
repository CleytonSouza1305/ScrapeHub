import { useState } from "react";
import { LuPackage, LuX } from "react-icons/lu";

const FILTERS = [
  {
    content: "SEDEX",
    active:
      "bg-gradient-to-b from-rose-400 to-rose-600 text-white ring-1 ring-inset ring-white/25 shadow-[0_0_20px_-4px_rgba(244,63,94,0.7)]",
    inactive: "text-white/50 hover:bg-rose-500/10 hover:text-rose-300",
    dotActive: "bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]",
    dotInactive: "bg-rose-400/40 group-hover:bg-rose-400",
  },
  {
    content: "PAC",
    active:
      "bg-gradient-to-b from-cyan-500 to-cyan-700 text-white ring-1 ring-inset ring-white/25 shadow-[0_0_20px_-4px_rgba(6,182,212,0.7)]",
    inactive: "text-white/50 hover:bg-cyan-500/10 hover:text-cyan-300",
    dotActive: "bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]",
    dotInactive: "bg-cyan-400/40 group-hover:bg-cyan-400",
  },
  {
    content: "TODOS",
    active:
      "bg-gradient-to-b from-[#6A61F0] to-[#5046E7] text-white ring-1 ring-inset ring-white/25 shadow-[0_0_20px_-4px_rgba(80,70,231,0.8)]",
    inactive: "text-white/50 hover:bg-white/10 hover:text-white",
    dotActive: "bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]",
    dotInactive: "bg-white/25 group-hover:bg-white/70",
  },
];

async function getPending() {
  try {
    
  } catch (e) {
    console.log(`Erro ao buscar objetos pendentes:`, e)
    
  }
}

function NavigationContent({ filters, selected, onSelect }) {
  return (
    <nav>
      <ul className="flex gap-1.5 rounded-xl border border-white/5 bg-black/20 p-1.5">
        {filters.map((item) => {
          const isActive = selected === item.content;

          return (
            <li key={item.content} className="flex-1">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(item.content)}
                className={`group flex w-full cursor-pointer items-center gap-7 rounded-lg px-4 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-95 ${
                  isActive ? item.active : item.inactive
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                    isActive ? item.dotActive : item.dotInactive
                  }`}
                />
                {item.content}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function PostedObjectsModal({ onClose }) {
  const [selected, setSelected] = useState(FILTERS[0].content);

  const [modal, setModal] = useState(false)

  return (
    <div
      onClick={() => onClose(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="posted-objects-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in flex max-h-[80vh] w-full max-w-lg flex-col rounded-xl border border-white/10 bg-[#121625] shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5046E7]/15 text-[#8B85F5] ring-1 ring-inset ring-[#5046E7]/30">
              <LuPackage className="text-xl" />
            </div>
            <div>
              <h3
                id="posted-objects-title"
                className="text-lg font-bold leading-tight text-white"
              >
                Objetos Postados não Vinculados
              </h3>
              <p className="text-xs text-white/50">
                Selecione um tipo de serviço para filtrar
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Fechar modal"
            onClick={onClose}
            className="cursor-pointer rounded-md p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LuX className="text-xl" />
          </button>
        </header>

        <section className="px-5 py-4">
          <NavigationContent
            filters={FILTERS}
            selected={selected}
            onSelect={setSelected}
          />
        </section>

        <section className="flex-1 overflow-y-auto px-5 pb-5">
          <p className="py-8 text-center text-sm text-white/40">
            Nenhum objeto {selected === "TODOS" ? "" : `${selected} `}
            encontrado.
          </p>
        </section>
      </div>
    </div>
  );
}
