import React, { useState, Suspense, lazy } from 'react';
import { useLanguage } from '../context/LanguageContext';
import MetricCards from '../components/Dashboard/MetricCards';
import ChartSkeleton from '../components/Dashboard/ChartSkeleton';
import { BarChart3, Download, Printer } from 'lucide-react';

const PopulationChart = lazy(() => import('../components/Dashboard/PopulationChart'));
const AgePyramidChart = lazy(() => import('../components/Dashboard/AgePyramidChart'));
const LiteracyChart = lazy(() => import('../components/Dashboard/LiteracyChart'));
const AmenitiesChart = lazy(() => import('../components/Dashboard/AmenitiesChart'));

export default function DashboardPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gov-saffron-500 uppercase tracking-wider">{language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{t('dashboardTitle')}</h1>
            <p className="text-sm text-gray-500 mt-1 font-body">{t('dashboardSubtitle')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition" onClick={() => window.print()}>
              <Printer className="w-4 h-4" /><span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Metrics */}
        <MetricCards />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<ChartSkeleton title="Population Data" />}>
            <PopulationChart />
          </Suspense>
          <Suspense fallback={<ChartSkeleton title="Age Pyramid" />}>
            <AgePyramidChart />
          </Suspense>
          <Suspense fallback={<ChartSkeleton title="Literacy Data" />}>
            <LiteracyChart />
          </Suspense>
          <Suspense fallback={<ChartSkeleton title="Amenities Data" />}>
            <AmenitiesChart />
          </Suspense>
        </div>

        {/* Note */}
        <div className="text-center text-xs text-gray-400 font-body py-4 border-t border-gray-200">
          {language === 'hi' ? 'उपरोक्त आंकड़े सांकेतिक हैं। वास्तविक जनगणना डेटा 2028 में प्रकाशित होगा।' : 'Above figures are indicative. Actual census data will be published in 2028.'}
        </div>
      </div>
    </div>
  );
}
