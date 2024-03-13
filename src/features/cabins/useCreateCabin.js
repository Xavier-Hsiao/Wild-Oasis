import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      // So new cabin appears in UI without manual refresh
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("New cabin created successfully!");
    },
    // Error threw by createCabin api
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, createCabin };
}
