    package com.senac.estoque.service;

    import com.senac.estoque.model.Movimentacao;
    import com.senac.estoque.model.Produto;
    import com.senac.estoque.model.TipoMovimentacao;
    import com.senac.estoque.repository.MovimentacaoRepository;
    import com.senac.estoque.repository.ProdutoRepository;
    import org.springframework.stereotype.Service;

    import java.time.LocalDateTime;
    import java.util.List;

    @Service
    public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;
    private final ProdutoRepository produtoRepository;

    public MovimentacaoService(MovimentacaoRepository movimentacaoRepository, ProdutoRepository produtoRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
        this.produtoRepository = produtoRepository;
    }

    public List<Movimentacao> listarTodas() {
        return movimentacaoRepository.findAll();
    }

    public Movimentacao registrar(Movimentacao mov) {
    mov.setData(LocalDateTime.now());

    Produto produto = produtoRepository.findById(mov.getProdutoId())
            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

    if (mov.getQuantidade() == null || mov.getQuantidade() <= 0) {
        throw new RuntimeException("A quantidade deve ser maior que zero");
    }

    if (mov.getTipo() == TipoMovimentacao.SAIDA) {

        if (produto.getQuantidadeEstoque() < mov.getQuantidade()) {
            throw new RuntimeException("Estoque insuficiente para realizar a saída");
        }

        produto.setQuantidadeEstoque(
                produto.getQuantidadeEstoque() - mov.getQuantidade()
        );

    } else if (mov.getTipo() == TipoMovimentacao.ENTRADA) {

        produto.setQuantidadeEstoque(
                produto.getQuantidadeEstoque() + mov.getQuantidade()
        );

    } else {
        throw new RuntimeException("Tipo de movimentação inválido");
    }

    produtoRepository.save(produto);

    return movimentacaoRepository.save(mov);
    }
 }
