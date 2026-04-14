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
  'Środki Transportu': { defaultModule: 'Dane podstawowe', modules: ['Dane podstawowe', 'Numery bieżące', 'Lokalizacje', 'Serwis', 'Checklisty', 'Zdarzenia'] },
};

export const MOCK_CONTAINERS: ContainerData[] = [
  // Kontenery
  { id: '1', assetType: 'Kontenery', number: 'KLT-6147', name: 'Pojemnik KLT 600x400', verificationPeriod: 180, project: 'Caddy/Transporter', type: 'Automatyczny', orderNumber: 'ORD-9122', prototypes: 2, currentNumbers: 1500, total: 1502, zaklad: 'Zakład Września' },
  { id: '2', assetType: 'Kontenery', number: 'GBX-001', name: 'Euro Gitterbox', verificationPeriod: 360, project: 'Odlewy aluminiowe', type: 'Manualny', orderNumber: 'PO-77231', prototypes: 0, currentNumbers: 850, total: 850, zaklad: 'Zakład Poznań' },
  { id: '3', assetType: 'Kontenery', number: 'KLT-4147', name: 'Pojemnik KLT 400x300', verificationPeriod: 365, project: 'Crafter', type: 'Automatyczny', orderNumber: 'ORD-1123', prototypes: 0, currentNumbers: 2400, total: 2400, zaklad: 'Zakład Września' },
  // Trolleye
  { id: '4', assetType: 'Trolleye', number: 'TR-SEQ', name: 'Trolley sekwencyjny wiązek', verificationPeriod: 30, project: 'Grand California', type: 'Siatkowy', orderNumber: 'TX-5091', prototypes: 1, currentNumbers: 42, total: 43, zaklad: 'Zakład Września' },
  { id: '5', assetType: 'Trolleye', number: 'TR-PLAT', name: 'Trolley transportowy platformowy', verificationPeriod: 180, project: 'Silniki', type: 'Platformowy', orderNumber: 'ORD-8822', prototypes: 0, currentNumbers: 110, total: 110, zaklad: 'Zakład Poznań' },
  // HSW
  { id: '6', assetType: 'HSW', number: 'AGV-CRAF', name: 'HSW AGV Crafter', verificationPeriod: 90, project: 'Magazyn Główny', type: 'Automatyczny', orderNumber: 'PO-44512', prototypes: 0, currentNumbers: 45, total: 45, zaklad: 'Zakład Września' },
  { id: '7', assetType: 'HSW', number: 'HSW-MAN', name: 'Podstawa rolkowa Caddy', verificationPeriod: 365, project: 'Montaż', type: 'Manualny', orderNumber: 'PO-12344', prototypes: 0, currentNumbers: 120, total: 120, zaklad: 'Zakład Poznań' },
  { id: 'hsw3', assetType: 'HSW', number: 'HSW-T6', name: 'Podstawa rolkowa Transporter', verificationPeriod: 180, project: 'Linia Montażu T6', type: 'Manualny', orderNumber: 'ORD-1002', prototypes: 2, currentNumbers: 80, total: 82, zaklad: 'Zakład Poznań' },
  { id: 'hsw4', assetType: 'HSW', number: 'AGV-SEQ', name: 'AGV Sekwencyjny JIT', verificationPeriod: 90, project: 'Strefa Sekwencjonowania', type: 'Automatyczny', orderNumber: 'PO-44899', prototypes: 0, currentNumbers: 15, total: 15, zaklad: 'Zakład Września' },
  { id: 'hsw5', assetType: 'HSW', number: 'HSW-HV', name: 'Podstawa Baterii HV', verificationPeriod: 180, project: 'Montaż Baterii', type: 'Manualny', orderNumber: 'ORD-988', prototypes: 5, currentNumbers: 30, total: 35, zaklad: 'Zakład Września' },
  { id: 'hsw6', assetType: 'HSW', number: 'HSW-CUST', name: 'Podstawa rolkowa Custom', verificationPeriod: 360, project: 'Zabudowy Specjalne', type: 'Manualny', orderNumber: 'PO-888', prototypes: 0, currentNumbers: 10, total: 10, zaklad: 'Zakład Poznań' },
  // Środki Transportu
  { id: '8', assetType: 'Środki Transportu', number: 'TRUCK-STL', name: 'Wózek platformowy Still', verificationPeriod: 365, project: 'Logistyka', type: 'Typ A', orderNumber: 'PO-9912', prototypes: 0, currentNumbers: 15, total: 15, zaklad: 'Zakład Września' },
  { id: '9', assetType: 'Środki Transportu', number: 'TRUCK-MLX', name: 'Pojazd Melex', verificationPeriod: 180, project: 'Magazyn Zewnętrzny', type: 'Typ B', orderNumber: 'PO-9913', prototypes: 5, currentNumbers: 10, total: 15, zaklad: 'Zakład Poznań' },
];

