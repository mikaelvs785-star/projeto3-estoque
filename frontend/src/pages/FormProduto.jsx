import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, post, put } from '../services/api'

export default function FormProduto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({
    nome: '', descricao: '', precoUnitario: '', quantidadeEstoque: 0, estoqueMinimo: 0, categoriaId: '',
  })

  useEffect(() => {
    get('/categorias').then(setCategorias)
    if (id) {
      get(`/produtos/${id}`).then(setForm)
    }
  }, [id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // BUG: nao valida preco negativo antes de enviar pro backend
    if (id) {
      put(`/produtos/${id}`, form).then(() => navigate('/produtos'))
    } else {
      post('/produtos', form).then(() => navigate('/produtos'))
    }
  }

  return (
    <div>
      <h1>{id ? 'Editar Produto' : 'Novo Produto'}</h1>
      <form className="card" onSubmit={handleSubmit}>
        <div className="field">
          <label>Nome</label>
          <input name="nome" value={form.nome} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Descricao</label>
          <input name="descricao" value={form.descricao} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Preco unitario</label>
          <input type="number" step="0.01" name="precoUnitario" value={form.precoUnitario} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Estoque minimo</label>
          <input type="number" name="estoqueMinimo" value={form.estoqueMinimo} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Categoria</label>
          {/* BUG: o value do option usa o NOME da categoria em vez do ID,
              entao categoriaId acaba sendo salvo com um texto (o nome),
              e nao com o id numerico que o backend espera. */}
          <select name="categoriaId" value={form.categoriaId} onChange={handleChange}>
            <option value="">Selecione...</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.nome}>{c.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}
