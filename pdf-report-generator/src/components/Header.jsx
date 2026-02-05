import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <FileText size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">PDF Report Generator</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;