export const MOCK_CURRENT_NUMBERS: CurrentNumberData[] = [
  // Kontenery
  { id: '1', assetType: 'Kontenery', containerNumber: 'KLT-6147', currentNumber: '1096', containerName: 'Pojemnik KLT 600x400', status: 'W użyciu', type: 'Automatyczny', version: '2', qrCode: 'KLT6147_1096', nextVerification: '18.02.2026', owner: 'Logistyka Wewnętrzna', producer: 'Schaefer', location: 'Linia Montażu Crafter', zaklad: 'Zakład Września' },
  { id: '2', assetType: 'Kontenery', containerNumber: 'GBX-001', currentNumber: '001', containerName: 'Euro Gitterbox', status: 'Zablokowany', type: 'Manualny', version: '1', qrCode: 'GBX001_001', nextVerification: '27.08.2025', owner: 'Odlewnia', producer: 'Stal-bud', location: 'Park Dostawców CLIP', zaklad: 'Zakład Poznań' },
  { id: '10', assetType: 'Kontenery', containerNumber: 'KLT-4147', currentNumber: '045', containerName: 'Pojemnik KLT 400x300', status: 'Warunkowo dopuszczony', type: 'Automatyczny', version: '1', qrCode: 'KLT4147_045', nextVerification: '10.10.2025', owner: 'Logistyka Wewnętrzna', producer: 'Schaefer', location: 'Hala Spawalni', zaklad: 'Zakład Września' },
  // Trolleye
  { id: '3', assetType: 'Trolleye', containerNumber: 'TR-SEQ', currentNumber: '040', containerName: 'Trolley sekwencyjny wiązek', status: 'Prototyp', type: 'Siatkowy', version: '0', qrCode: 'TRSEQ_40', nextVerification: '13.01.2025', owner: 'Inżynieria', producer: 'Troll-Pol', location: 'Strefa Sekwencjonowania', zaklad: 'Zakład Września' },
  { id: '4', assetType: 'Trolleye', containerNumber: 'TR-PLAT', currentNumber: '1004', containerName: 'Trolley transportowy platformowy', status: 'Zablokowany', type: 'Platformowy', version: '1', qrCode: 'TRPLAT_1004', nextVerification: '23.01.2025', owner: 'Utrzymanie Ruchu', producer: 'Wanzl', location: 'Gestamp Działkowców', zaklad: 'Zakład Poznań' },
  // Regały 
  { id: '5', assetType: 'Regały', containerNumber: 'REG-12', currentNumber: '001', containerName: 'Regał wysokiego składowania elementów karoserii', status: 'W użyciu', type: 'Wspornikowy', version: '1', qrCode: 'REG12_01', nextVerification: '10.12.2024', owner: 'Logistyka', producer: 'Regal-System', location: 'Lakiernia 1', zaklad: 'Zakład Poznań' },
  { id: '6', assetType: 'Regały', containerNumber: 'REG-14', currentNumber: '002', containerName: 'Regał półkowy na części drobne', status: 'W użyciu', type: 'Półkowy', version: '2', qrCode: 'REG14_02', nextVerification: '15.11.2025', owner: 'Logistyka', producer: 'Mecalux', location: 'Magazyn Główny', zaklad: 'Zakład Września' },
  // HSW
  { id: '7', assetType: 'HSW', containerNumber: 'AGV-CRAF', currentNumber: '023', containerName: 'HSW AGV Crafter', status: 'Nowy', type: 'Automatyczny', version: '2.1', qrCode: 'AGV_23', nextVerification: '05.05.2025', owner: 'Utrzymanie Ruchu', producer: 'Gottwald', location: 'Tłocznia', zaklad: 'Zakład Września' },
  { id: '8', assetType: 'HSW', containerNumber: 'HSW-MAN', currentNumber: '004', containerName: 'Podstawa rolkowa Caddy', status: 'W użyciu', type: 'Manualny', version: '1.0', qrCode: 'HSWMAN_04', nextVerification: '01.09.2024', owner: 'Magazyn Wewnętrzny', producer: 'Mag-Tech', location: 'Park Dostawców CLIP', zaklad: 'Zakład Poznań' },
  { id: 'cn-hsw3', assetType: 'HSW', containerNumber: 'HSW-T6', currentNumber: '011', containerName: 'Podstawa rolkowa Transporter', status: 'Warunkowo dopuszczony', type: 'Manualny', version: '1.1', qrCode: 'HSWT6_11', nextVerification: '12.11.2025', owner: 'Logistyka', producer: 'Troll-Pol', location: 'Hala Montażu Głównego', zaklad: 'Zakład Poznań' },
  { id: 'cn-hsw4', assetType: 'HSW', containerNumber: 'AGV-SEQ', currentNumber: '002', containerName: 'AGV Sekwencyjny JIT', status: 'Zablokowany', type: 'Automatyczny', version: '3.0', qrCode: 'AGVSEQ_02', nextVerification: '20.08.2025', owner: 'Inżynieria', producer: 'Gottwald', location: 'Strefa Sekwencjonowania', zaklad: 'Zakład Września' },
  { id: 'cn-hsw5', assetType: 'HSW', containerNumber: 'HSW-HV', currentNumber: '008', containerName: 'Podstawa Baterii HV', status: 'Prototyp', type: 'Manualny', version: '0.9', qrCode: 'HSWHV_08', nextVerification: '01.12.2024', owner: 'Dział Rozwoju', producer: 'VW R&D', location: 'Laboratorium HV', zaklad: 'Zakład Września' },
  { id: 'cn-hsw6', assetType: 'HSW', containerNumber: 'HSW-CUST', currentNumber: '001', containerName: 'Podstawa rolkowa Custom', status: 'Nieużywany', type: 'Manualny', version: '1.0', qrCode: 'HSWCUST_01', nextVerification: '-', owner: 'Zabudowy', producer: 'Stal-bud', location: 'Magazyn Kwarantanny', zaklad: 'Zakład Poznań' },
  // Środki Transportu
  { id: '9', assetType: 'Środki Transportu', containerNumber: 'TRUCK-STL', currentNumber: '001', containerName: 'Wózek platformowy Still', status: 'W użyciu', type: 'Typ A', version: '1.0', qrCode: 'TRUCK_01', nextVerification: '10.10.2025', owner: 'Logistyka', producer: 'Still', location: 'Magazyn Centralny', zaklad: 'Zakład Września' },
  { id: '11', assetType: 'Środki Transportu', containerNumber: 'TRUCK-MLX', currentNumber: '005', containerName: 'Pojazd Melex', status: 'W użyciu', type: 'Typ B', version: '1.2', qrCode: 'MLX_05', nextVerification: '12.12.2025', owner: 'Utrzymanie Terenu', producer: 'Melex', location: 'Hala Spawalni', zaklad: 'Zakład Poznań' },
];

