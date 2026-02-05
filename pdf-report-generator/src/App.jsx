import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import FormSection from './components/FormSection';
import HistoryTable from './components/HistoryTable';
import { generatePDF } from './utils/pdfGenerator';

function App() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('pdfHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pdfHistory', JSON.stringify(history));
  }, [history]);

  const handleGeneratePDF = async (formData) => {
    try {
      const fileName = generatePDF(formData);
      
      const newEntryForHistory = {
        id: Date.now(),
        title: formData.title,
        pageSize: formData.pageSize,
        nominal: formData.nominal,
        description: formData.description,
        date: new Date().toISOString(),
        fileName: fileName
      };
      
      setHistory([newEntryForHistory, ...history]);
      toast.success('PDF berhasil di-generate! ');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Gagal generate PDF. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <FormSection onSubmit={handleGeneratePDF} />
          <HistoryTable history={history} />
        </div>
      </main>
      
    </div>
  );
}

export default App;