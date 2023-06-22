import { Button } from "./desing-system/Button";

function App() {
  console.log(import.meta.env.VITE_CLIENT);

  return (
    <div>
      <h1>Personas</h1>
      <p>Portal de clientes</p>
      <Button label="Iniciar sesión" />
    </div>
  );
}

export default App;
