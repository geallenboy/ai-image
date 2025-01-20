import { create } from "zustand";

interface GeneratedState {
  loading: boolean;
  images: Array<{ url: string }>;
  error: string | null;
}

const useGeneratedStore = create<GeneratedState>((set) => ({
  loading: false,
  images: [],
  error: null,
}));

export default useGeneratedStore;
