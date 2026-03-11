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
  { id: '1', assetType: 'Kontenery', number: 'K-482', name: 'Kontener siatkowy typ A', verificationPeriod: 180, project: 'Precision Parts A', type: 'Automatyczny', orderNumber: 'ORD-99122', prototypes: 2, currentNumbers: 150, total: 152, zaklad: 'Zakład Września' },
  { id: '2', assetType: 'Kontenery', number: 'K-105', name: 'Kontener pełny z pokrywą', verificationPeriod: 90, project: 'Engine Block Line', type: 'Manualny', orderNumber: 'PO-77231', prototypes: 0, currentNumbers: 85, total: 85, zaklad: 'Zakład Poznań' },
  { id: '3', assetType: 'Kontenery', number: 'K-731', name: 'Pojemnik KLT 600x400', verificationPeriod: 365, project: 'Raw Casting S3', type: 'Automatyczny', orderNumber: 'ORD-1123', prototypes: 0, currentNumbers: 240, total: 240, zaklad: 'Zakład Września' },
  // Trolleye
  { id: '4', assetType: 'Trolleye', number: 'TR-219', name: 'Trolley transportowy lekki', verificationPeriod: 30, project: 'Assembly Line 1', type: 'Siatkowy', orderNumber: 'TX-55091', prototypes: 1, currentNumbers: 12, total: 13, zaklad: 'Zakład Poznań' },
  { id: '5', assetType: 'Trolleye', number: 'TR-604', name: 'Trolley ciężki platformowy', verificationPeriod: 180, project: 'SteelForge Alpha', type: 'Platformowy', orderNumber: 'ORD-8822', prototypes: 0, currentNumbers: 110, total: 110, zaklad: 'Zakład Września' },
  // HSW
  { id: '6', assetType: 'HSW', number: 'HSW-882', name: 'Wózek widłowy czołowy', verificationPeriod: 120, project: 'Magazyn Główny', type: 'Grawitacyjny', orderNumber: 'PO-44512', prototypes: 0, currentNumbers: 45, total: 45, zaklad: 'Zakład Września' },
  { id: '7', assetType: 'HSW', number: 'HSW-102', name: 'Paleciak z wagą', verificationPeriod: 365, project: 'Logistyka', type: 'Platformowy', orderNumber: 'PO-12344', prototypes: 0, currentNumbers: 20, total: 20, zaklad: 'Zakład Poznań' },
];

export const MOCK_CURRENT_NUMBERS: CurrentNumberData[] = [
  // Kontenery
  { id: '1', assetType: 'Kontenery', containerNumber: 'K-482', currentNumber: '195', containerName: 'Kontener siatkowy typ A', status: 'Warunkowo dopuszczony', type: 'Manualny', version: '1', qrCode: 'K482_1096', nextVerification: '18.02.2026', owner: 'Logistyka Wewnętrzna', producer: 'VW-AO', location: 'Clavey', zaklad: 'Zakład Września' },
  { id: '2', assetType: 'Kontenery', containerNumber: 'K-105', currentNumber: '001', containerName: 'Kontener pełny z pokrywą', status: 'W użyciu', type: 'Automatyczny', version: '1013', qrCode: 'K105_001', nextVerification: '27.08.2025', owner: 'VW', producer: 'Stal-bud', location: 'Gestamp Działkowców', zaklad: 'Zakład Poznań' },
  // Trolleye
  { id: '3', assetType: 'Trolleye', containerNumber: 'TR-219', currentNumber: '197', containerName: 'Trolley transportowy lekki', status: 'Prototyp', type: 'Siatkowy', version: '0', qrCode: 'TR219_40', nextVerification: '13.01.2025', owner: 'Inżynieria', producer: 'Troll-Pol', location: 'Gestamp Działkowców', zaklad: 'Zakład Września' },
  { id: '4', assetType: 'Trolleye', containerNumber: 'TR-604', currentNumber: '1991', containerName: 'Trolley ciężki platformowy', status: 'Zablokowany', type: 'Platformowy', version: '0', qrCode: 'TR604_1004', nextVerification: '23.01.2025', owner: 'Utrzymanie Ruchu', producer: 'Troll-Pol', location: 'Gestamp Działkowców', zaklad: 'Zakład Poznań' },
  // Regały 
  { id: '5', assetType: 'Regały', containerNumber: 'REG-12', currentNumber: '001', containerName: 'Regał wysokiego składowania', status: 'W użyciu', type: 'Wspornikowy', version: '1', qrCode: 'REG12_01', nextVerification: '10.12.2024', owner: 'Logistyka', producer: 'Regal-System', location: 'Magazyn A', zaklad: 'Zakład Poznań' },
  { id: '6', assetType: 'Regały', containerNumber: 'REG-14', currentNumber: '002', containerName: 'Regał paletowy rzędowy', status: 'W użyciu', type: 'Paletowy', version: '2', qrCode: 'REG14_02', nextVerification: '15.11.2025', owner: 'Logistyka', producer: 'Regal-System', location: 'Magazyn B', zaklad: 'Zakład Września' },
  // HSW
  { id: '7', assetType: 'HSW', containerNumber: 'HSW-882', currentNumber: '023', containerName: 'Wózek widłowy czołowy', status: 'W użyciu', type: 'Grawitacyjny', version: '1.2', qrCode: 'HSW882_23', nextVerification: '05.05.2025', owner: 'Utrzymanie Ruchu', producer: 'Toyota', location: 'Hala 3', zaklad: 'Zakład Września' },
  { id: '8', assetType: 'HSW', containerNumber: 'HSW-102', currentNumber: '004', containerName: 'Paleciak z wagą', status: 'Uszkodzony', type: 'Platformowy', version: '1.0', qrCode: 'HSW102_04', nextVerification: '01.09.2024', owner: 'Magazyn Wewnętrzny', producer: 'Mag-Tech', location: 'Strefa buforowa', zaklad: 'Zakład Poznań' },
];

