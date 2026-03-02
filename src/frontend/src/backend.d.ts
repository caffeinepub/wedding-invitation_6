import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GuestMessage {
    id: bigint;
    name: string;
    submittedAt: Time;
    message: string;
}
export type Time = bigint;
export interface backendInterface {
    deleteMessage(id: bigint): Promise<void>;
    getAllMessages(): Promise<Array<GuestMessage>>;
    getMessageCount(): Promise<bigint>;
    submitMessage(name: string, message: string): Promise<bigint>;
}
