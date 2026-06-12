import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";

const unitis = [{ number: 1, name: 'Saúde', quantity: 1, type: 'Sedex' }]

export default function AvaliableUnit({setIsModalOpenFn}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#121625] border border-white/10 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl animate-fade-in">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-[#5046E7]">
              Unitilizadores disponíveis
            </h4>
            <p className="text-xs text-white/40 mt-0.5">
              Total disponivel: { unitis.length }
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
              key={u.number}
              className="bg-white/5 rounded px-3 py-2 text-sm font-mono text-white/90 border border-white/5"
            >
              {u.name}
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
