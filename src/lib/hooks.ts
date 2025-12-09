import { useEffect, useState } from "react";
import type { JobItem } from "./types";
import { BASE_API_URL } from "./constants";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    function handleChangeHash() {
      const id = window.location.hash.slice(1) as string;
      setActiveId(+id);
    }
    handleChangeHash();
    window.addEventListener("hashchange", handleChangeHash);
    return () => {
      window.removeEventListener("hashchange", handleChangeHash);
    };
  }, []);
  return activeId;
}
export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();
      setJobItem(data.jobItem);
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  return jobItem;
}
export function useActiveJobItem() {
  const activeId = useActiveId();
  const jobItem = useJobItem(activeId);
  return jobItem;
}
export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);
  return [jobItemsSliced, isLoading] as const;
}
