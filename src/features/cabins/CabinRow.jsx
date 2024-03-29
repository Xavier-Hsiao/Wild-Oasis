import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { isLoading: isCreating, createCabin } = useCreateCabin();
  const {
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    name,
    discount,
    image,
    id: cabinId,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      max_capacity: maxCapacity,
      regular_price: regularPrice,
      discount,
      image,
      description,
    });
  }

  const [showForm, setShowForm] = useState(false);
  // Custom hook with React Query
  const { isPending, deleteCabin } = useDeleteCabin();

  return (
    <>
      <TableRow role="row">
        <Img src={image}></Img>
        <Cabin>{name}</Cabin>
        <div>{maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isPending}>
            <HiTrash />
          </button>
          <button onClick={() => setShowForm((state) => !state)}>
            <HiPencil />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}
