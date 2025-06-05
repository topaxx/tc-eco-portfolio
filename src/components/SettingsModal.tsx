import React, { useState, useEffect } from 'react';
import { X, User, Wallet, Plus, Edit2, Trash2, Copy, ExternalLink, Save } from 'lucide-react';
import { Profile, WalletAddress } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  onSave: (profile: Profile) => void;
}

interface WalletFormData {
  label: string;
  address: string;
  network: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [profileName, setProfileName] = useState('');
  const [profileIcon, setProfileIcon] = useState('👤');
  const [wallets, setWallets] = useState<WalletAddress[]>([]);
  const [editingWallet, setEditingWallet] = useState<string | null>(null);
  const [isAddingWallet, setIsAddingWallet] = useState(false);
  const [walletForm, setWalletForm] = useState<WalletFormData>({
    label: '',
    address: '',
    network: 'THORCHAIN'
  });

  useEffect(() => {
    if (profile) {
      setProfileName(profile.name);
      setProfileIcon(profile.icon);
      setWallets([...profile.addresses]);
    } else {
      setProfileName('');
      setProfileIcon('👤');
      setWallets([]);
    }
    // Reset form states when profile changes
    setEditingWallet(null);
    setIsAddingWallet(false);
    setWalletForm({ label: '', address: '', network: 'THORCHAIN' });
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: Add toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const truncateAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleSaveProfile = () => {
    const profileData: Profile = {
      id: profile?.id || Date.now().toString(),
      name: profileName || 'My Profile',
      icon: profileIcon,
      addresses: wallets
    };
    onSave(profileData);
    onClose();
  };

  // ADD ADDRESS FUNCTION
  const handleAddWallet = () => {
    if (walletForm.label.trim() && walletForm.address.trim()) {
      const newWallet: WalletAddress = {
        id: Date.now().toString(),
        label: walletForm.label.trim(),
        address: walletForm.address.trim(),
        network: walletForm.network
      };
      setWallets(prev => [...prev, newWallet]);
      setWalletForm({ label: '', address: '', network: 'THORCHAIN' });
      setIsAddingWallet(false);
    }
  };

  // EDIT ADDRESS FUNCTION - Start editing
  const handleEditWallet = (walletId: string) => {
    const wallet = wallets.find(w => w.id === walletId);
    if (wallet) {
      setWalletForm({
        label: wallet.label,
        address: wallet.address,
        network: wallet.network
      });
      setEditingWallet(walletId);
      setIsAddingWallet(false);
    }
  };

  // EDIT ADDRESS FUNCTION - Save changes
  const handleUpdateWallet = () => {
    if (editingWallet && walletForm.label.trim() && walletForm.address.trim()) {
      setWallets(prev => prev.map(w => 
        w.id === editingWallet 
          ? { 
              ...w, 
              label: walletForm.label.trim(), 
              address: walletForm.address.trim(), 
              network: walletForm.network 
            }
          : w
      ));
      setWalletForm({ label: '', address: '', network: 'THORCHAIN' });
      setEditingWallet(null);
    }
  };

  // REMOVE ADDRESS FUNCTION
  const handleDeleteWallet = (walletId: string) => {
    setWallets(prev => prev.filter(w => w.id !== walletId));
    // If we're editing the wallet being deleted, cancel the edit
    if (editingWallet === walletId) {
      setEditingWallet(null);
      setWalletForm({ label: '', address: '', network: 'THORCHAIN' });
    }
  };

  const cancelWalletForm = () => {
    setWalletForm({ label: '', address: '', network: 'THORCHAIN' });
    setIsAddingWallet(false);
    setEditingWallet(null);
  };

  const availableIcons = ['👤', '🚀', '💎', '⚡', '🔥', '🌟', '💰', '🎯'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="crypto-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-crypto-green rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <h2 className="text-white text-xl font-semibold">Profile Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Settings */}
          <div className="space-y-4">
            <h3 className="text-crypto-green text-lg font-medium">Profile Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Enter profile name"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-crypto-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Icon</label>
                <div className="flex space-x-2">
                  {availableIcons.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setProfileIcon(icon)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors ${
                        profileIcon === icon 
                          ? 'bg-crypto-green text-black' 
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Address/Wallet Management Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-crypto-green text-lg font-medium flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                Wallet Addresses
              </h3>
              {!isAddingWallet && !editingWallet && (
                <button
                  onClick={() => setIsAddingWallet(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-crypto-green text-black rounded-lg hover:bg-emerald-400 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Address</span>
                </button>
              )}
            </div>

            {/* Add/Edit Address Form */}
            {(isAddingWallet || editingWallet) && (
              <div className="bg-gray-800 rounded-lg p-4 space-y-3 border border-gray-700">
                <h4 className="text-white font-medium">
                  {editingWallet ? 'Edit Address' : 'Add New Address'}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Label</label>
                    <input
                      type="text"
                      value={walletForm.label}
                      onChange={(e) => setWalletForm({ ...walletForm, label: e.target.value })}
                      placeholder="e.g., Main Wallet, Trading Wallet"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-crypto-green text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Network</label>
                    <select
                      value={walletForm.network}
                      onChange={(e) => setWalletForm({ ...walletForm, network: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-crypto-green text-sm"
                    >
                      <option value="THORCHAIN">THORCHAIN</option>
                      <option value="BITCOIN">BITCOIN</option>
                      <option value="ETHEREUM">ETHEREUM</option>
                      <option value="COSMOS">COSMOS</option>
                      <option value="BINANCE">BINANCE</option>
                      <option value="AVALANCHE">AVALANCHE</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Wallet Address</label>
                  <input
                    type="text"
                    value={walletForm.address}
                    onChange={(e) => setWalletForm({ ...walletForm, address: e.target.value })}
                    placeholder="Enter wallet address (e.g., thor1abc...xyz)"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-crypto-green text-sm font-mono"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={editingWallet ? handleUpdateWallet : handleAddWallet}
                    disabled={!walletForm.label.trim() || !walletForm.address.trim()}
                    className="flex items-center space-x-2 px-4 py-2 bg-crypto-green text-black rounded-lg hover:bg-emerald-400 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingWallet ? 'Update Address' : 'Add Address'}</span>
                  </button>
                  <button
                    onClick={cancelWalletForm}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Address List */}
            <div className="space-y-2">
              {wallets.map((wallet) => (
                <div key={wallet.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-crypto-green text-sm font-medium">{wallet.label}</span>
                      <span className="text-gray-400 text-xs uppercase px-2 py-1 bg-gray-700 rounded">
                        {wallet.network}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditWallet(wallet.id)}
                        disabled={isAddingWallet || editingWallet !== null}
                        className="text-gray-400 hover:text-crypto-green transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit address"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteWallet(wallet.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors p-1"
                        title="Remove address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <code className="text-gray-300 text-sm font-mono bg-gray-900 px-2 py-1 rounded">
                      {truncateAddress(wallet.address)}
                    </code>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => copyToClipboard(wallet.address)}
                        className="text-gray-400 hover:text-crypto-green transition-colors p-1"
                        title="Copy full address"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-crypto-green transition-colors p-1"
                        title="View on blockchain explorer"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {wallets.length === 0 && !isAddingWallet && (
                <div className="text-center py-8 text-gray-400">
                  <Wallet className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-base">No addresses added yet</p>
                  <p className="text-sm">Add your first wallet address to start tracking</p>
                </div>
              )}
            </div>
          </div>

          {/* Save Profile Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-6 py-2 bg-crypto-green text-black rounded-lg hover:bg-emerald-400 transition-colors font-medium"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
