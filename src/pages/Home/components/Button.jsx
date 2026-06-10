export default function Button({ bgColor, icon, content, fn, txtColor}) {
  return (
    <button
      onClick={(e) => fn(e)}
      className={`flex items-center gap-2 px-4 py-2 ${bgColor} ${txtColor} rounded-md font-medium transition-all duration-300 active:scale-95 cursor-pointer`}
    >
      {icon && icon}
      {content}
    </button>
  );
}
