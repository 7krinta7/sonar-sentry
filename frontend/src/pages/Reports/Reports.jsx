import { useState, useMemo } from 'react'
import Topbar from '../../components/Topbar/Topbar'
import styles from './Reports.module.css'

const MOCK_REPORTS = [
  {
    id: 'MSN-2041',
    name: 'Arabian Sea Shelf Survey',
    date: '14 Mar 2025',
    anomalies: 23,
    status: 'Flagged',
    confidence: 91,
    bars: [
      { h: 14, fill: 'var(--gesso-data-1)' },
      { h: 18, fill: 'var(--gesso-data-2)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
      { h: 20, fill: 'var(--gesso-data-1)' },
      { h: 10, fill: 'var(--gesso-data-4)' },
      { h: 16, fill: 'var(--gesso-data-2)' },
      { h: 8, fill: 'var(--gesso-data-5)' },
    ],
  },
  {
    id: 'MSN-2038',
    name: 'Bay of Bengal Trench Pass',
    date: '11 Mar 2025',
    anomalies: 6,
    status: 'Reviewed',
    confidence: 97,
    bars: [
      { h: 6, fill: 'var(--gesso-data-4)' },
      { h: 4, fill: 'var(--gesso-data-5)' },
      { h: 8, fill: 'var(--gesso-data-3)' },
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 7, fill: 'var(--gesso-data-4)' },
      { h: 4, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-2035',
    name: 'Lakshadweep Reef Corridor',
    date: '06 Mar 2025',
    anomalies: 41,
    status: 'Flagged',
    confidence: 88,
    bars: [
      { h: 18, fill: 'var(--gesso-data-1)' },
      { h: 20, fill: 'var(--gesso-data-1)' },
      { h: 16, fill: 'var(--gesso-data-2)' },
      { h: 19, fill: 'var(--gesso-data-1)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
      { h: 17, fill: 'var(--gesso-data-1)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-2033',
    name: 'Andaman Basin Deep Run',
    date: '02 Mar 2025',
    anomalies: 0,
    status: 'Processing',
    confidence: null,
    bars: [
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-2029',
    name: 'Gulf of Mannar Sweep',
    date: '24 Feb 2025',
    anomalies: 12,
    status: 'Reviewed',
    confidence: 94,
    bars: [
      { h: 10, fill: 'var(--gesso-data-3)' },
      { h: 8, fill: 'var(--gesso-data-4)' },
      { h: 12, fill: 'var(--gesso-data-2)' },
      { h: 9, fill: 'var(--gesso-data-3)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
      { h: 7, fill: 'var(--gesso-data-4)' },
      { h: 10, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-2026',
    name: 'Cochin Shelf Baseline',
    date: '18 Feb 2025',
    anomalies: 3,
    status: 'Reviewed',
    confidence: 99,
    bars: [
      { h: 4, fill: 'var(--gesso-data-6)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 4, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-2022',
    name: 'Konkan Coast Sector Scan',
    date: '09 Feb 2025',
    anomalies: 29,
    status: 'Pending',
    confidence: 76,
    bars: [
      { h: 15, fill: 'var(--gesso-data-2)' },
      { h: 17, fill: 'var(--gesso-data-1)' },
      { h: 13, fill: 'var(--gesso-data-2)' },
      { h: 16, fill: 'var(--gesso-data-1)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-2018',
    name: 'Sundarbans Delta Approach',
    date: '28 Jan 2025',
    anomalies: 8,
    status: 'Reviewed',
    confidence: 95,
    bars: [
      { h: 7, fill: 'var(--gesso-data-4)' },
      { h: 6, fill: 'var(--gesso-data-4)' },
      { h: 9, fill: 'var(--gesso-data-3)' },
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 7, fill: 'var(--gesso-data-4)' },
      { h: 4, fill: 'var(--gesso-data-5)' },
      { h: 6, fill: 'var(--gesso-data-4)' },
    ],
  },
  {
    id: 'MSN-2015',
    name: 'Malabar Shelf Gradient',
    date: '20 Jan 2025',
    anomalies: 15,
    status: 'Flagged',
    confidence: 82,
    bars: [
      { h: 12, fill: 'var(--gesso-data-1)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
      { h: 10, fill: 'var(--gesso-data-3)' },
      { h: 16, fill: 'var(--gesso-data-1)' },
      { h: 9, fill: 'var(--gesso-data-4)' },
      { h: 13, fill: 'var(--gesso-data-2)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-2012',
    name: 'Chilika Lagoon Mapping',
    date: '14 Jan 2025',
    anomalies: 5,
    status: 'Reviewed',
    confidence: 96,
    bars: [
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 4, fill: 'var(--gesso-data-6)' },
      { h: 6, fill: 'var(--gesso-data-4)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 4, fill: 'var(--gesso-data-6)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-2009',
    name: 'Palk Bay Traverse',
    date: '08 Jan 2025',
    anomalies: 19,
    status: 'Pending',
    confidence: 71,
    bars: [
      { h: 13, fill: 'var(--gesso-data-2)' },
      { h: 15, fill: 'var(--gesso-data-1)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
      { h: 10, fill: 'var(--gesso-data-4)' },
      { h: 16, fill: 'var(--gesso-data-1)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-2006',
    name: 'Kutch Basin Sweep',
    date: '02 Jan 2025',
    anomalies: 37,
    status: 'Flagged',
    confidence: 85,
    bars: [
      { h: 17, fill: 'var(--gesso-data-1)' },
      { h: 19, fill: 'var(--gesso-data-1)' },
      { h: 15, fill: 'var(--gesso-data-2)' },
      { h: 20, fill: 'var(--gesso-data-1)' },
      { h: 13, fill: 'var(--gesso-data-3)' },
      { h: 18, fill: 'var(--gesso-data-1)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
    ],
  },
  {
    id: 'MSN-2003',
    name: 'Krishna Godavari Basin',
    date: '27 Dec 2024',
    anomalies: 2,
    status: 'Reviewed',
    confidence: 98,
    bars: [
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-2000',
    name: 'Mahanadi Shelf Survey',
    date: '20 Dec 2024',
    anomalies: 11,
    status: 'Processing',
    confidence: null,
    bars: [
      { h: 8, fill: 'var(--gesso-data-3)' },
      { h: 10, fill: 'var(--gesso-data-4)' },
      { h: 7, fill: 'var(--gesso-data-5)' },
      { h: 9, fill: 'var(--gesso-data-3)' },
      { h: 6, fill: 'var(--gesso-data-5)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
      { h: 8, fill: 'var(--gesso-data-4)' },
    ],
  },
  {
    id: 'MSN-1997',
    name: 'Laccadive Sea Corridor',
    date: '14 Dec 2024',
    anomalies: 27,
    status: 'Flagged',
    confidence: 79,
    bars: [
      { h: 14, fill: 'var(--gesso-data-1)' },
      { h: 16, fill: 'var(--gesso-data-2)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
      { h: 18, fill: 'var(--gesso-data-1)' },
      { h: 10, fill: 'var(--gesso-data-4)' },
      { h: 15, fill: 'var(--gesso-data-2)' },
      { h: 13, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-1994',
    name: 'Cauvery Basin Sweep',
    date: '08 Dec 2024',
    anomalies: 0,
    status: 'Reviewed',
    confidence: 100,
    bars: [
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-1991',
    name: 'Tuticorin Shelf Mapping',
    date: '01 Dec 2024',
    anomalies: 14,
    status: 'Pending',
    confidence: 84,
    bars: [
      { h: 11, fill: 'var(--gesso-data-2)' },
      { h: 13, fill: 'var(--gesso-data-1)' },
      { h: 9, fill: 'var(--gesso-data-4)' },
      { h: 12, fill: 'var(--gesso-data-2)' },
      { h: 8, fill: 'var(--gesso-data-5)' },
      { h: 14, fill: 'var(--gesso-data-1)' },
      { h: 10, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-1988',
    name: 'Cambay Basin Depth Run',
    date: '24 Nov 2024',
    anomalies: 9,
    status: 'Reviewed',
    confidence: 93,
    bars: [
      { h: 7, fill: 'var(--gesso-data-4)' },
      { h: 8, fill: 'var(--gesso-data-3)' },
      { h: 6, fill: 'var(--gesso-data-5)' },
      { h: 9, fill: 'var(--gesso-data-4)' },
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 8, fill: 'var(--gesso-data-3)' },
      { h: 7, fill: 'var(--gesso-data-4)' },
    ],
  },
  {
    id: 'MSN-1985',
    name: 'Kerala Coast Sector Scan',
    date: '18 Nov 2024',
    anomalies: 32,
    status: 'Flagged',
    confidence: 77,
    bars: [
      { h: 16, fill: 'var(--gesso-data-1)' },
      { h: 18, fill: 'var(--gesso-data-1)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
      { h: 19, fill: 'var(--gesso-data-1)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
      { h: 17, fill: 'var(--gesso-data-1)' },
      { h: 15, fill: 'var(--gesso-data-2)' },
    ],
  },
  {
    id: 'MSN-1982',
    name: 'Goa Shelf Baseline',
    date: '11 Nov 2024',
    anomalies: 4,
    status: 'Reviewed',
    confidence: 97,
    bars: [
      { h: 4, fill: 'var(--gesso-data-6)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 4, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-1979',
    name: 'Arabian Sea Deep Survey',
    date: '05 Nov 2024',
    anomalies: 18,
    status: 'Pending',
    confidence: 73,
    bars: [
      { h: 12, fill: 'var(--gesso-data-2)' },
      { h: 14, fill: 'var(--gesso-data-1)' },
      { h: 10, fill: 'var(--gesso-data-4)' },
      { h: 15, fill: 'var(--gesso-data-2)' },
      { h: 9, fill: 'var(--gesso-data-5)' },
      { h: 13, fill: 'var(--gesso-data-1)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-1976',
    name: 'Bay of Bengal Mapping',
    date: '28 Oct 2024',
    anomalies: 7,
    status: 'Reviewed',
    confidence: 96,
    bars: [
      { h: 6, fill: 'var(--gesso-data-4)' },
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 7, fill: 'var(--gesso-data-3)' },
      { h: 4, fill: 'var(--gesso-data-5)' },
      { h: 6, fill: 'var(--gesso-data-4)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 5, fill: 'var(--gesso-data-5)' },
    ],
  },
  {
    id: 'MSN-1973',
    name: 'Nicobar Islands Survey',
    date: '22 Oct 2024',
    anomalies: 0,
    status: 'Reviewed',
    confidence: 100,
    bars: [
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-1970',
    name: 'Andaman Coast Traverse',
    date: '15 Oct 2024',
    anomalies: 21,
    status: 'Flagged',
    confidence: 86,
    bars: [
      { h: 13, fill: 'var(--gesso-data-1)' },
      { h: 15, fill: 'var(--gesso-data-2)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
      { h: 17, fill: 'var(--gesso-data-1)' },
      { h: 10, fill: 'var(--gesso-data-4)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-1967',
    name: 'Sri Lanka Shelf Survey',
    date: '08 Oct 2024',
    anomalies: 3,
    status: 'Reviewed',
    confidence: 98,
    bars: [
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 4, fill: 'var(--gesso-data-5)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-1964',
    name: 'Maldives Atolls Mapping',
    date: '01 Oct 2024',
    anomalies: 10,
    status: 'Pending',
    confidence: 81,
    bars: [
      { h: 8, fill: 'var(--gesso-data-3)' },
      { h: 9, fill: 'var(--gesso-data-2)' },
      { h: 7, fill: 'var(--gesso-data-4)' },
      { h: 10, fill: 'var(--gesso-data-3)' },
      { h: 6, fill: 'var(--gesso-data-5)' },
      { h: 9, fill: 'var(--gesso-data-2)' },
      { h: 8, fill: 'var(--gesso-data-4)' },
    ],
  },
  {
    id: 'MSN-1961',
    name: 'Somali Coast Survey',
    date: '24 Sep 2024',
    anomalies: 25,
    status: 'Flagged',
    confidence: 80,
    bars: [
      { h: 14, fill: 'var(--gesso-data-1)' },
      { h: 16, fill: 'var(--gesso-data-1)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
      { h: 18, fill: 'var(--gesso-data-1)' },
      { h: 10, fill: 'var(--gesso-data-4)' },
      { h: 15, fill: 'var(--gesso-data-2)' },
      { h: 13, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-1958',
    name: 'Gulf of Aden Mapping',
    date: '17 Sep 2024',
    anomalies: 0,
    status: 'Reviewed',
    confidence: 100,
    bars: [
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-1955',
    name: 'Red Sea Approach Survey',
    date: '10 Sep 2024',
    anomalies: 16,
    status: 'Processing',
    confidence: null,
    bars: [
      { h: 11, fill: 'var(--gesso-data-2)' },
      { h: 13, fill: 'var(--gesso-data-1)' },
      { h: 9, fill: 'var(--gesso-data-4)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
      { h: 8, fill: 'var(--gesso-data-5)' },
      { h: 12, fill: 'var(--gesso-data-1)' },
      { h: 10, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-1952',
    name: 'Persian Gulf Traverse',
    date: '03 Sep 2024',
    anomalies: 34,
    status: 'Flagged',
    confidence: 78,
    bars: [
      { h: 16, fill: 'var(--gesso-data-1)' },
      { h: 18, fill: 'var(--gesso-data-1)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
      { h: 20, fill: 'var(--gesso-data-1)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
      { h: 17, fill: 'var(--gesso-data-1)' },
      { h: 15, fill: 'var(--gesso-data-2)' },
    ],
  },
  {
    id: 'MSN-1949',
    name: 'Oman Coast Mapping',
    date: '27 Aug 2024',
    anomalies: 1,
    status: 'Reviewed',
    confidence: 99,
    bars: [
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-1946',
    name: 'Yemen Shelf Survey',
    date: '20 Aug 2024',
    anomalies: 13,
    status: 'Pending',
    confidence: 83,
    bars: [
      { h: 10, fill: 'var(--gesso-data-2)' },
      { h: 12, fill: 'var(--gesso-data-1)' },
      { h: 8, fill: 'var(--gesso-data-4)' },
      { h: 11, fill: 'var(--gesso-data-2)' },
      { h: 7, fill: 'var(--gesso-data-5)' },
      { h: 13, fill: 'var(--gesso-data-1)' },
      { h: 9, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-1943',
    name: 'Zanzibar Coast Mapping',
    date: '13 Aug 2024',
    anomalies: 22,
    status: 'Flagged',
    confidence: 87,
    bars: [
      { h: 13, fill: 'var(--gesso-data-1)' },
      { h: 15, fill: 'var(--gesso-data-2)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
      { h: 16, fill: 'var(--gesso-data-1)' },
      { h: 10, fill: 'var(--gesso-data-4)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-1940',
    name: 'Madagascar Shelf Survey',
    date: '06 Aug 2024',
    anomalies: 0,
    status: 'Reviewed',
    confidence: 100,
    bars: [
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-1937',
    name: 'Mozambique Channel Run',
    date: '30 Jul 2024',
    anomalies: 8,
    status: 'Processing',
    confidence: null,
    bars: [
      { h: 7, fill: 'var(--gesso-data-4)' },
      { h: 8, fill: 'var(--gesso-data-3)' },
      { h: 6, fill: 'var(--gesso-data-5)' },
      { h: 9, fill: 'var(--gesso-data-4)' },
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 7, fill: 'var(--gesso-data-3)' },
      { h: 8, fill: 'var(--gesso-data-4)' },
    ],
  },
  {
    id: 'MSN-1934',
    name: 'Mauritius Coast Survey',
    date: '23 Jul 2024',
    anomalies: 17,
    status: 'Pending',
    confidence: 74,
    bars: [
      { h: 12, fill: 'var(--gesso-data-2)' },
      { h: 14, fill: 'var(--gesso-data-1)' },
      { h: 10, fill: 'var(--gesso-data-4)' },
      { h: 15, fill: 'var(--gesso-data-2)' },
      { h: 9, fill: 'var(--gesso-data-5)' },
      { h: 13, fill: 'var(--gesso-data-1)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
    ],
  },
  {
    id: 'MSN-1931',
    name: 'Seychelles Basin Mapping',
    date: '16 Jul 2024',
    anomalies: 30,
    status: 'Flagged',
    confidence: 75,
    bars: [
      { h: 15, fill: 'var(--gesso-data-1)' },
      { h: 17, fill: 'var(--gesso-data-1)' },
      { h: 13, fill: 'var(--gesso-data-2)' },
      { h: 19, fill: 'var(--gesso-data-1)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
      { h: 16, fill: 'var(--gesso-data-1)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
    ],
  },
  {
    id: 'MSN-1928',
    name: 'Chagos Archipelago Run',
    date: '09 Jul 2024',
    anomalies: 5,
    status: 'Reviewed',
    confidence: 96,
    bars: [
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 4, fill: 'var(--gesso-data-6)' },
      { h: 6, fill: 'var(--gesso-data-4)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
      { h: 5, fill: 'var(--gesso-data-5)' },
      { h: 4, fill: 'var(--gesso-data-6)' },
      { h: 3, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-1925',
    name: 'Diego Garcia Deep Survey',
    date: '02 Jul 2024',
    anomalies: 0,
    status: 'Reviewed',
    confidence: 100,
    bars: [
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
      { h: 2, fill: 'var(--gesso-data-6)' },
    ],
  },
  {
    id: 'MSN-1922',
    name: 'Andaman Sea Final Pass',
    date: '25 Jun 2024',
    anomalies: 20,
    status: 'Flagged',
    confidence: 89,
    bars: [
      { h: 13, fill: 'var(--gesso-data-1)' },
      { h: 15, fill: 'var(--gesso-data-2)' },
      { h: 11, fill: 'var(--gesso-data-3)' },
      { h: 17, fill: 'var(--gesso-data-1)' },
      { h: 10, fill: 'var(--gesso-data-4)' },
      { h: 14, fill: 'var(--gesso-data-2)' },
      { h: 12, fill: 'var(--gesso-data-3)' },
    ],
  },
]

const STATUS_TABS = ['All', 'Reviewed', 'Pending', 'Flagged']
const ROWS_PER_PAGE = 8

const STATUS_CLASS = {
  Reviewed: 'statusReviewed',
  Pending: 'statusPending',
  Flagged: 'statusFlagged',
  Processing: 'statusProcessing',
}

function WavesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g><path d="m21 21l-4.34-4.34" /><circle cx="11" cy="11" r="8" /></g>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <g><path d="M8 2v4m8-4v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></g>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <g><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></g>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9l6 6l6-6" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18l-6-6l6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18l6-6l-6-6" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g><path d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></g>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g><path d="M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10l5 5l5-5" /></g>
    </svg>
  )
}

function MoreVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></g>
    </svg>
  )
}

function ExportSelectedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g><path d="M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10l5 5l5-5" /></g>
    </svg>
  )
}

function CapsuleBars({ bars }) {
  const totalHeight = 20
  const barWidth = 4
  const gap = 2
  return (
    <svg className={styles.capsuleBars} width="40" height={totalHeight} viewBox={`0 0 40 ${totalHeight}`} aria-hidden="true">
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={i * (barWidth + gap)}
          y={totalHeight - bar.h}
          width={barWidth}
          height={bar.h}
          rx={2}
          fill={bar.fill}
        />
      ))}
    </svg>
  )
}

export default function Reports() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    let result = MOCK_REPORTS
    if (statusFilter !== 'All') {
      result = result.filter((r) => r.status === statusFilter)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
      )
    }
    return result
  }, [search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const startIdx = (safePage - 1) * ROWS_PER_PAGE
  const pageRows = filtered.slice(startIdx, startIdx + ROWS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const handleStatusChange = (tab) => {
    setStatusFilter(tab)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const from = startIdx + 1
  const to = Math.min(startIdx + ROWS_PER_PAGE, filtered.length)

  return (
    <>
      <Topbar activePage="reports" />
      <div className={styles.wrap}>
        <div className={styles.headerBand}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.pageTitle}>Reports</h1>
              <p className={styles.pageSub}>Generated mission reports across all detection runs</p>
            </div>
            <button className={styles.btnPrimary}>
              <ExportSelectedIcon />
              Export selected
            </button>
          </div>

          <div className={styles.statusRow}>
            <div className={styles.statusItem}>
              <span className={styles.statusVal}>284</span>
              <span className={styles.statusLbl}>Total reports</span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusVal}>17</span>
              <span className={styles.statusLbl}>Flagged for review</span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusVal}>6</span>
              <span className={styles.statusLbl}>Pending analysis</span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusVal}>38</span>
              <span className={styles.statusLbl}>Generated this month</span>
            </div>
          </div>

          <div className={styles.toolbar}>
            <div className={styles.searchField}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search mission name or scan ID…"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <div className={styles.seg} role="tablist" aria-label="Status filter">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={statusFilter === tab}
                  className={styles.segBtn}
                  onClick={() => handleStatusChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className={styles.selectChip}>
              <CalendarIcon />
              Last 90 days
              <ChevronDownIcon />
            </div>
            <div className={styles.selectChip}>
              <MapPinIcon />
              All regions
              <ChevronDownIcon />
            </div>
            <div className={styles.toolbarSpacer} />
            <span className={styles.resultCount}>{filtered.length} reports</span>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th className={styles.sortable}>
                  <span className={styles.thInner}>Mission <ChevronDownIcon /></span>
                </th>
                <th className={styles.sortable}>
                  <span className={styles.thInner}>Scan date <ChevronDownIcon /></span>
                </th>
                <th className={styles.sortable}>
                  <span className={styles.thInner}>Anomalies <ChevronDownIcon /></span>
                </th>
                <th>Status</th>
                <th className={styles.sortable}>
                  <span className={styles.thInner}>Confidence <ChevronDownIcon /></span>
                </th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className={styles.missionCell}>
                      <div className={styles.missionIcon}><WavesIcon /></div>
                      <div className={styles.missionTxt}>
                        <span className={styles.missionName}>{row.name}</span>
                        <span className={styles.missionCode}>{row.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className={styles.cellDate}>{row.date}</td>
                  <td>
                    <div className={styles.anomalyCell}>
                      <span className={styles.anomalyCount}>{row.anomalies}</span>
                      <CapsuleBars bars={row.bars} />
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[STATUS_CLASS[row.status]]}`}>
                      <span className={styles.dot} />
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.confidenceCell}>
                      <div className={styles.confidenceTrack}>
                        <div className={styles.confidenceFill} style={{ width: row.confidence !== null ? `${row.confidence}%` : '0%' }} />
                      </div>
                      <span className={styles.confidenceVal}>{row.confidence !== null ? `${row.confidence}%` : '—'}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <button className={styles.actionBtn} aria-label="Open report" disabled={row.status === 'Processing'}>
                        <EyeIcon />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.actionBtnExport}`} aria-label="Export report" disabled={row.status === 'Processing'}>
                        <DownloadIcon />
                      </button>
                      <button className={styles.actionBtn} aria-label="More options">
                        <MoreVerticalIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <span className={styles.paginationCount}>
            Showing {filtered.length > 0 ? from : 0}–{to} of {filtered.length} reports
          </span>
          <div className={styles.pagerControls}>
            <button
              className={styles.pagerBtn}
              aria-label="Previous page"
              disabled={safePage <= 1}
              onClick={() => handlePageChange(safePage - 1)}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className={styles.pagerBtn}
              aria-label="Next page"
              disabled={safePage >= totalPages}
              onClick={() => handlePageChange(safePage + 1)}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
