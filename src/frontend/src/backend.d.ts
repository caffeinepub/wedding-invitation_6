import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RSVP {
    id: bigint;
    mealPreference: string;
    name: string;
    submittedAt: Time;
    email: string;
    message: string;
    attending: boolean;
}
export type Time = bigint;
export interface backendInterface {
    deleteRSVP(id: bigint): Promise<void>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getRSVPCount(): Promise<{
        total: bigint;
        notAttending: bigint;
        attending: bigint;
    }>;
    submitRSVP(name: string, email: string, attending: boolean, mealPreference: string, message: string): Promise<bigint>;
}
