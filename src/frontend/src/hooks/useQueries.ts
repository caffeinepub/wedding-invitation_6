import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GuestMessage } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllMessages() {
  const { actor, isFetching } = useActor();
  return useQuery<GuestMessage[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMessageCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["messageCount"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getMessageCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      message,
    }: {
      name: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitMessage(name, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["messageCount"] });
    },
  });
}

export function useDeleteMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteMessage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["messageCount"] });
    },
  });
}
