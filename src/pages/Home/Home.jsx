import { useEffect, useState } from "react";
import { FaBoxOpen, FaTruckFast } from "react-icons/fa6";
import {
  LuPackageOpen,
  LuPackageCheck,
  LuCircleX,
  LuTriangleAlert,
} from "react-icons/lu";
import { IoMdRefresh, IoMdCloseCircle } from "react-icons/io";
import Loading from "../../Loading";
import StatCard from "./components/StatCard";
import Card from "./components/Card";
import Header from "./components/Header";
import RobotStatus from "./components/RobotStatus";
import Button from "./components/Button";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export default function Home() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unitilizerCount, setUnitilizerCount] = useState(0);
  const [robotStatus, setRobotStatus] = useState("loading");
  const [objectsToday, setObjectsToday] = useState([]);

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedUnitilizers, setSelectedUnitilizers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.unitilizer &&
      item.unitilizer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  async function closeUnitFn() {
    setIsLoading(true);
    try {
      if (selectedUnitilizers.length > 0) {
        const response = await fetch(`http://localhost:2200/api/scrapp/close`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ unitilizers: selectedUnitilizers }),
        });

        if (!response.ok) {
          throw new Error("Falha ao enviar os dados...");
        }

        setIsSelectionMode(false);
        setUnitilizerCount((v) => v + 1);
      }
    } catch (e) {
      console.error("Erro na fechar unitilizador:", e);
    }
  }

  useEffect(() => {
    async function getObjectsToday() {
      try {
        const response = await fetch(
          `http://localhost:2200/api/scrapp/objects`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Não foi possível buscar os dados desejados...");
        }

        const dataObjects = await response.json();
        setObjectsToday(dataObjects);
      } catch (e) {
        console.error("Erro ao buscar objetos:", e);
      }
    }

    async function loadScrappedData() {
      setIsLoading(true);
      setIsSelectionMode(false);
      setSearchTerm("")
      setSelectedUnitilizers([]);
      setRobotStatus("loading");
      try {
        const response = await fetch(`http://localhost:2200/api/scrapp`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setData();
          throw new Error("Falha ao buscar os dados");
        }

        const result = await response.json();
        setData(result);
        setRobotStatus("connected");
      } catch (error) {
        setRobotStatus("error");
        console.error("Erro na requisição:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getObjectsToday();
    loadScrappedData();
  }, [token, unitilizerCount]);

  const totalObjects = data.reduce(
    (acc, curr) => acc + curr.objects.quantity,
    0,
  );
  const totalUnitilizers = data.length;

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  function turnSelectedUnit(unit) {
    if (selectedUnitilizers.includes(unit)) {
      setSelectedUnitilizers((arr) => arr.filter((id) => id !== unit));
    } else {
      setSelectedUnitilizers((arr) => [...arr, unit]);
    }
  }

  return (
    <div className="min-h-screen bg-[#090C15] text-white p-8">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          message={"Total de Items Disponíveis"}
          icon={<FaBoxOpen className="text-3xl" />}
          colorClasses={"bg-[#5046E7]/20 text-[#5046E7]"}
          dynamicData={totalObjects}
        />

        <StatCard
          message={"Unitizadores Ativos"}
          icon={<FaTruckFast className="text-3xl" />}
          colorClasses={"bg-green-500/20 text-green-500"}
          dynamicData={totalUnitilizers}
        />

        <StatCard
          message={"Itens Enviados Hoje"}
          icon={<LuPackageCheck className="text-3xl" />}
          colorClasses={"bg-teal-500/20 text-teal-400"}
          dynamicData={objectsToday}
        />
      </div>

      <RobotStatus
        status={robotStatus}
        setUnitilizerCount={setUnitilizerCount}
      />

      <div className="bg-[#121625] border border-white/5 rounded-lg p-4 mb-8 flex items-center  justify-between">
        <div className="flex items-center gap-4">
          {!isSelectionMode ? (
            <>
              <Button
                bgColor={"bg-[#18b81d]"}
                content={"Abrir Unitilizador"}
                icon={<LuPackageOpen />}
                fn={() => alert("Botão de Abrir")}
                txtColor={"text-white"}
              />

              <Button
                bgColor={"bg-[#c92828]"}
                content={"Fechar Unitilizador"}
                icon={<IoMdCloseCircle />}
                fn={() => setIsSelectionMode(true)}
                txtColor={"text-white"}
              />
            </>
          ) : (
            <>
              <Button
                bgColor={
                  selectedUnitilizers.length < 1
                    ? "bg-amber-500/10 border border-amber-500/30 text-amber-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-500 active:scale-95 transition-all cursor-pointer shadow-[0_0_15px_rgba(22,163,74,0.2)]"
                }
                content={
                  selectedUnitilizers.length < 1
                    ? "Aguardando selecão..."
                    : `Fechar ${selectedUnitilizers.length} ${selectedUnitilizers.length === 1 ? "Unitilizador" : "Unitilizadores"}`
                }
                icon={
                  selectedUnitilizers.length < 1 ? (
                    <LuTriangleAlert className="animate-pulse" />
                  ) : (
                    <LuPackageCheck />
                  )
                }
                fn={
                  selectedUnitilizers.length < 1
                    ? undefined
                    : () => {
                        if (selectedUnitilizers.length > 0) {
                          closeUnitFn();
                        }
                      }
                }
                txtColor={
                  selectedUnitilizers.length < 1
                    ? "text-amber-500/80"
                    : "text-white font-bold"
                }
              />

              <Button
                bgColor={
                  selectedUnitilizers.length === data.length
                    ? "bg-[#5046E7]/20 border border-[#5046E7]/40 text-[#5046E7] hover:bg-[#5046E7]/30 transition-all cursor-pointer"
                    : "bg-[#5046E7] hover:bg-[#5046E7]/90 active:scale-95 transition-all cursor-pointer shadow-[0_0_15px_rgba(80,70,231,0.2)]"
                }
                content={
                  selectedUnitilizers.length === data.length
                    ? "Desmarcar Todos"
                    : "Selecionar Tudo"
                }
                icon={
                  selectedUnitilizers.length === data.length ? (
                    <MdCheckBox />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )
                }
                fn={() => {
                  if (selectedUnitilizers.length === data.length) {
                    setSelectedUnitilizers([]);
                  } else {
                    setSelectedUnitilizers(data.map((item) => item.unitilizer));
                  }
                }}
                txtColor={
                  selectedUnitilizers.length === data.length
                    ? "text-[#8b82f6]"
                    : "text-white"
                }
              />

              <Button
                bgColor={
                  "bg-gray-700 hover:bg-gray-600 active:scale-95 transition-all"
                }
                content={"Cancelar Operação"}
                icon={<LuCircleX />}
                fn={() => {
                  setIsSelectionMode(false);
                  setSelectedUnitilizers([]);
                }}
                txtColor={"text-gray-200"}
              />
            </>
          )}
        </div>

        <button
          onClick={() => setUnitilizerCount((v) => v + 1)}
          className="flex items-center gap-2 px-4 py-2 bg-[#5046E7] text-white rounded-md font-medium transition-all duration-300 shadow-[0_0_10px_rgba(80,70,231,0.2)] hover:shadow-[0_0_15px_rgba(80,70,231,0.5)] hover:bg-[#5046E7]/90 active:scale-95 cursor-pointer"
        >
          {isLoading ? (
            <span>Buscando unitilizadores...</span>
          ) : (
            <>
              <IoMdRefresh className="text-xl" />
              <span>Buscar</span>
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
        <h2 className="text-xl font-semibold">Itens em Processamento</h2>
      </div>

      {filteredData.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <Card
            key={item.number}
            isSelectionMode={isSelectionMode}
            isSelected={selectedUnitilizers.includes(item.unitilizer)}
            onSelect={() => turnSelectedUnit(item.unitilizer)}
            date={item.date}
            destination={item.destination}
            objects={item.objects}
            quantity={item.objects.quantity}
            unitilizer={item.unitilizer}
            number={item.number}
          />
        ))}
      </div>
    ) : (
      <p className="text-center mt-32 text-xl text-white/60">
        {
          data.length === 0 
            ? `Não há nada por aqui...`
            : `Nenhum unitilizador encontrado para "${searchTerm}"`
        }
      </p>
    )}
    </div>
  );
}
