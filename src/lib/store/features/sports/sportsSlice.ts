import { SportItem } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SportsState {
  loading: boolean;
  categories: SportItem[];
  events: [];
  leagues: any;
  selectedEvent: string;
  selectedLeague: string;
  selectedCategory: string;
}

const initialState: SportsState = {
  loading: false,
  categories: [],
  events: [],
  leagues: {},
  selectedEvent: "",
  selectedLeague: "",
  selectedCategory: "All",
};

const sportsSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<SportItem[]>) => {
      state.categories = action.payload;
    },
    setEvents: (state, action: PayloadAction<[]>) => {
      state.events = action.payload;
    },
    setLeagues: (state, action: PayloadAction<[]>) => {
      state.leagues = action.payload;
    },
    setSelectedEvent(state, action: PayloadAction<string>) {
      state.selectedEvent = action.payload;
    },
    setSelectedLeague(state, action: PayloadAction<string>) {
      state.selectedLeague = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      console.log("g");
      state.selectedCategory = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setCategories,
  setEvents,
  setLeagues,
  setSelectedCategory,
  setSelectedEvent,
  setSelectedLeague,
  setLoading,
} = sportsSlice.actions;

export default sportsSlice.reducer;
