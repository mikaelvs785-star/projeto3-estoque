import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Produtos from './pages/Produtos.jsx'
import FormProduto from './pages/FormProduto.jsx'
import Categorias from './pages/Categorias.jsx'
import Movimentacoes from './pages/Movimentacoes.jsx'

function App() {
  return (
    <div>
      <nav>
        <a href="/">Dashboard</a>
        <a href="/produtos">Produtos</a>
        <a href="/categorias">Categorias</a>
        <a href="/movimentacoes">Movimentacoes</a>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/novo" element={<FormProduto />} />
          <Route path="/produtos/:id/editar" element={<FormProduto />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/movimentacoes" element={<Movimentacoes />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
