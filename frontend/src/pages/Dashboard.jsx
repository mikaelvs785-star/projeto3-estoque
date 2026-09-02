import { useEffect, useState } from 'react'
import { get } from '../services/api'

export default function Dashboard() {
  const [produtos, setProdutos] = useState([])
  const [valorTotal, setValorTotal] = useState(0)

  useEffect(() => {
    get('/produtos').then(setProdutos)
    get('/produtos/valor-total').then((r) => setValorTotal(r.valorTotal))
  }, [])

  // BUG: usa um limite fixo de 10 unidades pra destacar "estoque baixo" no
  // dashboard, ignorando o campo estoqueMinimo de cada produto (que pode ser
  // diferente para cada um).
  const estoqueBaixo = produtos.filter((p) => p.quantidadeEstoque < 10)

  return (
    <div>
      <h1>Painel de Estoque</h1>
      <div className="grid">
        <div className="card">
          <div>Produtos cadastrados</div>
          <div className="stat">{produtos.length}</div>
        </div>
        <div className="card">
          <div>Valor total em estoque</div>
          {/* BUG: concatenacao manual de string em vez de toLocaleString,
              mostra por exemplo "R$ 199.9" em vez de "R$ 199,90" */}
          <div className="stat">R$ {valorTotal}</div>
        </div>
        <div className="card">
          <div>Produtos com estoque baixo</div>
          <div className="stat">{estoqueBaixo.length}</div>
        </div>
      </div>

      <h2>Alerta de estoque baixo</h2>
      <table>
        <thead><tr><th>Produto</th><th>Estoque</th><th>Minimo</th></tr></thead>
        <tbody>
          {estoqueBaixo.map((p) => (
            <tr key={p.id}><td>{p.nome}</td><td>{p.quantidadeEstoque}</td><td>{p.estoqueMinimo}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
