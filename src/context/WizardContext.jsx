import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "wizard_upload_state_v1";

const initialState = {
  basicInfo: { name: "", location: "", description: "", guests: { adults: 0, children: 0, infants: 0 }, type: "" , beds: 1, baths: 1 },
  features: {},
  photos: [],
  video: null,
  price: 0,
  payout: { accountNumber: "", bank: "", accountName: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_BASIC":
      return { ...state, basicInfo: { ...state.basicInfo, ...action.payload } };
    case "SET_FEATURES":
      return { ...state, features: { ...state.features, ...action.payload } };
    case "ADD_PHOTOS":
      return { ...state, photos: [...state.photos, ...action.payload] };
    case "REMOVE_PHOTO":
      return { ...state, photos: state.photos.filter((p) => p.id !== action.payload) };
    case "REORDER_PHOTOS":
      return { ...state, photos: action.payload };
    case "SET_VIDEO":
      return { ...state, video: action.payload };
    case "REMOVE_VIDEO":
      return { ...state, video: null };
    case "RESET":
      return initialState;
    case "SET_PRICE":
      return { ...state, price: Number(action.payload || 0) };
    case "SET_PAYOUT":
      return { ...state, payout: { ...state.payout, ...action.payload } };
    default:
      return state;
  }
}

const WizardContext = createContext();

export function WizardProvider({ children, persist = true }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...init, ...JSON.parse(raw) } : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    if (!persist) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, persist]);

  const api = useMemo(() => ({ state, dispatch }), [state]);

  return <WizardContext.Provider value={api}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}



