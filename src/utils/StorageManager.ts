import * as CryptoJS from "crypto-js";
import { RootState } from "../app/store";

export class StorageManager {
  private static readonly SECRET_KEY = "astytuidshxgtyuijdshyt7yuijdsh";

  public static saveToLocalStorage(state: any): void {
    try {
      const serializedState = JSON.stringify(state);
      const encryptedState = CryptoJS.AES.encrypt(
        serializedState,
        StorageManager.SECRET_KEY,
      ).toString();
      localStorage.setItem("persist:root", encryptedState);
    } catch (e) {
      console.error("Could not save state");
    }
  }

  public static loadFromLocalStorage(): Partial<RootState> | undefined {
    try {
      const encryptedState = localStorage.getItem("persist:root");
      if (encryptedState === null) return undefined;
      const bytes = CryptoJS.AES.decrypt(
        encryptedState,
        StorageManager.SECRET_KEY,
      );
      const originalState = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(originalState) as Partial<RootState> | undefined;
    } catch (e) {
      console.error("Could not load state");
      return undefined;
    }
  }
}
