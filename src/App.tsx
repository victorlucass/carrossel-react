import { Carrossel } from "./Carrossel";
import { Grafic } from "./Carrossel/contents/grafic";
import { Grafic2 } from "./Carrossel/contents/grafic2";
import { Table } from "./Carrossel/contents/table";
import { AppContainer } from "./styles/App";
import { StylesGlobal } from "./styles/global";

function App() {
  return (
    <AppContainer>
      <StylesGlobal />
      <Carrossel timeRun={1000}>
        <Table />
        <Grafic />
        <Grafic2 />
      </Carrossel>
    </AppContainer>
  );
}

export default App;
