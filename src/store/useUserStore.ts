import { create } from "zustand";
import {IUser} from '../types'
interface UserState{
    user: IUser | null,
    setUser:(user: IUser) =>void;
    destroy: () => void
}

const useUserStore = create<UserState>((set)=>({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    setUser: (user: IUser) => {
        localStorage.setItem('user', JSON.stringify(user))
        set({user})
    },
    destroy: () => set({user:null})
}))

export default useUserStore;
