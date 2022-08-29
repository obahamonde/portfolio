import { defineStore } from 'pinia'

export const useStore =  defineStore("store", ()=>{
    const user = ref()
    const token = ref("")
    const setUser = (newName: any) => {
        user.value = newName
    }

    const setToken = (newToken: string) => {
        token.value = newToken
    }
    
    return {
        user,
        setUser,
        token,
        setToken
    }
})