import { NextResponse } from 'next/server';

export async function GET() {
  // Simuler une récupération depuis une base de données
  const sellerInfo = {
    whatsapp: '2250787194296',
    companyName: 'LabPhas'
  };

  return NextResponse.json(sellerInfo);
}