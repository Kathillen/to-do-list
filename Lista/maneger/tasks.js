// GERENCIADOR DE TAREFAS

import {existsSync, readFileSync, writeFileSync } from "fs";
// exsitSync é uma função do fs que verifica se um arquivo existe
import path from "node:path";
import chalk from "chalk";
import { readFile } from "node:fs";


const filePath = path.join("./tasks.json"); // caminho do arquivo tasks.json

if(!existsSync(filePath)){ // se o arquivo não existir
    writeFileSync(filePath, JSON.stringify([]), "utf-8"); // cria o arquivo e escreve um array vazio
}

const data = readFileSync(filePath, { encoding: "utf-8" }); // lê o arquivo tasks.json
const parsed = JSON.parse(data);// Para tranformar uma string em um obj

const tasks = new Map(parsed.map(task =>[task.name, task ])); // tranfromar cada item do array em uma 
// criou um map onde a chave é o nome da task e o valor é ela mesma
// o primeiro item da tupla é o task.name e o segundo item é a task inteira

export const taskManeger = {
    tasks,
    save(){
        const data = this.toArray() ; // desse jeito pega todos os items do map de tasks e vai tranfrormar em um array e salvar dentro da variavel data
        writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8"); // tranforma o array em uma string e escreve no arquivo tasks.json
    },
    create(task){
        tasks.set(task.name, task)// aqwui é o map de tasks
        this.save()
    },
    // criando dois métodos utilitários
    toArray(){ // vai servir para tranfromar o map em um array
        return Array.from(this.tasks.values()); // esse método só vai criar um novo array
    },
    colorStatus(status){ // definir uma cor dependendo do status da task
        switch(status){
            case "em andamento": {
                return chalk.bgHex("#e1722cff")(`${status}`)// se o status for em andamento, vai retornar a cor amarela
            }
            case "concluída": {
                return chalk.bgGreen(`${status}`)// se o status for em andamento, vai retornar a cor amarela
            }
            case "cancelada":{
                return chalk.bgRed(`${status}`)
            }
            default:{
                return chalk.bgWhite(`${status}`) // se não for nenhum dos outros, vai retornar a cor branca
            }
        }
    }
}