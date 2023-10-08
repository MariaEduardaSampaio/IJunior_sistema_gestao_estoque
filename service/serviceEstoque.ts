import { readCSV } from "../model/readCSV";
import { writeCSV } from "../model/writeCSV";
import { EstoqueItem } from '../model/data.interface';
import { rl, question } from '../index';
const filePath = './model/estoque.csv';

function isFloat(value: any): boolean {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) !== value;
}
class estoqueService {
    async criarProduto(novoProduto: EstoqueItem) {
        const produtos = await readCSV(filePath);
        if (produtos.find(item => item.nome.toUpperCase() === novoProduto.nome.toUpperCase()
            && item.id === novoProduto.id)) {
            throw new Error('Já existe um item com esse nome e ID no inventário.');
        }

        if (novoProduto.nome === '' || typeof (novoProduto.nome) !== 'string') {
            throw new Error('Nome deve ser preenchido com uma string. Tente novamente.');
        }

        if (novoProduto.peso <= 0.0 || isFloat(novoProduto.peso) == false) {
            throw new Error('Peso menor que zero ou não decimal. Tente novamente.');
        }

        if (novoProduto.valor <= 0.0 || isFloat(novoProduto.valor) == false) {
            throw new Error('Preço menor que zero ou não decimal. Tente novamente.');
        }

        if (novoProduto.quantidade <= 0) {
            throw new Error('Quantidade menor que zero. Tente novamente.');
        }

        produtos.push(novoProduto);
        await writeCSV(produtos);
    }

    async removerProduto(id: number) {
        var produtos = await readCSV(filePath);

        const itemEncontrado = produtos.find(item => item.id === id);

        if (!itemEncontrado)
            throw new Error('Não existe um item com esse ID no inventário.');

        if (itemEncontrado.ativo.toString() == "false")
            throw new Error('Este item já está desativado no iventário.');

        console.log("Item encontrado: ", itemEncontrado);

        console.log("Realmente deseja excluí-lo? (S/N)\n");
        const opcao = await question('Opção: ');

        if (opcao.toUpperCase() == "N")
            console.log('Operação cancelada.\n');
        else if (opcao.toUpperCase() == "S") {
            produtos.forEach(item => {
                if (item.id === id)
                    item.ativo = false;
            });
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