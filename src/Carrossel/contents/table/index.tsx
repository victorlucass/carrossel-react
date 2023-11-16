import { CarrosselContentCard } from "../../styles";

export function Table() {
  return (
    <CarrosselContentCard>
      <h1>Overview de Inspeção</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descricão</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Victor</td>
            <td>Front End Developer</td>
            <td>R$ 5.550,00</td>
          </tr>
        </tbody>
      </table>

    </CarrosselContentCard>
  )
}