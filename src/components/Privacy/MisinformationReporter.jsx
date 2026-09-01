import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getMisinformationFlags, reportMisinformationClaim } from '../../services/firestoreService';
import { 
  Radio, 
  Send, 
  X, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle, 
  ShieldAlert, 
  MessageSquarePlus,
  Search
} from 'lucide-react';

export default function MisinformationReporter() {
  const { t, language } = useLanguage();
  const [flags, setFlags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claimText, setClaimText] = useState('');
  const [sourcePlatform, setSourcePlatform] = useState('WhatsApp Forward');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadFlags();
  }, []);

  const loadFlags = async () => {
    const data = await getMisinformationFlags();
    setFlags(data || []);
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!claimText.trim()) return;

    setIsSubmitting(true);
    await reportMisinformationClaim({
      claimText,
      sourcePlatform
    });
    setIsSubmitting(false);
    setClaimText('');
    setSuccessMsg(t('reportSuccess'));
    await loadFlags();

    setTimeout(() => {
      setSuccessMsg('');
      setIsModalOpen(false);
    }, 2000);
  };

  const filteredFlags = flags.filter(f => 
    f.claim_text?.toLowerCase().includes(search.toLowerCase()) ||
    (f.claim_text_hi && f.claim_text_hi.includes(search))
  );

  return (
    <div className="w-full space-y-6">
      {/* Header & Report Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-400 animate-pulse" />
            <span>{t('misinfoTitle')}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {t('misinfoSubheading')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search claims..."
              className="bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition shadow-sm whitespace-nowrap"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{t('misinfoReportBtn')}</span>
          </button>
        </div>
      </div>

      {/* Flagged Claims Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFlags.map((flag) => {
          const claim = language === 'hi' && flag.claim_text_hi ? flag.claim_text_hi : flag.claim_text;
          const fact = language === 'hi' && flag.fact_explanation_hi ? flag.fact_explanation_hi : flag.fact_explanation;
          const verdict = language === 'hi' && flag.verdict_hi ? flag.verdict_hi : flag.verdict;

          return (
            <div
              key={flag.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    flag.is_false 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {verdict}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {flag.category || 'Fact-Check'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                    {t('misinfoClaim')}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                    "{claim}"
                  </p>
                </div>

                {fact && (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                    {fact}
                  </div>
                )}
              </div>

              {/* Source link */}
              {flag.source_url && (
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{t('misinfoSource')}:</span>
                  <a
                    href={flag.source_url.startsWith('http') ? flag.source_url : '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[10px]"
                  >
                    <span>{flag.source_url.replace('https://', '').slice(0, 30)}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Report Misinformation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg bg-slate-800/50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {t('reportModalTitle')}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('reportModalDesc')}
                </p>
              </div>
            </div>

            {successMsg ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('reportClaimLabel')}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={claimText}
                    onChange={(e) => setClaimText(e.target.value)}
                    placeholder="Paste the suspicious WhatsApp forward or claim here..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('reportSourceLabel')}
                  </label>
                  <select
                    value={sourcePlatform}
                    onChange={(e) => setSourcePlatform(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 focus:outline-none focus:border-rose-500 transition"
                  >
                    <option value="WhatsApp Forward">WhatsApp Group / Chat</option>
                    <option value="Facebook Post">Facebook / Meta</option>
                    <option value="X (Twitter) Post">X (Twitter)</option>
                    <option value="YouTube Video">YouTube Video</option>
                    <option value="SMS / Text">SMS / Unverified Text</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !claimText.trim()}
                  className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : t('reportSubmit')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
