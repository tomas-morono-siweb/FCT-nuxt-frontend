import type { Player } from "~/interfaces/player";

export const usePlayers = () => {
  const list = (q?: string, page = 1, pageSize = 10) =>
    $fetch<Player[]>("/api/players", { query: { q, page, pageSize } });
  const get = (id: number) => $fetch<Player>(`/api/players/${id}`);
  const create = (payload: Partial<Player>) => $fetch<Player>("/api/players", { method: "POST", body: payload });
  const update = (id: number, payload: Partial<Player>) =>
    $fetch<Player>(`/api/players/${id}`, { method: "PUT", body: payload });
  const remove = (id: number) => $fetch(`/api/players/${id}`, { method: "DELETE" });
  return { list, get, create, update, remove };
};
