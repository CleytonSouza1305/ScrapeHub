import { FaSpider } from "react-icons/fa6";
import { useOutletContext } from "react-router-dom";
import SideBar from "../Home/components/SideBar";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";

const roleRefatored = (role) => {
  const cleanRole = role?.toUpperCase().trim();

  switch (cleanRole) {
    case "OWNER":
      return "Proprietário";

    case "ADMIN":
      return "Administrador";

    case "MANAGER":
      return "Gerente";

    case "USER":
      return "Usuário";

    default:
      return "Sem Cargo Definido";
  }
};

export default function Users() {
  const manager = useOutletContext();
  console.log("admin", manager);

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  
    function openSideBar() {
      setSideBarIsOpen(true)
    }

  const name = manager?.username ?? "Usuário";
  const role = roleRefatored(manager?.role);

  return (
    <div className="min-h-screen bg-[#090C15] text-white p-8 relative">
      <header className="flex items-center justify-between">
        <h1 className="flex items-center text-3xl font-bold">
          <FaSpider className="text-[#5046E7] mr-2" />
          Scrape<span className="text-[#5046E7]">Hub</span>
        </h1>

        <p
        className="text-3xl font-bold"
        >Bem-VIndo, <span className="text-[#5046E7]">{name}</span>
        </p>

        <button onClick={openSideBar}>
          <span className="cursor-pointer text-3xl text-[#5046E7] font-bold">
            <CiMenuFries />
          </span>
        </button>

        <SideBar isOpen={sideBarIsOpen} setIsOpen={setSideBarIsOpen} />
      </header>
    </div>
  );
}
