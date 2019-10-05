import * as taskLib from 'azure-pipelines-task-lib/task';
import * as toolLib from 'azure-pipelines-tool-lib/tool';

import * as util from 'util';
const exec = util.promisify(require('node-windows').elevate);

async function execCommand(command: string) {
  console.log('command: ' + command);
  const { stdout, stderr }: { stdout: string|null, stderr: string|null } = await exec(command);
  if (stdout) {
    console.log('stdout: ' + stdout);
  }
  if (stderr) {
    console.log('stderr: ' + stderr);
  }
}


async function run() {
  try {
    let version = taskLib.getInput('WinAppDriverVersion', false);

    if (!version) {
      version = 'v1.1';
    }

    const downloadUrl = `https://github.com/microsoft/WinAppDriver/releases/download/${version}/WindowsApplicationDriver.msi`;

    console.log('Download WinAppDriver from ' + downloadUrl);
    const msiPath = await toolLib.downloadTool(downloadUrl);
    console.log('Downloaded File: ' + msiPath);
    
    const uninstallCommand = 'msiexec /uninstall {C4903086-429C-4455-86DD-044914BBA07B} /qn'
    await execCommand(uninstallCommand).catch(() => { });

    const installCommand = `msiexec /i ${msiPath} /qn`;
    await execCommand(installCommand);

    taskLib.setResult(taskLib.TaskResult.Succeeded, 'Install Complete')
  }
  catch (err) {
    taskLib.warning(err);
    taskLib.setResult(taskLib.TaskResult.Failed, err.message);
  }
}

run();