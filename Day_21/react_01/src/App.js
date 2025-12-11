import Welcome from "./components/Welcome";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">My First React App</h1>

      <Welcome name="Parvesh" />
      <Welcome name="Riya" />
      <Welcome name="Aman" />
    </div>
  );
}

export default App;
