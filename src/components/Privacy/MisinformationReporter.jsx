import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getMisinformationFlags, reportMisinformationClaim } from '../../services/firestoreService';
import { AlertTriangle, Plus, CheckCircle, X, Send } from 'lucide-react';

export default function MisinformationReporter() {
  const { t, language } = useLanguage();
  const [claims, setClaims] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claimText, setClaimText] = useState('');
  const [sourcePlatform, setSourcePlatform] = useState('WhatsApp Forward');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => { loadClaims(); }, []);
  const loadClaims = async () => { const data = await getMisinformationFlags(); setClaims(data || []); };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!claimText.trim()) return;
    setIsSubmitting(true);
    await reportMisinformationClaim({ claimText, sourcePlatform });
    setIsSubmitting(false);
    setSuccessMsg(true);
    setClaimText('');
    await loadClaims();
    setTimeout(() => { setSuccessMsg(false); setIsModalOpen(false); }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t('misinfoFeedHeading')}</h2>
          <p className="text-sm text-gray-500 mt-1 font-body">{t('misinfoFeedSubheading')}</p>
        </div>
        <button type="button" onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition self-start">
          <Plus className="w-4 h-4" /><span>{t('reportClaimBtn')}</span>
        </button>
      </div>

      {/* Claims Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {claims.map((item) => (
          <div key={item.id} className="gov-card gov-card-hover rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100 text-[11px]">
              <span className="badge-gov bg-red-50 text-red-600 border border-red-200">
                {language === 'hi' && item.verdict_hi ? item.verdict_hi : item.verdict}
              </span>
              <span className="text-gray-400 text-xs">{item.source_url}</span>
            </div>
            <h4 className="font-semibold text-gray-800 text-sm font-body">"{item.claim_text}"</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-body">
              {language === 'hi' && item.fact_explanation_hi ? item.fact_explanation_hi : item.fact_explanation}
            </p>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-medium">
              <span className="text-green-500">✓ Verified</span>
              <span>Ref: {item.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 text-red-500 text-sm font-bold">
                <AlertTriangle className="w-4 h-4" /><span>{language === 'hi' ? 'संदिग्ध संदेश रिपोर्ट करें' : 'Report Suspicious Message'}</span>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>
            {successMsg ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                <p className="font-bold text-gray-900">Report Submitted</p>
                <p className="text-xs text-gray-500">Sent to Census 2027 Fact-Check Directorate.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Claim or Message Text</label>
                  <textarea rows={4} value={claimText} onChange={(e) => setClaimText(e.target.value)} required
                    placeholder="Paste the suspicious WhatsApp message or fake advisory..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gov-blue-500 focus:border-gov-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Source / Platform</label>
                  <select value={sourcePlatform} onChange={(e) => setSourcePlatform(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gov-blue-500">
                    <option value="WhatsApp Forward">WhatsApp Forward</option>
                    <option value="Facebook / Instagram">Facebook / Instagram</option>
                    <option value="SMS / Tele-calling">SMS / Tele-calling</option>
                    <option value="Printed Pamphlet">Printed Pamphlet</option>
                  </select>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-200 transition">Cancel</button>
                  <button type="submit" disabled={isSubmitting}
                    className="px-5 py-2 bg-gov-blue-700 hover:bg-gov-blue-800 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition">
                    <Send className="w-3.5 h-3.5" /><span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