export const MOCK_LOCATIONS: LocationData[] = [
  { id: '1', assetType: 'Kontenery', name: 'Hala Spawalni - Konstrukcja Podwozia Crafter', containerCount: 450, zaklad: 'Zakład Września' },
  { id: '2', assetType: 'Trolleye', name: 'Hala Montażu Głównego', containerCount: 120, zaklad: 'Zakład Poznań' },
  { id: '3', assetType: 'Regały', name: 'Tłocznia - Magazyn Matryc', containerCount: 34, zaklad: 'Zakład Września' },
  { id: '4', assetType: 'HSW', name: 'Gestamp Działkowców - Strefa Wejściowa', containerCount: 56, zaklad: 'Zakład Poznań' },
  { id: '5', assetType: 'Kontenery', name: 'Lakiernia 1 - Przygotowanie Zderzaków', containerCount: 108, zaklad: 'Zakład Września' },
  { id: '6', assetType: 'Trolleye', name: 'Strefa Sekwencjonowania - Wiązki', containerCount: 22, zaklad: 'Zakład Poznań' },
  { id: '7', assetType: 'Regały', name: 'Linia Montażowa Silników i Skrzyń', containerCount: 45, zaklad: 'Zakład Poznań' },
  { id: 'loc-hsw2', assetType: 'HSW', name: 'Hala Montażu Głównego - Linia 3', containerCount: 30, zaklad: 'Zakład Poznań' },
  { id: 'loc-hsw3', assetType: 'HSW', name: 'Strefa Sekwencjonowania CLIP', containerCount: 15, zaklad: 'Zakład Poznań' },
  { id: '8', assetType: 'HSW', name: 'Odlewnia Aluminiowa', containerCount: 110, zaklad: 'Zakład Września' },
  { id: 'loc-hsw5', assetType: 'HSW', name: 'Laboratorium HV - Strefa Testów', containerCount: 5, zaklad: 'Zakład Września' },
  { id: 'loc-hsw6', assetType: 'HSW', name: 'Hala Spawalni - Sektor B', containerCount: 40, zaklad: 'Zakład Września' },
  { id: '9', assetType: 'Kontenery', name: 'Park Dostawców CLIP', containerCount: 878, zaklad: 'Zakład Poznań' },
  { id: '10', assetType: 'Regały', name: 'Magazyn Kwarantanny - Części Wadliwe', containerCount: 13, zaklad: 'Zakład Września' },
  { id: '11', assetType: 'Środki Transportu', name: 'Zajezdnia Wózków Widłowych', containerCount: 25, zaklad: 'Zakład Września' }
];

