export default function StatCard({ colorClasses, icon, dynamicData, message }) {
  return (
    <div className="bg-[#0E121D] border border-white/5 p-6 rounded-lg flex items-center gap-4">
      <div className={`p-4 rounded-md ${colorClasses}`}>
        {icon}
      </div>
      <div>
        <p className="text-white/50 text-sm">{message}</p>
        <p className="text-3xl font-semibold">{dynamicData}</p>
      </div>
    </div>
  );
}
