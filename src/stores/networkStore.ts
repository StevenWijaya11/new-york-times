import { create } from 'zustand';

type NetworkStore = {
  isConnected: boolean;
  setIsConnected: (status: boolean) => void;
};

export const useNetworkStore = create<NetworkStore>((set) => ({
  isConnected: true,
  setIsConnected: (status) => set({ isConnected: status }),
}));
