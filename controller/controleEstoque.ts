import { EstoqueItem } from '../model/readCSV';
import serviceEstoque from '../service/serviceEstoque';

export async function adicionarProduto(novoProduto: EstoqueItem) {
    try {
        await serviceEstoque.criarProduto(novoProduto);
        console.log('\nProduto adicionado com sucesso!');
    } catch (error) {
        console.error('\nOcorreu um erro ao adicionar o produto:', error);
    }
}

export async function removerProduto(id: number) {
    try {
        await serviceEstoque.removerProduto(id);
        console.log("\nProduto desativado com sucesso!\n");
    } catch (error) {
        console.error('\nOcorreu um erro ao remover o item:', error);
    }
}

export async function listarItens() {
    try {
        await serviceEstoque.listarItens();
    } catch (error) {
        console.error('\nOcorreu um erro ao listar os itens:', error);
    }
}

export async function calcularValorTotal() {
    try {
        const valorTotal = await serviceEstoque.calcularValorTotal();
        console.log("\nValor total do inventário: R$", valorTotal.toFixed(2));
    } catch (error) {
        console.error('\nOcorreu um erro ao calcular o valor total:', error);
    }
}

export async function calcularPesoTotal() {
    try {
        const pesoTotal = await serviceEstoque.calcularPesoTotal();
        console.log("\nPeso total do inventário: ", pesoTotal.toFixed(2), "Kg");
    } catch (error) {
        console.error("\nOcorreu um erro ao calcular o peso total:", error);
    }
}

export async function calcularQuantidadeItens() {
    try {
        const qntdItens = await serviceEstoque.calcularQuantidadeItens();
        console.log('\nQuantidade total de itens: ' + qntdItens + ' unid.');
    } catch (error) {
        console.error('\nOcorreu um erro ao calcular a quantidade total de itens:', error);
    }
}

export async function calcularMediaValor() {
    try {
        const mediaValor = await serviceEstoque.calcularMediaValor();
        console.log("\nMédia de valor dos itens: R$", mediaValor.toFixed(2));
    } catch (error) {
        console.error("\nOcorreu um erro ao calcular a média de valor:", error);
    }
}

export async function calcularMediaPeso() {
    try {
        const mediaPeso = await serviceEstoque.calcularMediaPeso();
        console.log('\nMédia de peso dos itens: ' + mediaPeso.toFixed(2) + 'kg');
    } catch (error) {
        console.error('\nOcorreu um erro ao calcular a média de peso:', error);
    }

}

export async function calcularQuantidadeProdutos() {
    try {
        const qntdProdutos = await serviceEstoque.calcularQuantidadeProdutos();
        console.log('\nQuantidade total de produtos no inventário: ', qntdProdutos);
    } catch (error) {
        console.error('\nOcorreu um erro ao calcular a quantidade total de produtos: ', error);
    }
}