import { useEffect, useState } from 'react'
import { get, post, del } from '../services/api'

export default function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [nome, setNome] = useState('')

  useEffect(() => {
    carregar()
  }, [])

  function carregar() {
    get('/categorias').then(setCategorias)
  }

  function criar(e) {
    e.preventDefault()
    post('/categorias', { nome }).then(() => {
      setNome('')
      carregar()
    })
  }

  function excluir(id) {
    // BUG: nenhum aviso de que produtos vinculados a essa categoria vao ficar
    // com uma referencia quebrada
    del(`/categorias/${id}`).then(carregar)
  }

  return (
    <div>
      <h1>Categorias</h1>
      <form className="card" onSubmit={criar}>
        <div className="field">
          <label>Nome da categoria</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <button type="submit">Adicionar</button>
      </form>
      <table>
        <thead><tr><th>Nome</th><th>Acoes</th></tr></thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td><button className="danger" onClick={() => excluir(c.id)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
