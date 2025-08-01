import {intro} from "@clack/prompts" 
import chalk from "chalk"; 
import { mainMenu } from "./menus/main.js";

// Para diciomar cores as coisas no terminal
//chalk e clak são libs
// foi importado a função intro da lib clack/prompts
// e a lib chalk para colorir o terminal

const log = console.log;


intro(`📃 ${chalk.bgGreen(" Lista de Tarefas")}`) // essa função vai dar um console.log inicial para começar o programa

mainMenu();


