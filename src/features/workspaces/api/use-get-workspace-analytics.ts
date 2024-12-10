import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import Error from "next/error";

interface UseGetWorkspaceAnalyticsProps {
  workspaceId: string;
}
export type WorkspaceAnalyticsResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["analytics"]["$get"],
  200
>;
export const useGetWorkspaceAnalytics = ({
  workspaceId,
}: UseGetWorkspaceAnalyticsProps) => {
  const query = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"][
        "analytics"
      ].$get({
        param: {
          workspaceId,
        },
      });
      if (!response.ok) {
        throw new Error({
          message: "Failed to get workspace analytics",
          statusCode: 422,
        });
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
