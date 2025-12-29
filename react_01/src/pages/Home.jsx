import Dashboard from "../components/Dashboard";
import Card from "../components/Card";

function Home() {
  return (
    <div className="space-y-6">
      <Dashboard />

      <Card title="Welcome">
        <p>This card follows the theme.</p>
      </Card>
    </div>
  );
}

export default Home;
