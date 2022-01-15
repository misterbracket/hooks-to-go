import styled from "styled-components";
import UltimateButton from "./components/UltimateButton";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100vh;
  align-items: center;
`;

function App() {
  return (
    <Wrapper>
      <UltimateButton>Normal Button</UltimateButton>

      <UltimateButton isLoading={true}>Loading</UltimateButton>

      <UltimateButton isCompleted={true}>Is Completed</UltimateButton>

      <UltimateButton disabled>Disabled</UltimateButton>

      <UltimateButton renderAs="a" href="/">
        Render AS Link
      </UltimateButton>
    </Wrapper>
  );
}

export default App;
