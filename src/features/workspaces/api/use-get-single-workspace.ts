import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import Error from "next/error";

interface UseGetSingleWorkspaceProps {
  workspaceId: string;
}
export const useGetSingleWorkspace = ({
  workspaceId,
}: UseGetSingleWorkspaceProps) => {
  const query = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"].$get({
        param: {
          workspaceId,
        },
      });
      if (!response.ok) {
        throw new Error({
          message: "Failed to get workspace",
          statusCode: 422,
        });
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
