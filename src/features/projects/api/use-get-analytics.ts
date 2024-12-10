import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import Error from "next/error";

interface UseGetAnalyticsProps {
  projectId: string;
}
export type ProjectAnalyticsResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
  200
>;
export const useGetAnalytics = ({ projectId }: UseGetAnalyticsProps) => {
  const query = useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"][
        "analytics"
      ].$get({
        param: {
          projectId,
        },
      });
      if (!response.ok) {
        throw new Error({
          message: "Failed to get project analytics",
          statusCode: 422,
        });
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
