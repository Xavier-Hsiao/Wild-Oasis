import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin as updateCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading } = useMutation({
    mutationFn: updateCabinApi,
    onSuccess: () => {
      // So new cabin appears in UI without manual refresh
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin updated successfully!");
    },
    // Error threw by updateCabin api
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, updateCabin };
}
