import useSWR from "swr";
import { Breadcrumb } from "@/types/types";
import { api_url } from "@/helpers/url";

const fetcher = (url: string) => {
  const token = localStorage.getItem('token');
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((res) => res.json());
};

export const useBreadcrumbTrail = () => {
  const { data: randomNode, mutate: mutateRandom } = useSWR<Breadcrumb>(
    `${api_url}/random_breadcrumb`,
    fetcher
  );

  const getBreadcrumbTrail = async (
    node: Breadcrumb
  ): Promise<Breadcrumb[]> => {
    let trail: Breadcrumb[] = [node];
    let currentNode = node;

    while (currentNode.parent !== null) {
      const parentNode = await fetcher(
        `${api_url}/breadcrumbs/${currentNode.parent}`
      );
      trail = [parentNode, ...trail];
      currentNode = parentNode;
    }

    return trail;
  };

  const { data: trail } = useSWR(
    randomNode,
    () => getBreadcrumbTrail(randomNode!),
    { revalidateOnFocus: false }
  );

  return {
    trail,
    mutate: mutateRandom,
  };
};
