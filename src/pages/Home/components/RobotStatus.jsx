export default function RobotStatus({ status, setUnitilizerCount }) {
  return (
    <div className="bg-[#121625] border border-white/5 rounded-lg p-4 mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3 bg-[#121625] border border-white/5 rounded-lg p-4 justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            {status !== "error" && (
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  status === "connected" ? "bg-green-400" : "bg-yellow-400"
                }`}
              ></span>
            )}

            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                status === "connected"
                  ? "bg-green-500"
                  : status === "loading"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            ></span>
          </span>

          <p className="text-sm text-white/70">
            Status do Robô:{" "}
            {status === "connected" && (
              <strong className="text-green-400">Pronto e Conectado</strong>
            )}
            {status === "loading" && (
              <strong className="text-yellow-400">
                Verificando Conexão...
              </strong>
            )}
            {status === "error" && (
              <strong className="text-red-500">Erro de Conexão</strong>
            )}
          </p>
        </div>

        {status === "error" && (
          <button
            onClick={() => setUnitilizerCount((v) => v + 1)}
            className="text-xs bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-1 rounded hover:bg-red-500/20 transition-all cursor-pointer"
          >
            Tentar Reconectar
          </button>
        )}
      </div>
    </div>
  );
}
