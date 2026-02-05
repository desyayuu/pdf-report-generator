import Header from './components/Header';
import FormSection from './components/FormSection';
import HistoryTable from './components/HistoryTable';

function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <FormSection/>
          <HistoryTable/>
        </div>
      </main>
    </div>
  );
}
export default App;