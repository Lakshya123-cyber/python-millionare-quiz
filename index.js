#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a Python Millionaire? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right PLEASE...
`);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}. That's the correct answer!`,
    });
  } else {
    spinner.error({
      text: `💀💀💀 Game over, you lose you noob ${playerName}!`,
    });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n $ 1, 0 0 0 , 0 0 0`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(
      chalk.green(
        `Programming isn't about what you know; it's about making the command line look cool :)`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "How can one print a statement in Python?\n",
    choices: [
      'print "Hello World"',
      'print("Hello World")',
      "print(Hello World)",
      "print)Hello World(",
    ],
  });

  return handleAnswer(answers.question_1 === 'print("Hello World")');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "Python was released in the year\n",
    choices: [
      "February 20, 1991",
      "May 20, 1991",
      "November 12, 1993",
      "June 30, 2002",
    ],
  });

  return handleAnswer(answers.question_2 === "February 20, 1991");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "How many loops are there in python?\n",
    choices: ["4", "2", "10", "3"],
  });

  return handleAnswer(answers.question_3 === "2");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "How do we create a dictionary in Python?\n",
    choices: ["using ()", "using []", "using )(", "using {}"],
  });

  return handleAnswer(answers.question_4 === "using {}");
}

// async function question5() {
//   const answers = await inquirer.prompt({
//     name: "question_5",
//     type: "list",
//     message: "How can one print a statement in Python?\n",
//     choices: [
//       'print "Hello World"',
//       'print("Hello World")',
//       "print(Hello World)",
//       "print)Hello World(",
//     ],
//   });

//   return handleAnswer(answers.question_5 === 'print("Hello World")');
// }

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
// await question5();
winner();
