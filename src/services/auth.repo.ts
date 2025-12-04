import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/model.user';

const KEY = 'AUTH_APP@session';

export async function setSession(session: User) {
    const json = JSON.stringify(session);
    await AsyncStorage.setItem(KEY, json);
}

export async function getSession() {
    const json = await AsyncStorage.getItem(KEY);
    if (!json) return null;

    const session: User = JSON.parse(json);
    return session;
}

export async function clearSession() {
    await AsyncStorage.removeItem(KEY);
}
