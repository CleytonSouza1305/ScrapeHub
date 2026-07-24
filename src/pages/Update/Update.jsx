import { LuUser, LuMail, LuLock, LuCamera, LuSave } from "react-icons/lu";
import { FaUser } from "react-icons/fa6";
import InputGroup from "./components/InputGroup";
import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function Update() {
  const user = useOutletContext()
  console.log(user)

  const [name, setName] = useState(user?.username ? user?.username : '')
  const [email, setEmail] = useState(user?.email ? user?.email : '')
  const world = user?.username.split('')[0]

  const handleInput = (ev) => {
    console.log('to aqui')
    console.log(ev.target.value)
  }

  return (
    <div className="min-h-screen bg-[#090C15] text-white p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#121625] border border-white/5 rounded-2xl p-8 shadow-2xl">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Configurações de Perfil</h2>
          <p className="text-sm text-white/40 mt-1">Atualize suas informações pessoais e credenciais de acesso.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center gap-6 pb-6 border-b border-white/5">
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-[#5046E7] flex items-center justify-center text-2xl font-bold text-white shadow-lg transition-transform group-hover:scale-102 duration-200">
                {world}
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-[#5046E7] hover:bg-[#4338ca] text-white rounded-full shadow-md transition-all duration-200 group-hover:scale-110">
                <LuCamera className="text-xs" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-200">Foto de Perfil</h4>
              <p className="text-xs text-white/40 mt-1">Clique para carregar uma imagem PNG ou JPG de até 5MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup 
              type={'text'}
              id={'name'}
              name={'name'}
              labelContent={'Seu nome'}
              placeholder={'Novo nome...'}
              value={name}
              fn={setName}
              Icon={FaUser}
            />

            <InputGroup 
              type={'text'}
              id={'email'}
              name={'email'}
              labelContent={'Seu email'}
              placeholder={'Novo email...'}
              value={email}
              fn={setEmail}
              Icon={FaUser}
            />
          </div>

          {/* Rodapé de Ações */}
          <div className="flex justify-end gap-4 pt-4 border-t border-white/5 mt-8">
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <Link to='/home'>Cancelar</Link>
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#5046E7] hover:bg-[#4338ca] text-white text-sm font-medium rounded-xl shadow-lg shadow-[#5046E7]/20 transition-all duration-200 active:scale-98"
            >
              <LuSave className="text-base" />
              Salvar Alterações
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}