import { defineStore } from "pinia";
import router from '../router'

export const useNavigationStore = defineStore('useNavigation', {
    state: () => ({
        route: '',
    }),
    actions: {
        goTo: (route) => router.push(route)
    }
})