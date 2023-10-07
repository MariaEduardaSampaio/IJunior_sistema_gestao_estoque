import csv from 'csv-parser';
import fs from 'fs';

const filePath = './model/estoque.csv';

interface EstoqueItem {
    nome: string;
    peso: number;
    valor: number;
    quantidade: number;
    ativo: boolean;
}

const readCSV = async (filePath: string): Promise<EstoqueItem[]> => {
    return new Promise((resolve, reject) => {
        const results: EstoqueItem[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: EstoqueItem) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error: any) => reject(error));
    });
};

export { EstoqueItem, readCSV };