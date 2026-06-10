import { useState } from "react";

import { FaSpider } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { IoIosLock } from "react-icons/io";
import { RxEnter } from "react-icons/rx";

import { GroupInput } from "./components/GroupInput";

import scrapperImage from "../../assets/scrapper-image.png";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [formatError, setFormatError] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(ev) {
    ev.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.match(emailRegex)) {
      setFormatError("Formato de email inválido.");
      return;
    }

    if (password.length < 8) {
      setFormatError("Sua senha deve conter 8 ou mais caracteres.");
      return;
    }
    setFormatError("");

    try {
      const response = await fetch(`http://localhost:2200/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      if (!response.ok) {
        switch (Number(response.status)) {
          case 401:
            setFormatError(data.message);
            break;
          case 400:
            setFormatError(data.message);
            break;

          default:
            setFormatError(
              "Erro ao fazer login, por favor tente novamente mais tarde.",
            );
        }
        throw new Error(data.message);
      }

      const token = data.token
      if (isChecked) {
        localStorage.setItem("token", token)
        sessionStorage.removeItem("token")
      } else {
        sessionStorage.setItem("token", token)
        localStorage.removeItem("token")
      }

      navigate("/home", { replace: true })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="relative">
        <div
          className={`w-full h-screen bg-[url('https://www.shutterstock.com/image-illustration/abstract-digital-background-falling-binary-600nw-2758124283.jpg')] bg-cover bg-center bg-no-repeat brightness-30 absolute inset-0`}
        ></div>

        <div className="w-full h-screen absolute inset-0 z-10 text-white flex justify-center items-center px-4">
          <div className="flex justify-center items-stretch gap-1 rounded-lg overflow-hidden bg-[hsl(224,35%,15%)] max-w-5xl w-full shadow-2xl p-8">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="bg-[#0E121D] p-8 w-120 shrink-0 rounded-lg"
            >
              <h2 className="flex justify-center items-start gap-4">
                <FaSpider className="text-[#5046E7] text-4xl" />
                <div className="w-full mb-4">
                  <p className="text-4xl font-semibold">
                    Scrape<span className="text-[#5046E7]">Hub</span>
                  </p>
                  <p className="text-white/60">Seu painel de buscas</p>
                </div>
              </h2>
              <h3 className="text-3xl font-semibold">Bem-vindo de volta!</h3>
              <p className="text-white/60">
                Faça login para acessar ao sistema
              </p>

              <div className="my-6 flex flex-col gap-4">
                <GroupInput
                  value={email}
                  id={"email"}
                  label={"E-mail"}
                  setOnChange={setEmail}
                  type={"text"}
                  placeholder={`seu@email.com`}
                  icon={<LuUser />}
                />

                <GroupInput
                  value={password}
                  id={"password"}
                  label={"Senha"}
                  setOnChange={setPassword}
                  type={"password"}
                  placeholder={`Sua senha`}
                  icon={<IoIosLock />}
                />
              </div>

              <div className="flex items-center justify-between mb-6 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <input
                    id="checkbox-input"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked((current) => !current)}
                    className="w-4 h-4 accent-[#5046E7] cursor-pointer bg-transparent"
                  />
                  <label
                    htmlFor="checkbox-input"
                    className="text-white/60 text-sm cursor-pointer select-none hover:text-[#6259e7] transition-colors duration-200"
                  >
                    Lembrar de mim
                  </label>
                </div>
                <p className="mb-4 text-white/60 text-sm cursor-pointer transition-colors duration-200 hover:text-[#6259e7]">
                  Esqueceu sua senha?
                </p>
              </div>

              <p className="text-sm text-red-600 font-semibold my-4">
                {formatError}
              </p>

              <button className="w-full py-3 px-4 bg-[#5046E7] hover:bg-[#4139c6] text-white font-medium rounded-md flex justify-center items-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer">
                <RxEnter className="text-[20px]" />
                Entrar
              </button>

              <p className="mt-4">
                Precisa de ajuda?{" "}
                <span className="text-white/60 hover:text-[#6259e7] transition-all duration-200 cursor-pointer">
                  Falar com suporte.
                </span>
              </p>
            </form>

            <div className="hidden md:block flex-1 rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={scrapperImage}
                alt="Imagem decorativa para o login"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
