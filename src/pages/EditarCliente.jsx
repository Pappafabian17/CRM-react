import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import { actualizarCliente, obtenerCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);

  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No hay resultados porque el cliente no existe",
    });
  }
  return { ok: true }, cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const datos = Object.fromEntries(formData);

  const email = formData.get("email");

  // validacion
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("todos los campos son obligatorios");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("El Email no es valido");
  }

  //retornar errores
  if (Object.keys(errores).length) {
    return errores;
  }
  //actualizar cliente
  await actualizarCliente(params.clienteId, datos);

  return { ok: true }, redirect("/");
}

function EditarCliente() {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        A continuacion podras modificar los datos de un cliente
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
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario cliente={cliente} />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercas font-bold rounded-md text-white text-lg"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  );
}

export default EditarCliente;
