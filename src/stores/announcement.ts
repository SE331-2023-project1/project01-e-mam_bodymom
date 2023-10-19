import AnnouncementService from "@/services/AnnouncementService";
import type { AnnouncementItem } from "@/type";
import axios from "axios";
import { defineStore } from "pinia";

export const useAnnouncementStore = defineStore('announcement', {
    state: () => ({
        announcements: [] as AnnouncementItem[]
    }),
    getters: {
        getAnnouncement: (state) => state.announcements
    },
    actions: {
        setAnnouncements(announcements: AnnouncementItem[]) {
            this.announcements = announcements
        },
        async fetchAnnouncements() {
            const response = await AnnouncementService.getAnnouncements()
            this.setAnnouncements(response.data)
        }
    }
})