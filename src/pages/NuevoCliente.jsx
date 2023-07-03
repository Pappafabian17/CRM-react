import { useNavigate, Form } from "react-router-dom";
import Formulario from "../components/Formulario";

export async function action({request}){
    const formData = await request.formData()

    console.log(formData.get('nombre'))

    return { ok: true };
}

function NuevoCliente() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase mb-10 rounded-md"
          onClick={() => {
            navigate("/");
          }}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">
        <Form
        method="post"
        
        >
          <Formulario />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercas font-bold rounded-md text-white text-lg"
            value="registrar cliente"
          />
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
