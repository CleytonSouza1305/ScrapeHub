import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  LuUserCog,
  LuLayoutDashboard,
  LuSettings,
  LuUsers,
  LuLogOut,
} from "react-icons/lu";
import { BsUpcScan } from "react-icons/bs";

function handleFinishSession(navigate) {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  navigate("/login");
}

const NAV_ITEMS = [
  {
    key: "home",
    label: "Unitizadores",
    path: "/home",
    icon: LuLayoutDashboard,
    roles: ["OWNER", "ADMIN", "MANAGER", "USER"],
  },
  {
    key: "usuarios",
    label: "Gerenciar Usuários",
    path: "/users",
    icon: LuUsers,
    roles: ["OWNER", "ADMIN", "MANAGER"],
  },
  {
    key: "config",
    label: "Configurações",
    path: "/config",
    icon: LuSettings,
    roles: ["OWNER", "ADMIN", "MANAGER"],
  },
  {
    key: "finish-session",
    label: "Sair",
    fn: handleFinishSession,
    icon: LuLogOut,
    roles: ["OWNER", "ADMIN", "MANAGER", "USER"],
  },
];

const fallbackId = Math.floor(1000 + Math.random() * 9000);

export default function SideBar({ isOpen, setIsOpen }) {
  const user = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  const visibleItems = NAV_ITEMS.filter((i) => i.roles.includes(user?.role));

  const currentLocation = location.pathname;

  const firstLetter = (user?.username || "U").charAt(0).toUpperCase();

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-85 bg-[#121625] border-l border-white/5 p-6 shadow-2xl z-50 flex flex-col justify-between
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div>
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -ml-2 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 cursor-pointer"
          >
            <IoClose className="text-2xl" />
          </button>

          <div className="bg-[#5046E7]/10 border border-[#5046E7]/30 p-2 rounded-xl w-10 h-10 flex items-center justify-center font-bold text-[#8b82f6]">
            <span>{firstLetter}</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5">
          <p className="text-[11px] font-bold tracking-wider text-white/20 uppercase pl-3 mb-2">
            Navegação
          </p>
          {visibleItems.map(({ key, label, path, fn, icon: Icon }) => (
            <button
              key={key}
              onClick={() => (path ? navigate(path) : fn?.(navigate))}
              className={`flex items-center gap-3 cursor-pointer w-full p-3 text-sm font-medium ${
                path && currentLocation === path
                  ? "text-[#8b82f6] bg-[#5046E7]/10 border border-[#5046E7]/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              } rounded-xl transition-all`}
            >
              <Icon className="text-lg" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <footer className="flex items-center justify-between p-3 bg-[#121625] border border-white/5 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#5046E7] flex items-center justify-center text-sm font-bold text-white shadow-[0_0_10px_rgba(80,70,231,0.2)] shrink-0">
            {firstLetter}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-gray-200 truncate">
              {user?.username || `user-${fallbackId}`}
            </span>
            <span className="text-xs text-white/40 truncate">
              {user?.email}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/update/${user?.id}`)}
          className="p-2 cursor-pointer text-white/30 hover:text-[#8b82f6] hover:bg-[#5046E7]/10 rounded-lg transition-all duration-200 shrink-0"
          title="Editar Perfil"
        >
          <LuUserCog className="text-lg" />
        </button>
      </footer>
    </div>
  );
}
