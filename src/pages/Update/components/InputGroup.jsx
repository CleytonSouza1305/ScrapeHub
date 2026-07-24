export default function InputGroup({ labelContent, id, placeholder, type, Icon, name, value, fn }) {

  const handleInput = (ev) => {
    console.log('to aqui')
    console.log(ev.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-white/40">
        {labelContent}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-lg" />
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => fn(e.target.value)}
          className="w-full bg-[#090C15] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-white/20 focus:outline-none focus:border-[#5046E7] focus:ring-1 focus:ring-[#5046E7] transition-all"
        />
      </div>
    </div>
  );
}
