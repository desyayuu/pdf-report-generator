import { Calendar, FileText, Download} from 'lucide-react';

const HistoryTable = ({ history, onDownload }) => {
  const formatCurrency = (num) => {
    return `Rp ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  if (sortedHistory.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Daftar History Generate
        </h2>
        
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4 pulse-slow">
            <FileText size={40} className="text-gray-400" />
          </div>
          <p className="text-lg text-gray-500 font-medium">Belum ada data</p>
          <p className="text-sm text-gray-400 mt-2">
            Generate PDF pertama Anda untuk melihat history
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Daftar History Generate
          </h2>
        </div>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                No
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Judul
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Page Size
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Nominal
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Tanggal
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {history.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {item.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.pageSize}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-sm font-semibold text-green-700">
                    {formatCurrency(item.nominal)}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar size={14} />
                    {formatDate(item.date)}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {/* Tombol Download */}
                    <button
                      onClick={() => onDownload && onDownload(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                      title="Download PDF"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {history.map((item, index) => (
          <div 
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                  {index + 1}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {item.pageSize}
                </span>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FileText size={16} className="text-blue-600" />
              {item.title}
            </h3>
            
            <div className="space-y-1 text-sm mb-3">
              <div className="flex items-center gap-1 text-green-700 font-semibold">
                {formatCurrency(item.nominal)}
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Calendar size={14} />
                {formatDate(item.date)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onDownload && onDownload(item)}
                className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTable;