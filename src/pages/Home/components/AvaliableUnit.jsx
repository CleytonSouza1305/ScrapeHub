import { LuX } from "react-icons/lu";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { useState } from "react";

const unitis = [
  {
    direction: "IMPORTAÇÃO ENVELOPE CTCE SANTO AMARO A",
    position: 1,
    quantity: 1,
    format: "Envelope",
    category: "Sedex",
  },
];

function DivChild({ type, value }) {
  return (
    <span className="flex flex-col gap-1 items-center justify-center flex-1">
      <span className="text-xs font-semibold text-white/50">{type}</span>
      <span className="text-center font-medium">{value}</span>
    </span>
  );
}

export default function AvaliableUnit({ setIsModalOpenFn }) {
  const [numberInput, setNumberInput] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#121625] border border-white/10 rounded-xl w-auto max-h-[80vh] flex flex-col shadow-2xl animate-fade-in">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-[#5046E7]">
              Unitilizadores disponíveis
            </h4>
            <p className="text-xs text-white/40 mt-0.5">
              Total disponivel: {unitis.length}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpenFn(false)}
            className="cursor-pointer p-1 text-white/50 hover:text-white"
          >
            <LuX className="text-xl" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-2 scrollbar-none">
          {unitis.map((u) => (
            <div
              key={u.position}
              className="bg-white/5 rounded px-3 py-2 text-sm font-mono text-white/90 border border-white/5 flex gap-8 items-center justify-between"
            >
              <DivChild type={"Destino"} value={u.direction} />

              <DivChild type={"Formato"} value={u.format} />

              <DivChild type={"Posição"} value={u.position} />

              <DivChild type={"Categoria"} value={u.category} />

              <input
                value={numberInput}
                type="text"
                min={1}
                max={100}
                className="bg-white/10 text-white rounded px-2 py-1 text-center w-10 h-10"
                onChange={(e) => {
                  const newValue = e.currentTarget.value.trim();
                  if (newValue === "") {
                    setNumberInput("");
                    return;
                  }

                  const value = Number(newValue);

                  if (isNaN(value)) return

                  if (value > 100) {
                    setNumberInput(100);
                  } else if (value < 1) {
                    setNumberInput(1);
                  } else {
                    setNumberInput(value);
                  }
                }}
                onBlur={() => {
                  if (numberInput === "") {
                    setNumberInput(1);
                  }
                }}
              />

              <BiSolidSelectMultiple className="cursor-pointer w-7 h-7" />
            </div>
          ))}
        </div>

        <div className="p-4 bg-white/2 border-t border-white/5">
          <button
            onClick={() => setIsModalOpenFn(false)}
            className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-medium rounded-md text-white w-full"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
}
