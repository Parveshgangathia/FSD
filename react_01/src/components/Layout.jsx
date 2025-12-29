import Navbar from "./Navbar";
import PageContainer from "./PageContainer";

function Layout({ children }) {
  return (
    <PageContainer>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-5xl mx-auto w-full p-6">
          {children}
        </main>

        <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4 text-sm text-gray-500 dark:text-gray-400">
          © 2025 React Practice Dashboard
        </footer>
      </div>
    </PageContainer>
  );
}

export default Layout;