export const MOCK_LOCATIONS: LocationData[] = [
  { id: '1', assetType: 'Kontenery', name: 'Hala Główna - Sektor A', containerCount: 45, zaklad: 'Zakład Września' },
  { id: '2', assetType: 'Trolleye', name: 'Hala Główna - Sektor B', containerCount: 12, zaklad: 'Zakład Poznań' },
  { id: '3', assetType: 'Regały', name: 'Magazyn Części Zamiennych', containerCount: 134, zaklad: 'Zakład Września' },
  { id: '4', assetType: 'HSW', name: 'Gestamp Działkowców', containerCount: 56, zaklad: 'Zakład Poznań' },
  { id: '5', assetType: 'Kontenery', name: 'Strefa Buforowa Wejściowa', containerCount: 8, zaklad: 'Zakład Września' },
  { id: '6', assetType: 'Trolleye', name: 'Strefa Buforowa Wyjściowa', containerCount: 22, zaklad: 'Zakład Poznań' },
  { id: '7', assetType: 'Regały', name: 'Linia Montażowa Silników', containerCount: 5, zaklad: 'Zakład Poznań' },
  { id: '8', assetType: 'HSW', name: 'Plac Zewnętrzny Północ', containerCount: 110, zaklad: 'Zakład Września' },
  { id: '9', assetType: 'Kontenery', name: 'VW Główny Oddział', containerCount: 78, zaklad: 'Zakład Poznań' },
  { id: '10', assetType: 'Regały', name: 'Magazyn Kwarantanny', containerCount: 3, zaklad: 'Zakład Września' }
];

