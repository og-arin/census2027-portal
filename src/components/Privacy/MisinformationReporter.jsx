import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getMisinformationFlags, reportMisinformationClaim } from '../../services/firestoreService';
import { ShieldAlert, Plus, ExternalLink, CheckCircle, Clock, X, Send, AlertTriangle } from 'lucide-react';

export default function MisinformationReporter() {
  const { t, language } = useLanguage();
  const [claims, setClaims] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claimText, setClaimText] = useState('');
  const [sourcePlatform, setSourcePlatform] = useState('WhatsApp Forward');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    const data = await getMisinformationFlags();
    setClaims(data || []);
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!claimText.trim()) return;

    setIsSubmitting(true);
    await reportMisinformationClaim({
      claimText,
      sourcePlatform
    });
    setIsSubmitting(false);
    setSuccessMsg(true);
    setClaimText('');
    await loadClaims();

    setTimeout(() => {
      setSuccessMsg(false);
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="w-full bg-[#0a1424] border border-slate-700 rounded-sm p-6 sm:p-8 shadow-xl font-sans space-y-6">
      {/* Header with action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
            STATUTORY FACT-CHECKING DIRECTORY
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
            {t('misinfoFeedHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
            {t('misinfoFeedSubheading')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-rose-700 hover:bg-rose-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition self-start sm:self-center"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>{t('reportClaimBtn')}</span>
        </button>
      </div>

      {/* Verified Claims Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {claims.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-[#070e18] border border-slate-800 rounded-sm flex flex-col justify-between space-y-3 font-sans"
          >
            <div>
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800/80 font-mono text-[10px]">
                <span className="badge-formal bg-rose-950/50 text-rose-400 border-rose-700">
                  {language === 'hi' && item.verdict_hi ? item.verdict_hi : item.verdict}
                </span>
                <span className="text-slate-400">
                  Source: {item.source_url}
                </span>
              </div>

              <h4 className="font-bold text-white text-xs sm:text-sm leading-snug">
                "{item.claim_text}"
              </h4>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {language === 'hi' && item.fact_explanation_hi ? item.fact_explanation_hi : item.fact_explanation}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="text-emerald-400">OFFICIALLY VERIFIED</span>
              <span>Ref: {item.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Citizen Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div className="w-full max-w-lg bg-[#0a1424] border border-slate-700 rounded-sm shadow-2xl p-6 relative">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                <span>REPORT SUSPICIOUS FORWARD</span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-sm"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {successMsg ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <p className="font-serif font-bold text-white text-base">Report Submitted</p>
                <p className="text-xs text-slate-300">Submitted to Census 2027 Fact-Check Directorate.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Claim or Message Text
                  </label>
                  <textarea
                    rows={4}
                    value={claimText}
                    onChange={(e) => setClaimText(e.target.value)}
                    required
                    placeholder="Paste the suspicious WhatsApp message or fake advisory..."
                    className="w-full bg-[#070e18] border border-slate-700 rounded-sm p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Source / Platform
                  </label>
                  <select
                    value={sourcePlatform}
                    onChange={(e) => setSourcePlatform(e.target.value)}
                    className="w-full bg-[#070e18] border border-slate-700 rounded-sm p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="WhatsApp Forward">WhatsApp Forward</option>
                    <option value="Facebook / Instagram">Facebook / Instagram</option>
                    <option value="SMS / Tele-calling">SMS / Tele-calling</option>
                    <option value="Printed Pamphlet">Printed Pamphlet</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end gap-2 font-mono">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-sm"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-sm uppercase tracking-wider flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT REPORT'}</span>
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
