import { FaSpider } from "react-icons/fa6";

export default function Loading({ isLoading }) {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090C15] flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute w-24 h-24 border-4 border-[#5046E7]/10 border-t-[#5046E7] rounded-full animate-spin"></div>

          <div className="bg-[#0E121D] p-4 rounded-full border border-white/5 shadow-[0_0_15px_rgba(80,70,231,0.2)]">
            <FaSpider className="text-4xl text-[#5046E7] animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h2 className="text-xl font-bold">
            Scrape<span className="text-[#5046E7]">Hub</span>
          </h2>
          <p className="text-white/50 text-sm animate-pulse">
            Carregando...
          </p>
        </div>
      </div>
    );
  }
}
