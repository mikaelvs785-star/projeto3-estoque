package com.senac.estoque.controller;

import com.senac.estoque.model.Movimentacao;
import com.senac.estoque.service.MovimentacaoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimentacoes")
@CrossOrigin(origins = "*")
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;

    public MovimentacaoController(MovimentacaoService movimentacaoService) {
        this.movimentacaoService = movimentacaoService;
    }

    @GetMapping
    public List<Movimentacao> listar() {
        return movimentacaoService.listarTodas();
    }

    @PostMapping
    public Movimentacao registrar(@RequestBody Movimentacao movimentacao) {
        return movimentacaoService.registrar(movimentacao);
    }
}
