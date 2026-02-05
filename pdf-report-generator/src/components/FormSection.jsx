import { useState } from "react";
import DropdownInput from "./inputs/DropdownInput";
import TextInput from "./inputs/TextInput";
import TextAreaInput from "./inputs/TextAreaInput";
import CurrencyInput from "./inputs/CurrencyInput";

const FormSection = () => {
  const [formData, setFormData] = useState({
    pageSize: 'A4',
    title: '',
    description: '',
    nominal: '',
  });

  const [errors, setErrors] = useState({});

  const pageSizeOptions = [
    { value: 'A4', label: 'A4' },
    { value: 'A5', label: 'A5' },
    { value: 'Letter', label: 'Letter' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Form Generate PDF
      </h2>

      <form className="space-y-6">
        <DropdownInput
          label="Ukuran Halaman"
          value={formData.pageSize}
          onChange={(value) => setFormData({ ...formData, pageSize: value })}
          options={pageSizeOptions}
          error={errors.pageSize}
          required
        />

        <TextInput
          label="Judul Laporan"
          value={formData.title}
          onChange={(value) => setFormData({ ...formData, title: value })}
          placeholder="Masukkan judul laporan..."
          maxLength={100}
          error={errors.title}
          required
        />

        <TextAreaInput
          label = "Deksripsi / Isi Laporan"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder="Masukkan deskripsi laporan..."
          rows={5}
          error={errors.description}
          required
        />

        <CurrencyInput
          label = "Nominal (Rp)"
          value={formData.nominal}
          onChange={(value) => setFormData({ ...formData, nominal: value })}
          error={errors.nominal}
          required
        />
      </form>
    </div>
  );
};

export default FormSection;