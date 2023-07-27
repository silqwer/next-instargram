import { createContext, useContext } from "react";
/**
 * 공통으로 관리하는 SWR query key
 * 필요한 도메인이 있다면 추가
 */
type CacheKeys = {
  postsKey: string;
};
export const CacheKeysContext = createContext<CacheKeys>({
  postsKey: "/api/posts",
});

export const useCacheKeys = () => useContext(CacheKeysContext);
