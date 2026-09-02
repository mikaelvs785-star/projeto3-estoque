package com.senac.estoque.config;

import com.senac.estoque.model.Categoria;
import com.senac.estoque.model.Produto;
import com.senac.estoque.repository.CategoriaRepository;
import com.senac.estoque.repository.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final CategoriaRepository categoriaRepository;
    private final ProdutoRepository produtoRepository;

    public DataLoader(CategoriaRepository categoriaRepository, ProdutoRepository produtoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.produtoRepository = produtoRepository;
    }

    @Override
    public void run(String... args) {
        if (categoriaRepository.count() == 0) {
            Categoria c1 = categoriaRepository.save(new Categoria(null, "Informatica"));
            Categoria c2 = categoriaRepository.save(new Categoria(null, "Papelaria"));

            Produto p1 = new Produto();
            p1.setNome("Mouse sem fio");
            p1.setDescricao("Mouse otico USB");
            p1.setPrecoUnitario(45.90);
            p1.setQuantidadeEstoque(20);
            p1.setEstoqueMinimo(5);
            p1.setCategoriaId(c1.getId());
            produtoRepository.save(p1);

            Produto p2 = new Produto();
            p2.setNome("Caderno universitario");
            p2.setDescricao("200 folhas");
            p2.setPrecoUnitario(18.50);
            p2.setQuantidadeEstoque(4);
            p2.setEstoqueMinimo(10);
            p2.setCategoriaId(c2.getId());
            produtoRepository.save(p2);

            Produto p3 = new Produto();
            p3.setNome("Teclado mecanico");
            p3.setDescricao("ABNT2 RGB");
            p3.setPrecoUnitario(199.90);
            p3.setQuantidadeEstoque(8);
            p3.setEstoqueMinimo(8);
            p3.setCategoriaId(c1.getId());
            produtoRepository.save(p3);
        }
    }
}
