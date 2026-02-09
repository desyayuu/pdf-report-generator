import { useState } from "react";
import DropdownInput from "./inputs/DropdownInput";
import TextInput from "./inputs/TextInput";
import TextAreaInput from "./inputs/TextAreaInput";
import CurrencyInput from "./inputs/CurrencyInput";
import Button from "./ui/Button";
import { FileDown } from "lucide-react";

const FormSection = ({onSubmit}) => {
  const [formData, setFormData] = useState({
    pageSize: 'A4',
    title: '',
    description: '',
    nominal: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const pageSizeOptions = [
    { value: 'A4', label: 'A4' },
    { value: 'A5', label: 'A5' },
    { value: 'Letter', label: 'Letter' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if(!formData.pageSize){
      newErrors.pageSize = 'Ukuran halaman wajib diisi.';
    }

    if(!formData.title){
      newErrors.title = 'Judul laporan wajib diisi.';
    }else if (formData.title.length > 100){
      newErrors.title = 'Judul laporan maksimal 100 karakter.';
    }else if(formData.title.length < 5){
      newErrors.title = 'Judul laporan minimal 5 karakter.';
    }

    if(!formData.description){
      newErrors.description = 'Deskripsi laporan wajib diisi.';
    } else if(formData.description.length < 10){
      newErrors.description = 'Deskripsi laporan minimal 10 karakter.';
    } else if(formData.description.split('\n').length < 4)
      newErrors.description = 'Deskripsi laporan minimal 4 baris.';

    if(!formData.nominal || formData.nominal === '0'){
      newErrors.nominal = 'Nominal wajib diisi.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()){
      const firstError = document.querySelector('.border-red-500');
      if(firstError){
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    setLoading(true);

    try{
      await onSubmit(formData);
      handleReset();
    } catch(error){
      console.error('Error generating PDF', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      pageSize: 'A4',
      title: '',
      description: '',
      nominal: '',
    });
    setErrors({});
  };

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Form Generate PDF
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <DropdownInput
            label="Ukuran Halaman"
            value={formData.pageSize}
            onChange={(value) => {
              setFormData({ ...formData, pageSize: value });
              setErrors({ ...errors, pageSize: '' });
            }}
            options={pageSizeOptions}
            error={errors.pageSize}
            required
          />

          <TextInput
            label="Judul Laporan"
            value={formData.title}
            onChange={(value) => {
              setFormData({ ...formData, title: value });
              setErrors({ ...errors, title: '' });
            }}
            placeholder="Masukkan judul laporan..."
            maxLength={100}
            error={errors.title}
            required
          />

          <TextAreaInput
            label = "Deksripsi / Isi Laporan"
            value={formData.description}
            onChange={(value) => {
              setFormData({ ...formData, description: value });
              setErrors({ ...errors, description: '' });
            }}
            placeholder="Masukkan deskripsi laporan..."
            rows={4}
            error={errors.description}
            required
          />

          <CurrencyInput
            label = "Nominal (Rp)"
            value={formData.nominal}
            onChange={(value) => {
              setFormData({ ...formData, nominal: value });
              setErrors({ ...errors, nominal: '' });
            }}
            error={errors.nominal}
            required
          />

          <div className="pt-2">
            <Button 
              type="submit" 
              loading={loading}
              icon={FileDown}
              fullWidth
            >
              Generate PDF
            </Button>
          </div>
        </form>
      </div>
  );
};

export default FormSection;