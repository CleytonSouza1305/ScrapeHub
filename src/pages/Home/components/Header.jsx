import { FaSpider } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import SideBar from "./SideBar";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";

export default function Header({ searchTerm, setSearchTerm }) {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  function openSideBar() {
    setSideBarIsOpen(true)
  }

  return (
    <header className="flex justify-between items-center mb-10">
      <h1 className="flex items-center text-3xl font-bold">
        <FaSpider className="text-[#5046E7] mr-2" />
        Scrape<span className="text-[#5046E7]">Hub</span>
      </h1>

      <div className="relative w-96">
        <LuSearch className="absolute left-3 top-3 text-white/40 text-xl" />
        <input
          type="text"
          placeholder="Buscar unitilizador..."
          className="w-full bg-[#0E121D] border border-white/10 rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#5046E7] transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <button onClick={openSideBar}>
        <span className="cursor-pointer text-3xl text-[#5046E7] font-bold">
          <CiMenuFries />
        </span>
      </button>

      <SideBar isOpen={sideBarIsOpen} setIsOpen={setSideBarIsOpen} />
    </header>
  );
}
