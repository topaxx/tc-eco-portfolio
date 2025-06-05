import React from 'react';
import { X, User, Wallet, Copy, ExternalLink } from 'lucide-react';
import { Profile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="crypto-card w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-crypto-green rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <div>
              <h2 className="text-white text-lg font-semibold">{profile.name}</h2>
              <p className="text-gray-400 text-sm">{profile.addresses.length} wallets connected</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Addresses List */}
        <div className="p-4">
          <h3 className="text-crypto-green text-sm font-medium mb-3 flex items-center">
            <Wallet className="w-4 h-4 mr-2" />
            Connected Wallets
          </h3>
          
          <div className="space-y-2">
            {profile.addresses.map((wallet) => (
              <div key={wallet.id} className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-crypto-green text-sm font-medium">{wallet.label}</span>
                  <span className="text-gray-400 text-xs uppercase">{wallet.network}</span>
                </div>
                <div className="flex items-center justify-between">
                  <code className="text-gray-300 text-sm font-mono">
                    {truncateAddress(wallet.address)}
                  </code>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => copyToClipboard(wallet.address)}
                      className="text-gray-400 hover:text-crypto-green transition-colors p-1"
                      title="Copy address"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-crypto-green transition-colors p-1"
                      title="View on explorer"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
