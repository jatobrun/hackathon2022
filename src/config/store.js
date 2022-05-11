import { createClient } from "@liveblocks/client";
import { enhancer } from "@liveblocks/redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const client = createClient({
  publicApiKey: "pk_live_cbq_eQgHUqP0MmpPauDzTOj0",
});

const initialState = {};

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    /* logic will be added here */
  },
});

export function makeStore() {
  return configureStore({
    reducer: slice.reducer,
    enhancers: [
      enhancer({
        client,
      }),
    ],
  });
}

const store = makeStore();

export default store;