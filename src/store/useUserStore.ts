import create from "zustand";
import { IUser } from "../types";
import { persist,createJSONStorage } from "zustand/middleware";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  destroy: () => void;
}

const useUserStore = create<UserState | any>(
    persist((set)=>({
        user: null,
        setUser(user: IUser) {
            set({ user });
        },
        destroy() {
            set({ user: null });
        },
    }),{
        name: "user-storage",
        storage: createJSONStorage(()=>localStorage)
    })
);

export default useUserStore;
