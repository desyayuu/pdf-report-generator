import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import FormSection from './components/FormSection';
import HistoryTable from './components/HistoryTable';
import { generatePDF } from './utils/pdfGenerator';

function App() {
  const [history, setHistory] = useState([]);
  const [loading] = useState(false);

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
    if(!loading){
      localStorage.setItem('pdfHistory', JSON.stringify(history));
    }
  }, [history, loading]);

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

  const handleDownloadPDF = (item) => {
    try{
      const pdfData = {
        pageSize: item.pageSize,
        title: item.title,
        description: item.description,
        nominal: item.nominal,
      }

      generatePDF(pdfData);
      toast.success('PDF berhasil di-download! ');

    }catch(error){
      console.error('Error downloading PDF:', error);
      toast.error('Gagal download PDF. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <FormSection onSubmit={handleGeneratePDF} />
          <HistoryTable history={history} onDownload={handleDownloadPDF} />
        </div>
      </main>
      
    </div>
  );
}

export default App;