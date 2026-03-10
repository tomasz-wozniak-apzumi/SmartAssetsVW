import React from 'react';
import { 
  Phone, 
  BookOpen, 
  Layers, 
  FileText, 
  GraduationCap, 
  Settings, 
  Package, 
  Users, 
  ShieldCheck, 
  Award
} from 'lucide-react';
import { ContainerData, CurrentNumberData, LocationData, ServiceData, ChecklistData, EventData, MenuItem, AssetType, ViewType } from './types';

export const ASSET_CONFIG: Record<AssetType, { defaultModule: ViewType, modules: ViewType[] }> = {
  'Kontenery': { defaultModule: 'Dane podstawowe', modules: ['Dane podstawowe', 'Numery bieżące', 'Lokalizacje', 'Serwis', 'Checklisty', 'Zdarzenia'] },
  'Trolleye': { defaultModule: 'Dane podstawowe', modules: ['Dane podstawowe', 'Numery bieżące', 'Lokalizacje', 'Serwis', 'Checklisty', 'Zdarzenia'] },
  'Regały': { defaultModule: 'Numery bieżące', modules: ['Numery bieżące', 'Lokalizacje', 'Serwis', 'Checklisty', 'Zdarzenia'] },
  'HSW': { defaultModule: 'Dane podstawowe', modules: ['Dane podstawowe', 'Numery bieżące', 'Lokalizacje', 'Serwis', 'Checklisty', 'Zdarzenia'] },
};

export const MOCK_CONTAINERS: ContainerData[] = [
  // Kontenery
  { id: '1', assetType: 'Kontenery', number: 'K-482', name: 'Kontener siatkowy typ A', verificationPeriod: 180, project: 'Precision Parts A', type: 'AUTOMATIC', orderNumber: 'ORD-99122', prototypes: 2, currentNumbers: 150, total: 152 },
  { id: '2', assetType: 'Kontenery', number: 'K-105', name: 'Kontener pełny z pokrywą', verificationPeriod: 90, project: 'Engine Block Line', type: 'MANUAL', orderNumber: 'PO-77231', prototypes: 0, currentNumbers: 85, total: 85 },
  { id: '3', assetType: 'Kontenery', number: 'K-731', name: 'Pojemnik KLT 600x400', verificationPeriod: 365, project: 'Raw Casting S3', type: 'AUTOMATIC', orderNumber: 'ORD-1123', prototypes: 0, currentNumbers: 240, total: 240 },
  // Trolleye
  { id: '4', assetType: 'Trolleye', number: 'TR-219', name: 'Trolley transportowy lekki', verificationPeriod: 30, project: 'Assembly Line 1', type: 'MANUAL', orderNumber: 'TX-55091', prototypes: 1, currentNumbers: 12, total: 13 },
  { id: '5', assetType: 'Trolleye', number: 'TR-604', name: 'Trolley ciężki platformowy', verificationPeriod: 180, project: 'SteelForge Alpha', type: 'MANUAL', orderNumber: 'ORD-8822', prototypes: 0, currentNumbers: 110, total: 110 },
  // HSW
  { id: '6', assetType: 'HSW', number: 'HSW-882', name: 'Wózek widłowy czołowy', verificationPeriod: 120, project: 'Magazyn Główny', type: 'AUTOMATIC', orderNumber: 'PO-44512', prototypes: 0, currentNumbers: 45, total: 45 },
  { id: '7', assetType: 'HSW', number: 'HSW-102', name: 'Paleciak z wagą', verificationPeriod: 365, project: 'Logistyka', type: 'MANUAL', orderNumber: 'PO-12344', prototypes: 0, currentNumbers: 20, total: 20 },
];

