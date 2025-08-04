import { taskManeger } from '../maneger/tasks.js';
import {log, select, isCancel, text} from "@clack/prompts";
import { listTasksMenu } from './list.js';
import chalk from "chalk"; 

export async function  updateTaskMenu(taskName){ // essa função recebe com argumento o nome das tasks
    const task = taskManeger.tasks.get(taskName); // acessa o map "tasks" e pega a task com o nome que foi passado como argumento

    const formatedDate = new Date(task.createdAt).toLocaleString(); // para ter a data formatada e poder ser exibida
    const status = taskManeger.colorStatus(task.status);

    log.info([
        `Tarefa: ${task.name}`,
        `Status: ${status}`,
        `Criada em: ${chalk.bgGrey(formatedDate)}`
    ].join("\n")) // join para exibir os intens do array com uma quebra de linha
    const selected  = await select({
        message: "selecione o que deseja fazer:",
        options: [
            {label: "ALterar name", value:"name"},
            {label: "ALterar status", value:"status"},
            {label: "Deletar", value:"delete"},
            {label: "Voltar", value:"back"},
        ]
    }) 
    if(isCancel(selected)){
        listTaskMenu();
        return;
    }

    switch(selected){
        case"delete":{
            taskManeger.tasks.delete(taskName); // deleta a task do map
            taskManeger.save()
        }
        case"back":{
            listTasksMenu(); // volta para o menu de listar tarefas
            return;
        }
        case "name":{
            const oldTaskName = task.name; // criado no inicioo d código

            const newTaskName = await text ({
                message: "Digite o novo nome da tarefa:",
                validate(input){ // para validar oque o usuario esta digitando sem que ele precise clicar em enter
                    if(taskManeger.tasks.has(input)){
                        return "Já existe uma tarefa com esse nome, tente novamente!";
                    }
                }
            });
            if(isCancel(newTaskName)){
                updateTaskMenu(oldTaskName); // se  o usuario cancelar, ira voltar para o  nome antigo e as alterações do name não serão salvas
                return;
            }
            taskManeger.tasks.delete(oldTaskName); // deleta a task antiga
            const updatedTask = { ...task, name: newTaskName} // 
            taskManeger.tasks.set(newTaskName, updatedTask); // adiciona a task atualizada com o novo nome
            taskManeger.save(); 
            updateTaskMenu(newTaskName); // chama a função novamente para atualizar o menu com o novo nome
            return;
        }
        case "status":{
            const taskStatus = [
                "em andamento",
                "concluída",
                "cancelada" 
            ]
            const options = taskStatus
            .filter(status => status !== task.status)  // para filtrar todos os status que são diferentes do status que já está na task
            .map(status => ({ label: status, value: status})) // para cad um dos status será criado uma opção para o prmpt de select
            
            const status = await select({
                message: "Selecione o novo status da tarefa:",
                options // isto é uma short sintaxe, já que ja existe as opçoes em forma de variavel, é so passar elas aqui pra dentro
            })
            if(isCancel(status)){
                updateTaskMenu(taskName);
            return;
            }
            taskManeger.tasks.set(taskName, {...task, status}) // um espalhamento de tudo que já tem no map de task, atualizando apenas o status
            taskManeger.save(); // salva as alterações no arquivo tasks.json
            updateTaskMenu(taskName); // chama a função novamente para atualizar o menu com o novo status
            return;
        
        }
    }
}