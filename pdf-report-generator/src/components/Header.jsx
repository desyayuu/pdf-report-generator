import Header from '../components/Header';
import FormSection from '../components/FormSection';
import HistoryTable from '../components/HistoryTable';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <Header />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Form Section */}
          <FormSection />
          
          {/* Table Section */}
          <HistoryTable />
        </div>
      </main>
      
      {/* Footer (opsional) */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p className="text-sm">© 2025 PDF Report Generator</p>
      </footer>
    </div>
  );
}

export default App;