import React from 'react';

export interface ContainerData {
  id: string;
  assetType: AssetType;
  number: string;
  name: string;
  verificationPeriod: number;
  project: string;
  type: 'MANUAL' | 'AUTOMATIC';
  orderNumber: string;
  prototypes: number;
  currentNumbers: number;
  total: number;
  zaklad: ZakladType;
}

export interface CurrentNumberData {
  id: string;
  assetType: AssetType;
  containerNumber: string;
  currentNumber: string;
  containerName: string;
  status: 'Warunkowo dopuszczony' | 'Prototyp' | 'Zablokowany' | 'W użyciu' | 'Uszkodzony';
  type: 'Manualny' | 'Automatyczny';
  version: string;
  qrCode: string;
  nextVerification: string;
  owner: string;
  producer: string;
  location: string;
  zaklad: ZakladType;
  productionDate?: string;
}

export interface LocationData {
  id: string;
  assetType: AssetType;
  name: string;
  containerCount: number;
  zaklad: ZakladType;
}

export interface ServiceData {
  id: string;
  assetType: AssetType;
  containerNumber: string;
  currentNumber: string;
  containerName: string;
  status: string;
  ticketStatus: 'Otwarty' | 'Zamknięty';
  reportedDate: string;
  reportedBy: string;
  executionDate: string;
  owner: string;
  executor: string;
  location: string;
  zaklad: ZakladType;
}

export interface ChecklistData {
  id: string;
  assetType: AssetType;
  name: string;
  createdDate: string;
  editDate: string;
  stepCount: number;
  version: string;
  zaklad: ZakladType;
}

export interface EventData {
  id: string;
  assetType: AssetType;
  name: string;
  zaklad: ZakladType;
}

export interface MenuItem {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  expanded?: boolean;
  subItems?: string[];
}

export type ViewType = 'Dane podstawowe' | 'Numery bieżące' | 'Lokalizacje' | 'Serwis' | 'Checklisty' | 'Zdarzenia';

export type AssetType = 'Kontenery' | 'Trolleye' | 'Regały' | 'HSW';

export type ZakladType = 'Zakład Września' | 'Zakład Poznań';