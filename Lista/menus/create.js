// Para criar Um menu de tarefas

import {log, text, isCancel} from "@clack/prompts"

// importando de outros documwntos
import {taskManeger} from "../maneger/tasks.js"; 
import { mainMenu } from "./main.js";

export async function createTaskMenu(){
    let name;

    do {
        name = await text ({
            message: "Digite o nome da tarefa:"
        })
        if( taskManeger.tasks.has(name)){ // verificando se dentro das tasks já tem o name
            log.error("Já existe uma tarefa com esse nome, tente novamente!"); // se já existir, exibe essa mensagem
        }
    } while(taskManeger.tasks.has(name)); // enquanto existir uma task com esse nome, continue pedindo o nome
    
    if(isCancel(name)){ // is Cancel quando o user aperta control c dentro do terminal
        mainMenu() // chamando o menu principal
        return;
    }

    const task = { //short Sintaxe
        name, // é a mesma coisa de dizer que name= name, mas como as duas tem o mesmo nome, é so usar a sortSintaxe que resume
        status : "Em Andamento", 
        createdAt: new Date().toISOString() // Para receber a data atual e salvar a data em um obj jason
    }

    taskManeger.create(task) // Para criar uma nova task

    log.success("Tarefa criada com sucesso!"); // exibe uma mensagem de sucesso
    setTimeout(() => mainMenu() , 1000) // depois de um segundo. leva o usuaria de volta para a função principal
}