export const MOCK_CURRENT_NUMBERS: CurrentNumberData[] = [
  // Kontenery
  { id: '1', assetType: 'Kontenery', containerNumber: 'K-482', currentNumber: '195', containerName: 'Kontener siatkowy typ A', status: 'Warunkowo dopuszczony', type: 'Manualny', version: '1', qrCode: 'K482_1096', nextVerification: '18.02.2026', owner: 'Logistyka Wewnętrzna', producer: 'VW-AO', location: 'Clavey' },
  { id: '2', assetType: 'Kontenery', containerNumber: 'K-105', currentNumber: '001', containerName: 'Kontener pełny z pokrywą', status: 'W użyciu', type: 'Manualny', version: '1013', qrCode: 'K105_001', nextVerification: '27.08.2025', owner: 'VW', producer: 'Stal-bud', location: 'Gestamp Działkowców' },
  // Trolleye
  { id: '3', assetType: 'Trolleye', containerNumber: 'TR-219', currentNumber: '197', containerName: 'Trolley transportowy lekki', status: 'Prototyp', type: 'Automatyczny', version: '0', qrCode: 'TR219_40', nextVerification: '13.01.2025', owner: 'Inżynieria', producer: 'Troll-Pol', location: 'Gestamp Działkowców' },
  { id: '4', assetType: 'Trolleye', containerNumber: 'TR-604', currentNumber: '1991', containerName: 'Trolley ciężki platformowy', status: 'Zablokowany', type: 'Automatyczny', version: '0', qrCode: 'TR604_1004', nextVerification: '23.01.2025', owner: 'Utrzymanie Ruchu', producer: 'Troll-Pol', location: 'Gestamp Działkowców' },
  // Regały 
  { id: '5', assetType: 'Regały', containerNumber: 'REG-12', currentNumber: '001', containerName: 'Regał wysokiego składowania', status: 'W użyciu', type: 'Manualny', version: '1', qrCode: 'REG12_01', nextVerification: '10.12.2024', owner: 'Logistyka', producer: 'Regal-System', location: 'Magazyn A' },
  { id: '6', assetType: 'Regały', containerNumber: 'REG-14', currentNumber: '002', containerName: 'Regał paletowy rzędowy', status: 'W użyciu', type: 'Automatyczny', version: '2', qrCode: 'REG14_02', nextVerification: '15.11.2025', owner: 'Logistyka', producer: 'Regal-System', location: 'Magazyn B' },
  // HSW
  { id: '7', assetType: 'HSW', containerNumber: 'HSW-882', currentNumber: '023', containerName: 'Wózek widłowy czołowy', status: 'W użyciu', type: 'Automatyczny', version: '1.2', qrCode: 'HSW882_23', nextVerification: '05.05.2025', owner: 'Utrzymanie Ruchu', producer: 'Toyota', location: 'Hala 3' },
  { id: '8', assetType: 'HSW', containerNumber: 'HSW-102', currentNumber: '004', containerName: 'Paleciak z wagą', status: 'Uszkodzony', type: 'Manualny', version: '1.0', qrCode: 'HSW102_04', nextVerification: '01.09.2024', owner: 'Magazyn Wewnętrzny', producer: 'Mag-Tech', location: 'Strefa buforowa' },
];

export const MOCK_LOCATIONS: LocationData[] = [
  { id: '1', name: 'Testowa lok. A', containerCount: 0 },
  { id: '2', name: 'Testowa LokA', containerCount: 0 },
  { id: '3', name: 'Inna lok B', containerCount: 0 },
  { id: '4', name: 'gestamp Działkowców - Nieodczytane', containerCount: 0 },
  { id: '5', name: 'newCo - Nieodczytane', containerCount: 0 },
  { id: '6', name: 'besting - Nieodczytane', containerCount: 0 },
  { id: '7', name: 'clavey - Nieodczytane', containerCount: 0 },
  { id: '8', name: 'kwilcz - Nieodczytane', containerCount: 0 },
  { id: '9', name: 'vw', containerCount: 1 },
  { id: '10', name: 'gestamp Działkowców', containerCount: 0 }
];

