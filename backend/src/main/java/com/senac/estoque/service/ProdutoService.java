package com.senac.estoque.service;

import com.senac.estoque.model.Produto;
import com.senac.estoque.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id).orElseThrow();
    }

    public Produto salvar(Produto produto) {
        if (produto.getQuantidadeEstoque() == null) {
            produto.setQuantidadeEstoque(0);
        }
        return produtoRepository.save(produto);
    }

    public Produto atualizar(Long id, Produto dados) {
        Produto produto = buscarPorId(id);
        produto.setNome(dados.getNome());
        produto.setDescricao(dados.getDescricao());
        produto.setPrecoUnitario(dados.getPrecoUnitario());
        produto.setEstoqueMinimo(dados.getEstoqueMinimo());
        produto.setCategoriaId(dados.getCategoriaId());
        return produtoRepository.save(produto);
    }

    public void excluir(Long id) {
        produtoRepository.deleteById(id);
    }

    public double calcularValorTotalEmEstoque() {
        // BUG: soma usando "float"/double para dinheiro em vez de BigDecimal,
        // o que pode gerar erros de arredondamento em relatorios financeiros.
        double total = 0;
        for (Produto p : produtoRepository.findAll()) {
            total += p.getPrecoUnitario() * p.getQuantidadeEstoque();
        }
        return total;
    }

    public List<Produto> listarComEstoqueBaixo() {
        // BUG: usa "<" em vez de "<=". Um produto com quantidadeEstoque exatamente
        // igual ao estoqueMinimo nao aparece no alerta, mesmo estando no limite.
        return produtoRepository.findAll().stream()
                .filter(p -> p.getQuantidadeEstoque() < p.getEstoqueMinimo())
                .toList();
    }
}
