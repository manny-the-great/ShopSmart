'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency, generateId } from '@/lib/utils';
import { Staff } from '@/types';
import {
  ArrowLeft,
  Plus,
  X,
  User,
  Shield,
  ShoppingCart,
  Trash2,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Crown,
  CheckCircle2,
} from 'lucide-react';

const PIN_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const EMPTY_FORM = {
  name: '',
  pin: '',
  role: 'attendant' as 'attendant' | 'vendor',
};

export default function StaffPage() {
  const router = useRouter();
  const { staff, addStaff, updateStaff, removeStaff, currentUser } = useAuthStore();
  const { transactions } = useTransactionStore();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState('');
  const [successId, setSuccessId] = useState<string | null>(null);

  const attendants = staff.filter((s) => s.role === 'attendant');
  const vendors = staff.filter((s) => s.role === 'vendor');

  const getStaffStats = (staffId: string) => {
    const txns = transactions.filter((t) => t.cashierId === staffId);
    return {
      sales: txns.length,
      revenue: txns.reduce((a, b) => a + b.amount, 0),
    };
  };

  const handleSave = () => {
    if (!form.name.trim()) { setPinError('Name is required'); return; }
    if (form.pin.length !== 4) { setPinError('PIN must be exactly 4 digits'); return; }

    // Check if PIN is already taken
    const pinTaken = staff.some((s) => s.pin === form.pin);
    if (pinTaken) { setPinError('This PIN is already used by another account'); return; }

    const newStaff: Staff = {
      id: generateId(),
      name: form.name.trim(),
      pin: form.pin,
      role: form.role,
      salesCount: 0,
      totalRevenue: 0,
      createdAt: new Date().toISOString(),
      active: true,
    };

    addStaff(newStaff);
    setSuccessId(newStaff.id);
    setTimeout(() => setSuccessId(null), 2500);
    setShowModal(false);
    setForm(EMPTY_FORM);
    setPinError('');
  };

  const openModal = () => {
    setForm(EMPTY_FORM);
    setPinError('');
    setShowPin(false);
    setShowModal(true);
  };

  const handlePinDigit = (digit: string) => {
    if (form.pin.length < 4) {
      setForm((f) => ({ ...f, pin: f.pin + digit }));
      setPinError('');
    }
  };

  const handlePinDelete = () => {
    setForm((f) => ({ ...f, pin: f.pin.slice(0, -1) }));
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-5 border-b border-[#e8e8e4]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-[#F8F8F5] border border-[#e8e8e4]"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="text-xs text-gray-400 font-medium">Vendor Only</p>
            <h1 className="text-xl font-black text-[#111827]">Staff Management</h1>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-[#22C55E]/10 rounded-2xl p-3 text-center">
            <Crown size={18} className="text-[#22C55E] mx-auto mb-1" />
            <p className="text-2xl font-black text-[#22C55E]">{vendors.length}</p>
            <p className="text-xs font-semibold text-green-700">Vendor{vendors.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-3 text-center">
            <User size={18} className="text-blue-600 mx-auto mb-1" />
            <p className="text-2xl font-black text-blue-700">{attendants.length}</p>
            <p className="text-xs font-semibold text-blue-600">Attendant{attendants.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 space-y-6">
        {/* Vendor accounts */}
        {vendors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Crown size={14} className="text-[#22C55E]" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Vendor Accounts
              </p>
            </div>
            <div className="space-y-3">
              {vendors.map((member) => {
                const stats = getStaffStats(member.id);
                const isSelf = currentUser?.id === member.id;
                return (
                  <motion.div
                    key={member.id}
                    layout
                    className="bg-white rounded-2xl border border-[#e8e8e4] p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center relative">
                        <span className="text-xl font-black text-[#22C55E]">
                          {member.name.charAt(0)}
                        </span>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#22C55E] rounded-full flex items-center justify-center">
                          <Crown size={10} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#111827]">{member.name}</p>
                          {isSelf && (
                            <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 capitalize">Vendor · Full access</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-[#111827]">{stats.sales} sales</p>
                        <p className="text-xs text-[#22C55E] font-bold">{formatCurrency(stats.revenue)}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Attendant accounts */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <User size={14} className="text-blue-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Attendant Accounts
              </p>
            </div>
            <button
              onClick={openModal}
              className="flex items-center gap-1.5 text-xs font-bold text-[#22C55E]"
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          {attendants.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-[#e8e8e4] p-8 text-center">
              <User size={32} className="mx-auto text-gray-200 mb-3" />
              <p className="text-gray-400 font-medium text-sm">No attendants yet</p>
              <p className="text-gray-300 text-xs mt-1">Add sub-accounts for your staff</p>
              <button
                onClick={openModal}
                className="mt-4 px-5 py-2.5 bg-[#22C55E] text-white text-sm font-bold rounded-xl"
              >
                Add Attendant
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {attendants.map((member) => {
                const stats = getStaffStats(member.id);
                return (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: successId === member.id ? 0 : 1 }}
                    animate={{ opacity: 1 }}
                    className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all ${
                      successId === member.id
                        ? 'border-[#22C55E] shadow-green-100'
                        : 'border-[#e8e8e4]'
                    }`}
                  >
                    {/* Success flash */}
                    <AnimatePresence>
                      {successId === member.id && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="bg-green-50 px-4 py-2 flex items-center gap-2"
                        >
                          <CheckCircle2 size={14} className="text-[#22C55E]" />
                          <p className="text-xs font-bold text-green-700">Account created successfully!</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ${
                            member.active ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-[#111827]">{member.name}</p>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                member.active
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {member.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            {stats.sales} sales · {formatCurrency(stats.revenue)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateStaff(member.id, { active: !member.active })}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                              member.active
                                ? 'bg-green-50 text-green-600 hover:bg-green-100'
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                            title={member.active ? 'Deactivate' : 'Activate'}
                          >
                            {member.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                          </button>
                          <button
                            onClick={() => removeStaff(member.id)}
                            className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Role badge */}
                      <div className="mt-3 flex items-center gap-2">
                        <Shield size={12} className="text-gray-400" />
                        <span className="text-xs font-medium text-gray-500">
                          POS access only · No analytics · No inventory
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={openModal}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-[#22C55E] text-white shadow-xl shadow-green-200 flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <Plus size={28} />
      </button>

      {/* Add Staff Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-end"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="bg-white w-full max-w-md mx-auto rounded-t-3xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-[#e8e8e4] flex items-center justify-between">
                <h2 className="text-xl font-black text-[#111827]">Add Attendant</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-xl bg-[#F8F8F5]">
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Name */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Adaeze Okonkwo"
                    value={form.name}
                    onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setPinError(''); }}
                    className="w-full h-12 px-4 rounded-xl border border-[#e8e8e4] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 focus:border-[#22C55E]"
                  />
                </div>

                {/* PIN Setup */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                    Set 4-Digit PIN *
                  </label>

                  {/* PIN dots */}
                  <div className="flex justify-center gap-4 mb-4">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: form.pin.length > i ? 1.2 : 1,
                          backgroundColor: form.pin.length > i ? '#22C55E' : '#e8e8e4',
                        }}
                        transition={{ duration: 0.15 }}
                        className="w-4 h-4 rounded-full"
                      />
                    ))}
                  </div>

                  {/* Mini numpad */}
                  <div className="grid grid-cols-3 gap-2 max-w-[250px] mx-auto">
                    {['1','2','3','4','5','6','7','8','9','','0','del'].map((key, i) => (
                      <button
                        key={i}
                        disabled={key === ''}
                        onClick={() => key === 'del' ? handlePinDelete() : handlePinDigit(key)}
                        className={`h-12 rounded-xl font-bold text-lg transition-all active:scale-90 ${
                          key === ''
                            ? 'invisible'
                            : key === 'del'
                            ? 'bg-gray-100 text-gray-600 text-sm'
                            : 'bg-[#F8F8F5] text-[#111827] hover:bg-green-50 hover:text-[#22C55E]'
                        }`}
                      >
                        {key === 'del' ? '⌫' : key}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {pinError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-red-500 font-medium text-center bg-red-50 rounded-xl py-2"
                    >
                      {pinError}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Permission summary */}
                <div className="bg-blue-50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-blue-700 mb-2 flex items-center gap-1.5">
                    <Shield size={13} /> Attendant Permissions
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { label: 'Use POS (take orders)', allowed: true },
                      { label: 'View transaction history', allowed: false },
                      { label: 'Access sales dashboard', allowed: false },
                      { label: 'Manage inventory', allowed: false },
                      { label: 'Create sub-accounts', allowed: false },
                    ].map(({ label, allowed }) => (
                      <div key={label} className="flex items-center gap-2 text-xs">
                        <span className={allowed ? 'text-[#22C55E]' : 'text-red-400'}>
                          {allowed ? '✓' : '✕'}
                        </span>
                        <span className={allowed ? 'text-blue-800 font-medium' : 'text-blue-400'}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  disabled={!form.name.trim() || form.pin.length !== 4}
                  className={`w-full py-4 rounded-2xl font-black text-base transition-all ${
                    form.name.trim() && form.pin.length === 4
                      ? 'bg-[#22C55E] text-white hover:bg-[#16a34a] shadow-lg shadow-green-100'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Create Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
