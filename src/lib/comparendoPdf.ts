import { jsPDF } from 'jspdf';

// ─── Comparendo data model (shared by PDF + notifications) ────────────────────
export interface ComparendoData {
  numero: string;
  fechaExpedicion: string;
  // Infracción
  codigoInfraccion: string;
  descripcionInfraccion: string;
  valor: string;
  fechaInfraccion: string;
  horaInfraccion: string;
  interseccion: string;
  // Vehículo / infractor
  placa: string;
  propietario: string;
  cedula: string;
  tipoVehiculo: string;
  marca: string;
  modelo: string;
  color: string;
  // Agente
  agente: string;
}

const NAVY: [number, number, number] = [13, 34, 71];
const SLATE: [number, number, number] = [90, 112, 153];
const INK: [number, number, number] = [15, 31, 61];

/** Build a real, printable PDF of the comparendo and return the jsPDF doc. */
export function buildComparendoPdf(data: ComparendoData): jsPDF {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = 0;

  // ── Header band ──
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageW, 96, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('SIFCA', margin, 46);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(170, 200, 240);
  doc.text('Sistema Integral de Fotodetección y Control de Aforo', margin, 64);
  doc.text('Secretaría de Movilidad', margin, 78);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('ORDEN DE COMPARENDO', pageW - margin, 46, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(170, 200, 240);
  doc.text(`Nº ${data.numero}`, pageW - margin, 64, { align: 'right' });
  doc.text(`Expedido: ${data.fechaExpedicion}`, pageW - margin, 78, { align: 'right' });

  y = 132;

  const section = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    doc.text(title.toUpperCase(), margin, y);
    doc.setDrawColor(194, 206, 222);
    doc.setLineWidth(0.8);
    doc.line(margin, y + 6, pageW - margin, y + 6);
    y += 24;
  };

  const row = (label: string, value: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...SLATE);
    doc.text(label, margin, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    doc.text(value, margin + 170, y);
    y += 20;
  };

  section('Datos de la infracción');
  row('Código', data.codigoInfraccion);
  row('Descripción', data.descripcionInfraccion);
  row('Fecha y hora', `${data.fechaInfraccion}  ${data.horaInfraccion}`);
  row('Lugar', data.interseccion);
  row('Valor de la sanción', data.valor);
  y += 10;

  section('Vehículo');
  row('Placa', data.placa);
  row('Tipo', data.tipoVehiculo);
  row('Marca / Modelo', `${data.marca} · ${data.modelo}`);
  row('Color', data.color);
  y += 10;

  section('Infractor / propietario');
  row('Nombre', data.propietario);
  row('Documento', data.cedula);
  y += 10;

  section('Expedición');
  row('Agente expedidor', data.agente);
  row('Fecha de expedición', data.fechaExpedicion);

  // ── Footer / legal note ──
  const footerY = doc.internal.pageSize.getHeight() - 90;
  doc.setDrawColor(194, 206, 222);
  doc.setLineWidth(0.8);
  doc.line(margin, footerY, pageW - margin, footerY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...SLATE);
  const note =
    'El presunto infractor cuenta con los términos de ley para presentar descargos ante la autoridad de tránsito. ' +
    'Documento generado electrónicamente por el sistema SIFCA; su validez no requiere firma manuscrita.';
  doc.text(doc.splitTextToSize(note, pageW - margin * 2), margin, footerY + 18);
  doc.text(`Comparendo ${data.numero} · Generado el ${data.fechaExpedicion}`, margin, footerY + 54);

  return doc;
}

/** Trigger a browser download of the comparendo PDF. */
export function downloadComparendoPdf(data: ComparendoData): void {
  buildComparendoPdf(data).save(`comparendo-${data.numero}.pdf`);
}

/** Open the comparendo PDF in a new tab for preview. */
export function previewComparendoPdf(data: ComparendoData): void {
  const url = buildComparendoPdf(data).output('bloburl');
  window.open(url, '_blank', 'noopener,noreferrer');
}
