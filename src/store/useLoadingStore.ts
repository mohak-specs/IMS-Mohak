import {create} from 'zustand'

type LoadingState = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    destroy: () => void
}

const useLoadingStore = create<LoadingState>((set)=>({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({isLoading}),
    destroy: () => set({isLoading: false})
}))

export default useLoadingStore;