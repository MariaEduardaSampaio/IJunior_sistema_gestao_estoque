/*
 - responsável pelas funções principais do programa
 - basicamente todas as histórias de usuário 
 */

const filePath = './model/estoque.csv';
import { EstoqueItem, readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';

import {
    adicionarItemExceptions, removerItemExceptions, listarItensExceptions,
    valorTotalExceptions, pesoTotalExceptions, quantidadeItensExceptions,
    mediaValorExceptions, mediaPesoExceptions, quantidadeProdutosExceptions
} from '../service/serviceEstoque';

function adicionarItem() {
    console.log('Adicionar um item ao inventário:\n');

    try {
        adicionarItemExceptions();
        console.log('Item adicionado com sucesso ao inventário.\n');
    } catch (error) {
        console.error('Ocorreu um erro ao adicionar o item:', error);
    }
}

function removerItem() {
    console.log('Remover um item do inventário:\n');

    try {
        console.log('Qual o nome do item que deseja remover?\n');
        removerItemExceptions();
    } catch (error) {
        console.error('Ocorreu um erro ao remover o item:', error);
    }
}

function listarItens() {
    try {
        listarItensExceptions();
    } catch (error) {
        console.error('Ocorreu um erro ao listar os itens:', error);
    }
}

function valorTotal() {

    try {
        const somaTotal = valorTotalExceptions();
        console.log('Valor total do inventário: R$', somaTotal);
    } catch (error) {
        console.error('Ocorreu um erro ao calcular o valor total:', error);
    }

}

function pesoTotal() {
    try {
        const pesoTotal = pesoTotalExceptions();
        console.log('Peso total do inventário: ' + pesoTotal + ' Kg');
    } catch (error) {
        console.error('Ocorreu um erro ao calcular o peso total:', error);
    }

    return pesoTotal;
}

function quantidadeItens() {

    try {
        const qntdTotal = quantidadeItensExceptions();
        console.log('Quantidade total de itens: ' + qntdTotal + ' unid.');
    } catch (error) {
        console.error('Ocorreu um erro ao calcular a quantidade total de itens:', error);
    }
}

const mediaValor = async (): Promise<number> => {
    try {
        const media = await mediaValorExceptions();
        console.log('Média de valor dos itens: R$', media.toFixed(2));
        return media;
    } catch (error) {
        console.error('Ocorreu um erro ao calcular a média de valor dos itens:', error)
        return -1;
    }
};

const mediaPeso = async (): Promise<number> => {
    try {
        const mediaPeso = await mediaPesoExceptions();
        console.log('Média de peso dos itens: ' + mediaPeso.toFixed(2) + 'kg');
        return mediaPeso;
    } catch (error) {
        console.error('Ocorreu um erro ao calcular a média de peso dos itens:', error);
        return -1;
    }
}

function quantidadeProdutos() {
    try {
        const produtos = quantidadeProdutosExceptions();
        console.log("Quantidade total de produtos no inventário: ", produtos);

    } catch (error) {
        console.error('Ocorreu um erro ao calcular a quantidade total de produtos:', error);
    }
}

export {
    adicionarItem, removerItem, listarItens, valorTotal, pesoTotal,
    mediaValor, mediaPeso, quantidadeItens, quantidadeProdutos
};