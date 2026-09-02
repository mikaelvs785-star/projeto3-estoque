import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get, del } from '../services/api'

export default function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    carregar()
    get('/categorias').then(setCategorias)
  }, [])

  function carregar() {
    get('/produtos').then(setProdutos)
  }

  function nomeCategoria(categoriaId) {
    const cat = categorias.find((c) => c.id === categoriaId)
    return cat ? cat.nome : '(sem categoria)'
  }

  function excluir(id) {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      del(`/produtos/${id}`).then(carregar)
    }
  }

  return (
    <div>
      <h1>Produtos</h1>
      <Link to="/produtos/novo"><button>Novo produto</button></Link>
      <table style={{ marginTop: 16 }}>
        <thead>
          <tr><th>Nome</th><th>Categoria</th><th>Preco</th><th>Estoque</th><th>Acoes</th></tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} className={p.quantidadeEstoque < p.estoqueMinimo ? 'low-stock' : ''}>
              <td>{p.nome}</td>
              <td>{nomeCategoria(p.categoriaId)}</td>
              {/* BUG: concatenacao manual em vez de formatacao de moeda */}
              <td>R$ {p.precoUnitario}</td>
              <td>{p.quantidadeEstoque}</td>
              <td>
                <Link to={`/produtos/${p.id}/editar`}>Editar</Link>{' '}
                <button className="danger" onClick={() => excluir(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
