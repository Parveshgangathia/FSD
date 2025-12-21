import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full">
        {children}
      </main>

      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-500">
        © 2025 React Practice Dashboard
      </footer>
    </div>
  );
}

export default Layout;
