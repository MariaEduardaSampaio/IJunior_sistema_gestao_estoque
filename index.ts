import { readCSV } from './model/readCSV';
import { writeCSV } from './model/writeCSV';
import { adicionarItem } from './controller/controleEstoque';

const main = async () => {
    try {
        const data = await readCSV('./model/estoque.csv');
        console.log('Dados lidos do CSV:', data);

        adicionarItem();

        // Modificar os dados se necessário

        // Escrever os dados no CSV
        // await writeCSV('./model/estoque.csv', data);
        // console.log('Dados escritos no CSV com sucesso.');
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
};

main();
