import {isCancel, outro, select}  from "@clack/prompts";

// importanto de outro documento

import { createTaskMenu } from "./create.js";
import { listTasksMenu } from "./list.js";

export async function mainMenu(){
    const option = await select({
        message: "Escolha oque deseja fazer",
        options: [
            {value: "create", label: "Criar Tarefa"},  // o labeç é oque vai ser exibido na mensagem e o value é o que vai valer no código
            {value: "list", label: "Listar Tarefas"},
            {value: "exit", label: "Sair"}
        ]
    })
    if(isCancel(option)) return; // se essa oção for igual á cancelamento, retornar ao cod
    
    switch(option){
        case "create":{
            console.log("Criar Tarefa");
            createTaskMenu();
            return;
        }
        case "list":{
            console.log("Listar Tarefas");
            listTasksMenu()
            return;
        }
        default:{
            outro("Acaba por aqui"); // função do clack prompts
        }
    }
}