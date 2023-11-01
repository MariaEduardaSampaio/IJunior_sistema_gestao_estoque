import { readCSV } from "../model/readCSV";
import { writeCSV } from "../model/writeCSV";
import { EstoqueItem } from '../model/data.interface';
import { question } from '../index';
const filePath = './model/estoque.csv';

function isFloat(value: any): boolean {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) !== value;
}
class estoqueService {
    async criarProduto(novoProduto: EstoqueItem) {
        const produtos = await readCSV(filePath);

        produtos.forEach(produto => {
            if (produto.ativo) {
                if (produto.nome.toUpperCase() == novoProduto.nome.toUpperCase() && novoProduto.nome)
                    throw new Error('Já existe um produto com esse nome no inventário.');
            }

            if (produto.id == novoProduto.id) {
                throw new Error('Já existe um produto com esse ID no inventário.');
            }
        });

        if (isNaN(novoProduto.id) || novoProduto.id == undefined) {
            throw new Error('ID deve ser preenchido com um número. Tente novamente.');
        }

        if (novoProduto.nome === '' || novoProduto.nome === undefined || typeof (novoProduto.nome) !== 'string') {
            throw new Error('Nome deve ser preenchido com uma string. Tente novamente.');
        }

        if (novoProduto.peso <= 0 || !isFloat(novoProduto.peso)) {
            throw new Error('Peso menor que zero ou não decimal. Tente novamente.');
        }

        if (novoProduto.valor <= 0 || !isFloat(novoProduto.valor)) {
            throw new Error('Preço menor que zero ou não decimal. Tente novamente.');
        }

        if (novoProduto.quantidade <= 0 || isNaN(novoProduto.quantidade)) {
            throw new Error('Quantidade menor que zero. Tente novamente.');
        }

        produtos.push(novoProduto);
        await writeCSV(produtos);
    }

    async removerProduto(id: number) {
        const produtos = await readCSV(filePath);

        const produtoEncontrado = produtos.find(produto => produto.id == id);

        if (!produtoEncontrado)
            throw new Error('Não existe um produto com esse ID no inventário.');

        if (!produtoEncontrado.ativo)
            throw new Error('Este produto já está desativado no iventário.');

        console.log("Produto encontrado: ", produtoEncontrado);

        console.log("Realmente deseja excluí-lo? (S/N)\n");
        const opcao = await question('Opção: ');

        if (opcao.toUpperCase() == "N")
            console.log('Operação cancelada.\n');
        else if (opcao.toUpperCase() == "S") {
            produtoEncontrado.ativo = false;
            await writeCSV(produtos);
        } else
            throw new Error('Opção inválida.');
    }

    async listarItens() {
        const produtos = await readCSV(filePath);
        produtos.forEach(item => {
            if (item.ativo.toString() === 'true') {
                console.log('\n\nitem ', produtos.indexOf(item) + 1);
                console.log('ID: ', item.id);
                console.log('nome: ', item.nome);
                console.log('peso: ', item.peso + ' Kg/unid');
                console.log('valor: R$', item.valor);
                console.log('quantidade: ', item.quantidade + ' unid.');
            }
        });
    }

    async calcularValorTotal() {
        const produtos = await readCSV(filePath);
        const somaTotal = produtos.reduce((acc, item) => {
            if (item.ativo.toString() === 'true') {
                acc += item.valor * item.quantidade;
            }
            return acc;
        }, 0);
        return somaTotal;
    }

    async calcularPesoTotal() {
        const produtos = await readCSV(filePath);
        const pesoTotal = produtos.reduce((acc, item) => {
            if (item.ativo.toString() === 'true') {
                acc += item.peso * item.quantidade;
            }
            return acc;
        }, 0);
        return pesoTotal;
    }

    async calcularQuantidadeItens() {
        const produtos = await readCSV(filePath);
        const qntdTotal = produtos.reduce((acc, item) => {
            if (item.ativo.toString() === 'true') {
                acc += parseInt(item.quantidade.toString());
            }
            return acc;
        }, 0);
        return qntdTotal;
    }

    async calcularMediaValor() {
        const somaTotal = await this.calcularValorTotal();
        const quantidadeTotal = await this.calcularQuantidadeItens();

        if (quantidadeTotal == 0)
            throw new Error('Não há itens no inventário.');

        const mediaValor = somaTotal / quantidadeTotal;
        return mediaValor;
    }

    async calcularMediaPeso() {
        const somaTotal = await this.calcularPesoTotal();
        const quantidadeTotal = await this.calcularQuantidadeItens();

        if (quantidadeTotal == 0)
            throw new Error('Não há itens no inventário.');

        const mediaPeso = somaTotal / quantidadeTotal;
        return mediaPeso;
    }

    async calcularQuantidadeProdutos() {
        const data = await readCSV(filePath);

        const qntdProdutos = data.reduce((acc, item) => {
            if (item.ativo.toString() === 'true') {
                acc++;
            }
            return acc;
        }, 0);

        return qntdProdutos;
    }
}

export default new estoqueService();