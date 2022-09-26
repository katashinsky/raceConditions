const child_process = require('child_process');

const commands = [
  {
    name: 'App:3000',
    command: 'APP_PORT=3000 nodemon src/index.ts',
  },
  {
    name: 'App:3001',
    command: 'APP_PORT=3001 nodemon src/index.ts',
  },
];

function runCommand(command, name, callback) {
  let process = child_process.exec(command, function (error, stdout, stderr) {
    if (stderr) {
      callback(stderr, null);
    } else {
      callback(null, `Successfully executed ${name} ...`);
    }
  });

  process.stdout.on('data', (data) => {
    console.log(`${name}: ${data}`);
  });
}

function main() {
  commands.forEach((element) => {
    runCommand(element.command, element.name, (err, res) => {
      console.log('hhhhhh');
      if (err) {
        console.error(err);
      } else {
        console.log(res);
      }
    });
  });
}

main();
