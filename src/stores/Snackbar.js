import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("useSnackbar", {
    state () {
        return {
            show: false,
            color: "",
            message: ""
        };
    },
    actions: {
        showSnackbar(color, message) {
            this.show = true;
            this.color = color;
            this.message = message;
            setTimeout(() => this.hideSnackbar(), 3000);
        },
        hideSnackbar() {
                this.show = false,
                this.color = "",
                this.message = ""
        }
    },
})