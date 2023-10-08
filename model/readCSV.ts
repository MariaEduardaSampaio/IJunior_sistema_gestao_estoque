import csv from 'csv-parser';
import fs from 'fs';
import { EstoqueItem } from '../model/data.interface';

const filePath = './model/estoque.csv';

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