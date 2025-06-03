import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Accommodation {
  id: string;
  nom: string;
  description: string;
  adresse: {
    ville: string;
    pays: string;
  };
  baseTarifaire: {
    minimum: number;
    devise: string;
  };
  rating: number;
  nombreAvis: number;
  photos: string[];
  source: string;
  facilites: string[];
  contact: {
    siteWeb: string;
  };
}

export const exportComparisonToPDF = (accommodations: Accommodation[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Titre
  doc.setFontSize(20);
  doc.text('Comparaison d\'hébergements', margin, 20);

  // Date
  doc.setFontSize(12);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, margin, 30);

  // Tableau de comparaison
  const allFacilities = Array.from(
    new Set(accommodations.flatMap(a => a.facilites))
  ).sort();

  const tableData = [
    // En-têtes
    ['Critères', ...accommodations.map(a => a.nom)],
    // Localisation
    ['Localisation', ...accommodations.map(a => `${a.adresse.ville}, ${a.adresse.pays}`)],
    // Prix
    ['Prix par nuit', ...accommodations.map(a => `${a.baseTarifaire.minimum} ${a.baseTarifaire.devise}`)],
    // Note
    ['Note', ...accommodations.map(a => `${a.rating}/5 (${a.nombreAvis} avis)`)],
    // Source
    ['Source', ...accommodations.map(a => a.source)],
    // Équipements
    ...allFacilities.map(facility => [
      facility,
      ...accommodations.map(a => a.facilites.includes(facility) ? '✓' : '✗')
    ]),
    // Liens
    ['Lien', ...accommodations.map(a => a.contact.siteWeb)]
  ];

  (doc as any).autoTable({
    startY: 40,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [26, 26, 26],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 40 },
    },
  });

  // Pied de page
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      pageWidth - margin - 40,
      doc.internal.pageSize.getHeight() - 10
    );
  }

  // Sauvegarder le PDF
  doc.save('comparaison-hebergements.pdf');
}; 