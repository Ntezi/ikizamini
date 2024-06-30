import {Action, combineReducers, configureStore, EnhancedStore, ThunkAction} from '@reduxjs/toolkit';
import quizReducer from '../features/quiz/quizSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
import { StorageManager } from "../utils/StorageManager";


export const rootReducer = combineReducers({
    quiz: quizReducer,
});


export type RootState = ReturnType<typeof rootReducer>;

const preloadedState: Partial<RootState> | undefined =
    StorageManager.loadFromLocalStorage();

export const makeStore = (
    preloadedState?: Partial<RootState>,
): EnhancedStore<RootState> => {
    const store: EnhancedStore<RootState> = configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {},
                immutableCheck: { warnAfter: 100 },
            }),
        devTools: process.env.NODE_ENV !== "production",
    });

    store.subscribe(() => {
        StorageManager.saveToLocalStorage(store.getState());
    });

    setupListeners(store.dispatch);
    return store;
};

export const store = makeStore(preloadedState);

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;