import { defineStore } from "pinia";

export const useStore = defineStore("apod", {
  state: () => ({
    baseUrl: "https://api.nasa.gov/planetary/apod",
    apiKey: import.meta.env.VITE_NASA_API_KEY ?? "DEMO_KEY",
    apodsAlreadyFetched: {},
  }),
  getters: {
    getTodayUrl(state) {
      let url = state.baseUrl;
      url += `?api_key=${state.apiKey}`;
      return url;
    },
  },
  actions: {
    getUrlWithDate(date) {
      let url = this.baseUrl;
      url += `?api_key=${this.apiKey}`;
      url += `&date=${date}`;
      return url;
    },
    getUrlWithRange(date1, date2) {
      let url = this.baseUrl;
      url += `?api_key=${this.apiKey}`;
      url += `&start_date=${date1 > date2 ? date2 : date1}`;
      url += `&end_date=${date1 > date2 ? date1 : date2}`;
      url += `&thumbs=true`;
      return url;
    },
    saveApod(apod) {
      this.apodsAlreadyFetched[apod.date] = apod;
    },
  },
});
