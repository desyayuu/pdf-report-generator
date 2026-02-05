import { AlertCircle } from "lucide-react";
const CurrencyInput = ({
    label, 
    value,
    onChange,
    error,
    required = false
}) => {

    const formatCurreny = (num) => {
        if(!num) return '';
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        onChange(rawValue);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">Rp</span>
                <input
                    type="text"
                    value={formatCurreny(value)}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                    } hover:border-gray-400`}
                />
            </div>
            {error && (
                <p className="text-red-500 text-sm mt-1">
                    <span><AlertCircle /></span> {error}
                </p>
            )}
            {value && !error && (
                <p className="text-xs text-gray-500">
                    Rp {formatCurreny(value)}
                </p>
            )}
        </div>
    );
};
export default CurrencyInput;