export const MOCK_SERVICES: ServiceData[] = [
  { id: '102', containerNumber: '40', currentNumber: '961', containerName: '3', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 17:48', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców' },
  { id: '103', containerNumber: '41', currentNumber: '975', containerName: '4', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 17:48', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców' },
  { id: '108', containerNumber: '40', currentNumber: '961', containerName: '3', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 23:36', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców' },
  { id: '109', containerNumber: '41', currentNumber: '975', containerName: '4', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 23:36', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców' },
  { id: '118', containerNumber: '40', currentNumber: '961', containerName: '3', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '25.09.2024, 09:33', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców' },
  { id: '119', containerNumber: '41', currentNumber: '975', containerName: '4', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '25.09.2024, 09:33', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców' },
  { id: '120', containerNumber: '40', currentNumber: '961', containerName: '3', status: 'W użyciu', ticketStatus: 'Zamknięty', reportedDate: '25.09.2024, 09:35', reportedBy: 'Janusz Testowy', executionDate: '26.09.2024, 13:18', owner: 'VW', executor: 'KamilKamil Kamil D...', location: 'Gestamp Działkowców' },
  { id: '121', containerNumber: '40', currentNumber: '961', containerName: '3', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '26.09.2024, 13:50', reportedBy: 'KamilKamil Kamil D...', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców' },
  { id: '126', containerNumber: '40', currentNumber: '961', containerName: '3', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '27.09.2024, 08:55', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców' },
  { id: '127', containerNumber: '41', currentNumber: '975', containerName: '4', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '27.09.2024, 08:55', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców' },
];

export const MOCK_CHECKLISTS: ChecklistData[] = [
  { id: '1', name: 'Hubert', createdDate: '25.02.2022 11:09', editDate: '04.03.2022 10:21', stepCount: 0, version: '-' },
  { id: '2', name: 'Dawid - Testasd', createdDate: '25.02.2022 09:46', editDate: '28.02.2022 17:13', stepCount: 0, version: '-' },
  { id: '3', name: 'Test', createdDate: '06.05.2022 15:11', editDate: '06.05.2022 15:11', stepCount: 0, version: '-' },
  { id: '4', name: 'Piotr_test', createdDate: '17.05.2022 13:53', editDate: '17.05.2022 13:53', stepCount: 0, version: '-' },
  { id: '5', name: 'Testowy', createdDate: '28.02.2022 11:41', editDate: '28.02.2022 11:41', stepCount: 0, version: '-' },
];

export const MOCK_EVENTS: EventData[] = [
  { id: '1', name: 'Awaria' },
  { id: '2', name: 'Uszkodzenie' },
  { id: '3', name: 'Błąd ludzki' },
  { id: '4', name: 'Pęknięcie części hdhd shshs dbdhd snd db' },
  { id: '5', name: 'abc' },
  { id: '6', name: 'Awaria type 1' },
  { id: '7', name: 'Pomyłka' },
  { id: '8', name: 'asd' },
  { id: '9', name: 'New reason' },
  { id: '10', name: 'LLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit' },
];

export const MENU_ITEMS: MenuItem[] = [
  { title: 'Call', icon: <Phone size={18} /> },
  { title: 'Baza wiedzy', icon: <BookOpen size={18} /> },
  { title: 'Wizualizacje', icon: <Layers size={18} /> },
  { title: 'Procedury', icon: <FileText size={18} /> },
  { title: 'Trening', icon: <GraduationCap size={18} /> },
  { title: 'Serwis', icon: <Settings size={18} /> },
  { 
    title: 'Assety', 
    icon: <Package size={18} />, 
    active: true, 
    expanded: false
  },
  { title: 'Użytkownicy', icon: <Users size={18} /> },
  { title: 'Role', icon: <ShieldCheck size={18} /> },
  { title: 'Umiejętności', icon: <Award size={18} /> },
];