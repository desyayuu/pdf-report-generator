import { AlertCircle } from "lucide-react";

const TextInput = ({
    label,
    value,
    onChange, 
    placeholder,
    maxLength,
    error,
    required = false
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}  
            </label>
            <div className="relative">
                <input 
                    type="text" 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                    } hover:border-gray-400`}
                />
                {maxLength && (
                    <div className="absolute bottom-1 right-2 text-xs text-gray-500">
                        {value.length} / {maxLength}
                    </div>
                )}
                {error && (
                    <p className="text-red-500 text-sm mt-1">
                        <span><AlertCircle /></span>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}; 
export default TextInput;