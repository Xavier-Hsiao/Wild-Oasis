import styled from "styled-components";

const StyledSidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);

  /* Grid item */
  grid-row: 1 / -1;
`;

export default function Sidebar() {
  return <StyledSidebar>SIDEBAR</StyledSidebar>;
}
