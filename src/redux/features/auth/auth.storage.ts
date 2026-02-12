import AsyncStorage from '@react-native-async-storage/async-storage';
import { TUser } from './auth.type';

const AUTH_KEY = 'auth.session.v1';

export type StoredAuth = {
  accessToken: string;
  user: TUser;
};

export async function saveAuthToStorage(value: StoredAuth) {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(value));
}

export async function readAuthFromStorage(): Promise<StoredAuth | null> {
  const raw = await AsyncStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.accessToken || !parsed?.user?.id || !parsed?.user?.email)
      return null;
    return parsed as StoredAuth;
  } catch {
    return null;
  }
}

export async function clearAuthFromStorage() {
  await AsyncStorage.removeItem(AUTH_KEY);
}
