import React, { useState } from 'react';
import { X, Plus, Trash2, User } from 'lucide-react';
import { Profile, WalletAddress } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  onSave: (profile: Profile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [name, setName] = useState(profile?.name || '');
  const [icon, setIcon] = useState(profile?.icon || '👤');
  const [addresses, setAddresses] = useState<WalletAddress[]>(
    profile?.addresses || []
  );

  if (!isOpen) return null;

  const handleAddAddress = () => {
    const newAddress: WalletAddress = {
      id: Date.now().toString(),
      address: '',
      label: '',
      network: 'thorchain'
    };
    setAddresses([...addresses, newAddress]);
  };

  const handleRemoveAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleAddressChange = (id: string, field: keyof WalletAddress, value: string) => {
    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, [field]: value } : addr
    ));
  };

  const handleSave = () => {
    const updatedProfile: Profile = {
      id: profile?.id || Date.now().toString(),
      name,
      icon,
      addresses: addresses.filter(addr => addr.address.trim() !== '')
    };
    onSave(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="crypto-card max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {profile ? 'Edit Profile' : 'Create Profile'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{icon}</div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-crypto-green mb-1">
                Profile Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter profile name"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-crypto-green">
                Wallet Addresses
              </label>
              <button
                onClick={handleAddAddress}
                className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Address</span>
              </button>
            </div>

            <div className="space-y-3">
              {addresses.map((address) => (
                <div key={address.id} className="flex items-center space-x-3 p-3 crypto-card-inner">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={address.label}
                      onChange={(e) => handleAddressChange(address.id, 'label', e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={address.address}
                      onChange={(e) => handleAddressChange(address.id, 'address', e.target.value)}
                      className="md:col-span-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Wallet address"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveAddress(address.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-crypto-green text-black rounded-md hover:bg-emerald-400 transition-colors font-medium"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
