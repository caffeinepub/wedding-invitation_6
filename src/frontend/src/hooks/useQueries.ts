import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { RSVP } from "../backend.d";

export function useGetAllRSVPs() {
  const { actor, isFetching } = useActor();
  return useQuery<RSVP[]>({
    queryKey: ["rsvps"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRSVPs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRSVPCount() {
  const { actor, isFetching } = useActor();
  return useQuery<{ total: bigint; attending: bigint; notAttending: bigint }>({
    queryKey: ["rsvpCount"],
    queryFn: async () => {
      if (!actor) return { total: 0n, attending: 0n, notAttending: 0n };
      return actor.getRSVPCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitRSVP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      attending,
      mealPreference,
      message,
    }: {
      name: string;
      email: string;
      attending: boolean;
      mealPreference: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitRSVP(name, email, attending, mealPreference, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
      queryClient.invalidateQueries({ queryKey: ["rsvpCount"] });
    },
  });
}

export function useDeleteRSVP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteRSVP(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
      queryClient.invalidateQueries({ queryKey: ["rsvpCount"] });
    },
  });
}
