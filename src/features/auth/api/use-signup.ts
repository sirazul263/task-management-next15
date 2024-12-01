import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.signup)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.signup)["$post"]>;

export const userSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signup["$post"]({ json });
      if (!response.ok) {
        throw new Error({ message: "Failed to Signup", statusCode: 500 });
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Signed up successfully!");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: (error) => {
      toast.error("Failed to signup!");
    },
  });
  return mutation;
};