export const MOCK_SERVICES: ServiceData[] = [
  { id: '102', assetType: 'Kontenery', containerNumber: 'K-482', currentNumber: '195', containerName: 'Kontener siatkowy', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 17:48', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców', zaklad: 'Zakład Poznań' },
  { id: '103', assetType: 'Kontenery', containerNumber: 'K-105', currentNumber: '001', containerName: 'Kontener pełny z pokrywą', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 17:48', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców', zaklad: 'Zakład Września' },
  { id: '108', assetType: 'Trolleye', containerNumber: 'TR-219', currentNumber: '197', containerName: 'Trolley transportowy', status: 'Uszkodzony', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 23:36', reportedBy: 'Adam Nowak', executionDate: '-', owner: 'Logistyka', executor: '-', location: 'Magazyn A', zaklad: 'Zakład Września' },
  { id: '109', assetType: 'HSW', containerNumber: 'HSW-882', currentNumber: '023', containerName: 'Wózek widłowy czołowy', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 23:36', reportedBy: 'Kamil Kowalski', executionDate: '-', owner: 'Utrzymanie Ruchu', executor: '-', location: 'Hala 3', zaklad: 'Zakład Poznań' },
  { id: '118', assetType: 'Regały', containerNumber: 'REG-12', currentNumber: '001', containerName: 'Regał wysokiego składowania', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '25.09.2024, 09:33', reportedBy: 'Michał Wiśniewski', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców', zaklad: 'Zakład Września' },
  { id: '120', assetType: 'Kontenery', containerNumber: 'K-731', currentNumber: '240', containerName: 'Pojemnik KLT', status: 'Naprawiony', ticketStatus: 'Zamknięty', reportedDate: '25.09.2024, 09:35', reportedBy: 'Janusz Testowy', executionDate: '26.09.2024, 13:18', owner: 'VW', executor: 'Serwis Zewnętrzny', location: 'Clavey', zaklad: 'Zakład Poznań' },
  { id: '121', assetType: 'Trolleye', containerNumber: 'TR-604', currentNumber: '1991', containerName: 'Trolley ciężki', status: 'Zablokowany', ticketStatus: 'Otwarty', reportedDate: '26.09.2024, 13:50', reportedBy: 'Kamil Kamil D...', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców', zaklad: 'Zakład Poznań' },
  { id: '126', assetType: 'HSW', containerNumber: 'HSW-102', currentNumber: '004', containerName: 'Paleciak z wagą', status: 'W użyciu', ticketStatus: 'Otwarty', reportedDate: '27.09.2024, 08:55', reportedBy: 'Janusz Testowy', executionDate: '-', owner: 'VW', executor: '-', location: 'Strefa buforowa', zaklad: 'Zakład Września' },
];

export const MOCK_CHECKLISTS: ChecklistData[] = [
  // Kontenery
  { id: 'c1', assetType: 'Kontenery', name: 'Inspekcja wizualna kontenera', createdDate: '25.02.2022 11:09', editDate: '04.03.2022 10:21', stepCount: 5, version: '1.2', zaklad: 'Zakład Września' },
  { id: 'c2', assetType: 'Kontenery', name: 'Sprawdzenie wagi pojemnika', createdDate: '28.02.2022 11:41', editDate: '28.02.2022 11:41', stepCount: 3, version: '1.0', zaklad: 'Zakład Poznań' },
  { id: 'c3', assetType: 'Kontenery', name: 'Kontrola spójności spawów', createdDate: '10.03.2022 09:15', editDate: '12.03.2022 14:30', stepCount: 8, version: '2.0', zaklad: 'Zakład Września' },
  { id: 'c4', assetType: 'Kontenery', name: 'Zezłomowanie i recykling', createdDate: '15.04.2022 08:00', editDate: '15.04.2022 08:20', stepCount: 4, version: '1.1', zaklad: 'Zakład Poznań' },

  // Trolleye
  { id: 't1', assetType: 'Trolleye', name: 'Kontrola układu jezdnego', createdDate: '06.05.2022 15:11', editDate: '06.05.2022 15:11', stepCount: 6, version: '1.0', zaklad: 'Zakład Poznań' },
  { id: 't2', assetType: 'Trolleye', name: 'Sprawdzenie dyszla pociągowego', createdDate: '12.06.2022 07:30', editDate: '13.06.2022 09:20', stepCount: 3, version: '1.1', zaklad: 'Zakład Września' },
  { id: 't3', assetType: 'Trolleye', name: 'Ocena stanu powłoki lakierniczej', createdDate: '20.07.2022 10:00', editDate: '20.07.2022 10:55', stepCount: 2, version: '1.0', zaklad: 'Zakład Września' },

  // Regały
  { id: 'r1', assetType: 'Regały', name: 'Przegląd nośności i stabilności regału', createdDate: '25.02.2022 09:46', editDate: '28.02.2022 17:13', stepCount: 12, version: '3.1', zaklad: 'Zakład Poznań' },
  { id: 'r2', assetType: 'Regały', name: 'Inspekcja uszkodzeń słupów nośnych', createdDate: '05.08.2022 11:20', editDate: '06.08.2022 12:40', stepCount: 7, version: '1.3', zaklad: 'Zakład Września' },
  { id: 'r3', assetType: 'Regały', name: 'Kontrola mocowań do posadzki i stężeń', createdDate: '11.09.2022 08:15', editDate: '11.09.2022 09:10', stepCount: 5, version: '1.0', zaklad: 'Zakład Poznań' },

  // HSW
  { id: 'h1', assetType: 'HSW', name: 'UDT: Codzienna kontrola pracownicza', createdDate: '17.05.2022 13:53', editDate: '17.05.2022 13:53', stepCount: 15, version: '2.5', zaklad: 'Zakład Poznań' },
  { id: 'h2', assetType: 'HSW', name: 'Przegląd układu hydraulicznego i wideł', createdDate: '22.10.2022 07:00', editDate: '22.10.2022 08:30', stepCount: 10, version: '1.4', zaklad: 'Zakład Września' },
  { id: 'h3', assetType: 'HSW', name: 'Weryfikacja hamulców i kierowania', createdDate: '30.11.2022 14:20', editDate: '01.12.2022 10:15', stepCount: 8, version: '1.1', zaklad: 'Zakład Poznań' },
];

export const MOCK_EVENTS: EventData[] = [
  { id: '1', assetType: 'Kontenery', name: 'Awaria mechaniczna koła', zaklad: 'Zakład Września' },
  { id: '2', assetType: 'Trolleye', name: 'Uszkodzenie poszycia bocznego', zaklad: 'Zakład Poznań' },
  { id: '3', assetType: 'Regały', name: 'Błąd operatora przy załadunku', zaklad: 'Zakład Września' },
  { id: '4', assetType: 'HSW', name: 'Zniszczenie etykiety RFID/QR', zaklad: 'Zakład Poznań' },
  { id: '5', assetType: 'Kontenery', name: 'Pęknięcie spawu konstrukcyjnego', zaklad: 'Zakład Września' },
  { id: '6', assetType: 'Trolleye', name: 'Zalanie cieczą eksploatacyjną', zaklad: 'Zakład Poznań' },
  { id: '7', assetType: 'Regały', name: 'Zgubienie podczas transportu na zewnątrz', zaklad: 'Zakład Poznań' },
  { id: '8', assetType: 'HSW', name: 'Odrzucenie podczas kontroli jakości', zaklad: 'Zakład Września' },
  { id: '9', assetType: 'Kontenery', name: 'Korozja elementów mocujących', zaklad: 'Zakład Września' },
  { id: '10', assetType: 'HSW', name: 'Kolizja z wózkiem widłowym HSW', zaklad: 'Zakład Poznań' },
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