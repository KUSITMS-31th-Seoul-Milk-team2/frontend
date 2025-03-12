import { create } from "zustand";

interface AnnouncementState {
    title: string;
    content: string;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
}

export const useAnnouncementStore = create<AnnouncementState>((set) => ({
    title: "",
    content: "",
    setTitle: (title) => set(() => ({ title })),
    setContent: (content) => set(() => ({ content })),
}));
