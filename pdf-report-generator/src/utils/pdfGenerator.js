import jsPDF from 'jspdf';

export const generatePDF = (data) => {
    const { pageSize, title, description, nominal } = data;
    
    const pageSizes = {
        'A4': [210, 297],
        'A5': [148, 210],
        'Letter': [215.9, 279.4]
    };
    
    const [width, height] = pageSizes[pageSize] || pageSizes['A4'];
    
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [width, height]
    });

    const margin = 20;
    let yPosition = margin;

    // === HEADER ===
    pdf.setFillColor(37, 99, 235); 
    pdf.rect(0, 0, width, 40, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text('LAPORAN PDF', margin, 25);
    
    yPosition = 50;

    // === JUDUL ===
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text(title, margin, yPosition);
    
    yPosition += 15;

    // === INFORMASI ===
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(100, 100, 100);

    const currentDate = new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    pdf.text(`Dibuat: ${currentDate}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Ukuran: ${pageSize}`, margin, yPosition);
    
    yPosition += 15;

    // === DIVIDER ===
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, width - margin, yPosition);
    
    yPosition += 10;

    // === DESKRIPSI ===
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Deskripsi:', margin, yPosition);
    
    yPosition += 8;

    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(11);

    const splitDescription = pdf.splitTextToSize(
        description, 
        width - (margin * 2)
    );
    
    pdf.text(splitDescription, margin, yPosition);
    yPosition += splitDescription.length * 6 + 10;

    // === DIVIDER ===
    pdf.line(margin, yPosition, width - margin, yPosition);
    yPosition += 10;

    // === NOMINAL ===
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('Nominal:', margin, yPosition);
    
    yPosition += 8;

    const formattedNominal = `Rp ${nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    
    pdf.setFontSize(16);
    pdf.setTextColor(37, 99, 235); // Blue-600
    pdf.text(formattedNominal, margin, yPosition);

    // Save PDF
    const fileName = `${title.replace(/\s+/g, '_')}_${Date.now().toLocaleString('id-ID')}.pdf`;
    pdf.save(fileName);
    
    return fileName;
};