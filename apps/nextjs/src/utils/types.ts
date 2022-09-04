export interface Message {
	content: string;
	author: string | null | undefined;
    picture: string | null | undefined;
	id: string;
	isAdmin: boolean;
}

export type PickWhereValuesAre<T, V> = {
	[Key in keyof T as T[Key] extends V ? Key : never]: T[Key];
};
