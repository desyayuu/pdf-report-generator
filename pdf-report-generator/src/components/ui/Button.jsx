const Button = ({ 
    children, 
    onClick, 
    type = 'button', 
    disabled = false, 
    loading = false,
    variant = 'primary',
    icon: Icon,
    fullWidth = false
}) => {
    const baseClasses = "font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-95",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        danger: "bg-red-600 hover:bg-red-700 text-white"
    };

    return (
        <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
        >
        {loading ? (
            <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Processing...</span>
            </>
        ) : (
            <>
            {Icon && <Icon size={20} />}
            {children}
            </>
        )}
        </button>
    );
};

export default Button;