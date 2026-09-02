import { useEffect, useState } from 'react'
import { get, post } from '../services/api'

export default function Movimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([])
  const [produtos, setProdutos] = useState([])
  const [form, setForm] = useState({ produtoId: '', tipo: 'SAIDA', quantidade: 1, observacao: '' })
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    carregar()
    get('/produtos').then(setProdutos)
  }, [])

  function carregar() {
    get('/movimentacoes').then(setMovimentacoes)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // BUG: nao desabilita o botao durante o envio nem impede duplo-clique,
    // entao cliques rapidos podem registrar a mesma movimentacao 2x
    post('/movimentacoes', form).then(() => {
      carregar()
      get('/produtos').then(setProdutos)
    })
  }

  return (
    <div>
      <h1>Movimentacoes de Estoque</h1>
      <form className="card" onSubmit={handleSubmit}>
        <div className="field">
          <label>Produto</label>
          <select value={form.produtoId} onChange={(e) => setForm({ ...form, produtoId: e.target.value })}>
            <option value="">Selecione...</option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>{p.nome} (estoque: {p.quantidadeEstoque})</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Tipo</label>
          <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
            <option value="ENTRADA">Entrada</option>
            <option value="SAIDA">Saida</option>
          </select>
        </div>
        <div className="field">
          <label>Quantidade</label>
          <input type="number" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} />
        </div>
        <div className="field">
          <label>Observacao</label>
          <input value={form.observacao} onChange={(e) => setForm({ ...form, observacao: e.target.value })} />
        </div>
        <button type="submit">Registrar</button>
      </form>

      <table>
        <thead><tr><th>Produto</th><th>Tipo</th><th>Quantidade</th><th>Data</th><th>Observacao</th></tr></thead>
        <tbody>
          {/* BUG: nao trata o caso da lista vir vazia/null do backend antes de
              carregar; se a API retornar null (em vez de []) isso quebra. */}
          {movimentacoes.map((m) => (
            <tr key={m.id}>
              <td>{m.produtoId}</td>
              <td>{m.tipo}</td>
              <td>{m.quantidade}</td>
              {/* BUG: exibe a data crua do JS sem formatar em pt-BR */}
              <td>{new Date(m.data).toString()}</td>
              <td>{m.observacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
