import { AlertCircle } from 'lucide-react';

const DropdownInput = ({ 
    label, 
    value, 
    onChange, 
    options, 
    error, 
    required = false
}) => {
    return (
        <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            } hover:border-gray-400`}
        >
            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        {error && (
            <p className="text-red-500 text-sm flex items-center gap-1">
                <span><AlertCircle /></span> {error}
            </p>
        )}
        </div>
    );
};

export default DropdownInput;