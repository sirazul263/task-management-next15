import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import Error from "next/error";

interface UseGetSingleProjectProps {
  projectId: string;
}
export const useGetSingleProject = ({
  projectId,
}: UseGetSingleProjectProps) => {
  const query = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"].$get({
        param: {
          projectId,
        },
      });
      if (!response.ok) {
        throw new Error({
          message: "Failed to get project",
          statusCode: 422,
        });
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
