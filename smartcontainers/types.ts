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
}

export interface LocationData {
  id: string;
  name: string;
  containerCount: number;
}

export interface ServiceData {
  id: string;
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
}

export interface ChecklistData {
  id: string;
  name: string;
  createdDate: string;
  editDate: string;
  stepCount: number;
  version: string;
}

export interface EventData {
  id: string;
  name: string;
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