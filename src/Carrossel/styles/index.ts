import styled from "styled-components";

export const CarrosselContainer = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CarrosselContainerCard = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  opacity: 1;
  border-radius: 4px;
  padding: 1rem;
  display: grid;

  & > div {
    grid-area: 1/1;
    opacity: 0;
    visibility: none;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const CarrosselContentCard = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 7px;
  opacity: 1;
  padding: 1rem;
`;

export const Controls = styled.div`
  display: flex;
  gap: .5rem;
  justify-content: center;
`;

export const ButtonSelected = styled.button`
  width: 12px;
  height: 12px;
  background: #d0caca 0% 0% no-repeat padding-box;
  opacity: 1;
  border-radius: 50%;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &.active {
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 1;
    border-radius: 50%;
  }
`;
