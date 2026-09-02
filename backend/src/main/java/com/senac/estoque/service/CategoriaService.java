package com.senac.estoque.service;

import com.senac.estoque.model.Categoria;
import com.senac.estoque.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    public Categoria salvar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public void excluir(Long id) {
        // BUG: nao verifica se existem produtos usando essa categoria antes de excluir.
        // Produtos ficam com categoriaId apontando pra uma categoria que nao existe mais.
        categoriaRepository.deleteById(id);
    }
}