export const MOCK_SERVICES: ServiceData[] = [
  { id: '102', assetType: 'Kontenery', containerNumber: 'KLT-6147', currentNumber: '1096', containerName: 'Pojemnik KLT', status: 'Uszkodzony', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 17:48', reportedBy: 'Marek Spawalnik', executionDate: '-', owner: 'Logistyka', executor: '-', location: 'Hala Spawalni', zaklad: 'Zakład Września' },
  { id: '103', assetType: 'Kontenery', containerNumber: 'GBX-001', currentNumber: '001', containerName: 'Euro Gitterbox', status: 'Zablokowany', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 17:48', reportedBy: 'Adam Nowak', executionDate: '-', owner: 'VW', executor: '-', location: 'Gestamp Działkowców', zaklad: 'Zakład Poznań' },
  { id: '108', assetType: 'Trolleye', containerNumber: 'TR-SEQ', currentNumber: '040', containerName: 'Trolley sekwencyjny', status: 'Uszkodzony', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 23:36', reportedBy: 'Kamil Kowalski', executionDate: '-', owner: 'Logistyka', executor: '-', location: 'Strefa Sekwencjonowania', zaklad: 'Zakład Września' },
  { id: '109', assetType: 'HSW', containerNumber: 'AGV-CRAF', currentNumber: '023', containerName: 'HSW AGV Crafter', status: 'Awaria', ticketStatus: 'Otwarty', reportedDate: '24.09.2024, 23:36', reportedBy: 'System Diagnostyczny', executionDate: '-', owner: 'Utrzymanie Ruchu', executor: 'Serwis Jungheinrich', location: 'Linia Montażu', zaklad: 'Zakład Września' },
  { id: 'srv-hsw2', assetType: 'HSW', containerNumber: 'AGV-SEQ', currentNumber: '002', containerName: 'AGV Sekwencyjny JIT', status: 'Zablokowane koła', ticketStatus: 'Otwarty', reportedDate: '25.09.2024, 10:15', reportedBy: 'Operator Linii', executionDate: '-', owner: 'Logistyka', executor: '-', location: 'Strefa Sekwencjonowania', zaklad: 'Zakład Września' },
  { id: 'srv-hsw3', assetType: 'HSW', containerNumber: 'HSW-T6', currentNumber: '011', containerName: 'Podstawa rolkowa Transporter', status: 'Pęknięta rama', ticketStatus: 'Otwarty', reportedDate: '26.09.2024, 08:30', reportedBy: 'Inspektor BHP', executionDate: '-', owner: 'Utrzymanie Ruchu', executor: 'Serwis Spawalniczy', location: 'Hala Montażu Głównego', zaklad: 'Zakład Poznań' },
  { id: 'srv-hsw4', assetType: 'HSW', containerNumber: 'HSW-MAN', currentNumber: '004', containerName: 'Podstawa rolkowa Caddy', status: 'Wymiana rolek', ticketStatus: 'Zamknięty', reportedDate: '20.09.2024, 12:00', reportedBy: 'Adam Nowak', executionDate: '21.09.2024, 14:00', owner: 'Magazyn Wewnętrzny', executor: 'Warsztat Wewnętrzny', location: 'Park Dostawców CLIP', zaklad: 'Zakład Poznań' },
  { id: 'srv-hsw5', assetType: 'HSW', containerNumber: 'HSW-HV', currentNumber: '008', containerName: 'Podstawa Baterii HV', status: 'Przegląd okresowy', ticketStatus: 'Otwarty', reportedDate: '28.09.2024, 09:00', reportedBy: 'System', executionDate: '-', owner: 'Dział Rozwoju', executor: '-', location: 'Laboratorium HV', zaklad: 'Zakład Września' },
  { id: 'srv-hsw6', assetType: 'HSW', containerNumber: 'HSW-CUST', currentNumber: '001', containerName: 'Podstawa rolkowa Custom', status: 'Brak etykiety RFID', ticketStatus: 'Otwarty', reportedDate: '29.09.2024, 11:45', reportedBy: 'Jan Kowalski', executionDate: '-', owner: 'Zabudowy', executor: 'IT Logistyka', location: 'Magazyn Kwarantanny', zaklad: 'Zakład Poznań' },
  { id: '118', assetType: 'Regały', containerNumber: 'REG-12', currentNumber: '001', containerName: 'Regał wysokiego składowania', status: 'Do przeglądu', ticketStatus: 'Otwarty', reportedDate: '25.09.2024, 09:33', reportedBy: 'Inspektor BHP', executionDate: '-', owner: 'VW', executor: '-', location: 'Odlewnia Aluminiowa', zaklad: 'Zakład Września' },
  { id: '120', assetType: 'Kontenery', containerNumber: 'KLT-4147', currentNumber: '045', containerName: 'Pojemnik KLT', status: 'Naprawiony', ticketStatus: 'Zamknięty', reportedDate: '25.09.2024, 09:35', reportedBy: 'Janusz Utrzymanie', executionDate: '26.09.2024, 13:18', owner: 'VW', executor: 'Serwis Zewnętrzny', location: 'Park Dostawców CLIP', zaklad: 'Zakład Poznań' },
  { id: '121', assetType: 'Trolleye', containerNumber: 'TR-PLAT', currentNumber: '1004', containerName: 'Trolley transportowy platformowy', status: 'Zablokowany', ticketStatus: 'Otwarty', reportedDate: '26.09.2024, 13:50', reportedBy: 'Operator', executionDate: '-', owner: 'VW', executor: '-', location: 'Lakiernia 1', zaklad: 'Zakład Poznań' },
  { id: '130', assetType: 'Środki Transportu', containerNumber: 'TRUCK-STL', currentNumber: '001', containerName: 'Wózek platformowy Still', status: 'Do przeglądu', ticketStatus: 'Otwarty', reportedDate: '28.09.2024, 10:00', reportedBy: 'Tomasz Lider', executionDate: '-', owner: 'Logistyka', executor: '-', location: 'Zajezdnia Wózków Widłowych', zaklad: 'Zakład Września' },
];

export const MOCK_CHECKLISTS: ChecklistData[] = [
  // Kontenery
  { id: 'c1', assetType: 'Kontenery', name: 'Wizualna inspekcja siatek KLT/GBX', createdDate: '25.02.2022 11:09', editDate: '04.03.2022 10:21', stepCount: 5, version: '2.1', zaklad: 'Zakład Września' },
  { id: 'c2', assetType: 'Kontenery', name: 'Test zawiasów pojemnika z pokrywą', createdDate: '28.02.2022 11:41', editDate: '28.02.2022 11:41', stepCount: 3, version: '1.0', zaklad: 'Zakład Poznań' },
  { id: 'c3', assetType: 'Kontenery', name: 'Kontrola spójności spawów stalowych', createdDate: '10.03.2022 09:15', editDate: '12.03.2022 14:30', stepCount: 8, version: '2.0', zaklad: 'Zakład Września' },

  // Trolleye
  { id: 't1', assetType: 'Trolleye', name: 'Test zablokowana kół skrętnych', createdDate: '06.05.2022 15:11', editDate: '06.05.2022 15:11', stepCount: 4, version: '1.2', zaklad: 'Zakład Poznań' },
  { id: 't2', assetType: 'Trolleye', name: 'Sprawdzenie dyszla pociągowego Trolley', createdDate: '12.06.2022 07:30', editDate: '13.06.2022 09:20', stepCount: 6, version: '1.1', zaklad: 'Zakład Września' },

  // Regały
  { id: 'r1', assetType: 'Regały', name: 'Przegląd nośności i stabilności regału wysokiego', createdDate: '25.02.2022 09:46', editDate: '28.02.2022 17:13', stepCount: 15, version: '3.1', zaklad: 'Zakład Poznań' },
  { id: 'r2', assetType: 'Regały', name: 'Inspekcja odkształceń słupów po kolizji czołowej', createdDate: '05.08.2022 11:20', editDate: '06.08.2022 12:40', stepCount: 7, version: '1.3', zaklad: 'Zakład Września' },

  // HSW
  { id: 'h1', assetType: 'HSW', name: 'BHP UDT: Codzienna kontrola podstaw rolkowych', createdDate: '17.05.2022 13:53', editDate: '17.05.2022 13:53', stepCount: 15, version: '2.5', zaklad: 'Zakład Poznań' },
  { id: 'h2', assetType: 'HSW', name: 'Inspekcja czujników laserowych AGV', createdDate: '22.10.2022 07:00', editDate: '22.10.2022 08:30', stepCount: 22, version: '4.4', zaklad: 'Zakład Września' },
  { id: 'hsw-chk3', assetType: 'HSW', name: 'Przegląd układu jezdnego i hamulców', createdDate: '10.01.2023 09:00', editDate: '11.01.2023 10:15', stepCount: 12, version: '1.2', zaklad: 'Zakład Poznań' },
  { id: 'hsw-chk4', assetType: 'HSW', name: 'Weryfikacja systemu zasilania Li-Ion', createdDate: '05.03.2023 11:30', editDate: '06.03.2023 12:00', stepCount: 8, version: '2.0', zaklad: 'Zakład Września' },
  { id: 'hsw-chk5', assetType: 'HSW', name: 'Audyt bezpieczeństwa po kolizyjny', createdDate: '15.06.2023 14:00', editDate: '15.06.2023 15:30', stepCount: 18, version: '1.1', zaklad: 'Zakład Poznań' },
  { id: 'hsw-chk6', assetType: 'HSW', name: 'Kontrola powłoki antykorozyjnej ramy', createdDate: '20.08.2023 08:45', editDate: '20.08.2023 09:20', stepCount: 5, version: '1.0', zaklad: 'Zakład Września' },

  // Środki Transportu
  { id: 'st1', assetType: 'Środki Transportu', name: 'Przegląd akumulatora i złącz zasilających V12', createdDate: '01.01.2023 08:00', editDate: '01.01.2023 08:00', stepCount: 10, version: '1.0', zaklad: 'Zakład Września' },
  { id: 'st2', assetType: 'Środki Transportu', name: 'Test hamulców bezpieczeństwa Melex', createdDate: '10.02.2023 10:00', editDate: '15.02.2023 11:20', stepCount: 8, version: '1.1', zaklad: 'Zakład Poznań' },
];

export const MOCK_EVENTS: EventData[] = [
  { id: '1', assetType: 'Kontenery', name: 'Zagniecenie krawędzi podczas wyładunku Gestamp', zaklad: 'Zakład Września' },
  { id: '2', assetType: 'Trolleye', name: 'Zniszczenie ucha holowniczego przez wózek czołowy', zaklad: 'Zakład Poznań' },
  { id: '3', assetType: 'Regały', name: 'Zahaczenie wideł wózka o stężenie poziome', zaklad: 'Zakład Września' },
  { id: '4', assetType: 'HSW', name: 'Błąd kalibracji sensora bezwładnościowego', zaklad: 'Zakład Poznań' },
  { id: '5', assetType: 'Kontenery', name: 'Pęknięcie dna KLT po upadku z taśmy', zaklad: 'Zakład Września' },
  { id: '6', assetType: 'Trolleye', name: 'Zablokowanie polimerowej warstwy kół na żywicy powłoki', zaklad: 'Zakład Poznań' },
  { id: '7', assetType: 'Regały', name: 'Przypadkowe zwolnienie blokady palety', zaklad: 'Zakład Poznań' },
  { id: '8', assetType: 'HSW', name: 'Kolizja podstawy rolkowej na Hali Spawalni', zaklad: 'Zakład Września' },
  { id: '9', assetType: 'Kontenery', name: 'Zgubienie etykiety VDA w procesie mycia', zaklad: 'Zakład Września' },
  { id: '10', assetType: 'HSW', name: 'Przepalenie pinu w baterii Li-Ion', zaklad: 'Zakład Poznań' },
  { id: 'ev-hsw4', assetType: 'HSW', name: 'Uszkodzenie rolek nośnych na nierówności posadzki', zaklad: 'Zakład Września' },
  { id: 'ev-hsw5', assetType: 'HSW', name: 'Zablokowanie kół polimerowych fragmentem taśmy', zaklad: 'Zakład Poznań' },
  { id: 'ev-hsw6', assetType: 'HSW', name: 'Nagłe zatrzymanie AGV powodujące rozsypanie detali', zaklad: 'Zakład Września' },
  { id: '11', assetType: 'Środki Transportu', name: 'Mocne zużycie opon trakcyjnych wózka Still', zaklad: 'Zakład Września' },
  { id: '12', assetType: 'Środki Transportu', name: 'Zgłoszenie słabego działania pompy hydraulicznej', zaklad: 'Zakład Września' },
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

// Automatyczne wypełnienie brakujących danych do pełnych 10 dla każdej kombinacji (Asset x Przestrzeń)
const assetsList: AssetType[] = ['Kontenery', 'Trolleye', 'Regały', 'HSW', 'Środki Transportu'];
const zakladList: ZakladType[] = ['Zakład Września', 'Zakład Poznań'];

assetsList.forEach(asset => {
  zakladList.forEach(zaklad => {
    
    const countCont = MOCK_CONTAINERS.filter(item => item.assetType === asset && item.zaklad === zaklad).length;
    for(let i = countCont; i < 10; i++) {
      MOCK_CONTAINERS.push({
         id: `c-gen-${asset}-${zaklad.replace(/\s+/g, '')}-${i}`,
         assetType: asset,
         number: `GEN-${asset.substring(0,3).toUpperCase()}-${i}`,
         name: `${asset === 'HSW' ? 'HSW Podstawa rolkowa' : asset} - Wygenerowany ${i}`,
         verificationPeriod: 180,
         project: 'Linia Standardowa',
         type: (asset === 'Kontenery' || asset === 'HSW') ? 'Manualny' : (asset === 'Regały' ? 'Wspornikowy' : 'Inny'),
         orderNumber: `PO-GEN-${i}`,
         prototypes: 0,
         currentNumbers: 5,
         total: 5,
         zaklad: zaklad
      });
    }

    const countCurr = MOCK_CURRENT_NUMBERS.filter(item => item.assetType === asset && item.zaklad === zaklad).length;
    for(let i = countCurr; i < 10; i++) {
      MOCK_CURRENT_NUMBERS.push({
         id: `curr-gen-${asset}-${zaklad.replace(/\s+/g, '')}-${i}`,
         assetType: asset,
         containerNumber: `GEN-${asset.substring(0,3).toUpperCase()}-${i}`,
         currentNumber: `00${i}`,
         containerName: `${asset === 'HSW' ? 'HSW Podstawa rolkowa' : asset} - Wygenerowany ${i}`,
         status: i % 2 === 0 ? 'W użyciu' : 'Nowy',
         type: (asset === 'Kontenery' || asset === 'HSW') ? 'Manualny' : (asset === 'Regały' ? 'Wspornikowy' : 'Inny'),
         version: '1.0',
         qrCode: `QR-GEN-${i}`,
         nextVerification: '01.01.2025',
         owner: 'Logistyka',
         producer: 'VW',
         location: 'Magazyn Systemowy',
         zaklad: zaklad
      });
    }

    const countLoc = MOCK_LOCATIONS.filter(item => item.assetType === asset && item.zaklad === zaklad).length;
    for(let i = countLoc; i < 10; i++) {
      MOCK_LOCATIONS.push({
         id: `loc-gen-${asset}-${zaklad.replace(/\s+/g, '')}-${i}`,
         assetType: asset,
         name: `Strefa zautomatyzowana ${i} (${asset})`,
         containerCount: 5,
         zaklad: zaklad
      });
    }

    const countSrv = MOCK_SERVICES.filter(item => item.assetType === asset && item.zaklad === zaklad).length;
    for(let i = countSrv; i < 10; i++) {
      MOCK_SERVICES.push({
         id: `srv-gen-${asset}-${zaklad.replace(/\s+/g, '')}-${i}`,
         assetType: asset,
         containerNumber: `GEN-${asset.substring(0,3).toUpperCase()}-${i}`,
         currentNumber: `00${i}`,
         containerName: `${asset === 'HSW' ? 'HSW Podstawa rolkowa' : asset} - Wygenerowany ${i}`,
         status: 'Do przeglądu',
         ticketStatus: 'Otwarty',
         reportedDate: '01.10.2024, 08:00',
         reportedBy: 'System',
         executionDate: '-',
         owner: 'VW',
         executor: '-',
         location: 'Strefa Serwisu',
         zaklad: zaklad
      });
    }

    const countChk = MOCK_CHECKLISTS.filter(item => item.assetType === asset && item.zaklad === zaklad).length;
    for(let i = countChk; i < 10; i++) {
      MOCK_CHECKLISTS.push({
         id: `chk-gen-${asset}-${zaklad.replace(/\s+/g, '')}-${i}`,
         assetType: asset,
         name: `Procedura BHP/UDT nr ${i} dla ${asset}`,
         createdDate: '10.10.2023 10:00',
         editDate: '10.10.2023 10:00',
         stepCount: 5 + i,
         version: '1.0',
         zaklad: zaklad
      });
    }

    const countEvt = MOCK_EVENTS.filter(item => item.assetType === asset && item.zaklad === zaklad).length;
    for(let i = countEvt; i < 10; i++) {
      MOCK_EVENTS.push({
         id: `evt-gen-${asset}-${zaklad.replace(/\s+/g, '')}-${i}`,
         assetType: asset,
         name: `Rutynowe naruszenie strefy - ${i} (${asset})`,
         zaklad: zaklad
      });
    }
  });
});