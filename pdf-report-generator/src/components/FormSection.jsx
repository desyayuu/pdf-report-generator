const FormSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Form Generate PDF
      </h2>
      
      <div className="space-y-4">
        <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-12 bg-blue-600 rounded"></div>
      </div>
    </div>
  );
};

export default FormSection;