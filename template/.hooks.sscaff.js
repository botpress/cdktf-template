const {execSync} = require('child_process');
const {readFileSync, writeFileSync} = require('fs');

exports.post = async ctx => {
  if (ctx.OrganizationName == '') {
    throw new Error("Terraform Cloud organisation name is required.");
  }

  console.log(`\nGenerating Terraform Cloud configuration for '${ctx.OrganizationName}' organization and '${ctx.WorkspaceName}' workspace.....`)

  const npm_cdktf = ctx.npm_cdktf;
  if (!npm_cdktf) {
    throw new Error(`missing context "npm_cdktf"`);
  }

  const cc = await getInput('Cost center (required)', true)
  templateFile('./internal/aws/stack.ts', /{{CostCenter}}/g, cc);

  const r = await getInput('Region (default: us-east-1)', false)
  templateFile('./internal/aws/stack.ts', /{{Region}}/g, r || 'us-east-1');

  installDeps([npm_cdktf, `constructs@10`, ' @cdktf/provider-aws']);
  installDeps(['@types/node', 'typescript', 'jest', '@types/jest', "ts-jest", "ts-node"], true);

  console.log(readFileSync('./help', 'utf-8'));
};

function installDeps(deps, isDev) {
  const devDep = isDev ? '-D' : '';
  const env = Object.assign({}, process.env)
  env['NODE_ENV'] = 'development'

  execSync(`yarn add ${devDep} ${deps.join(' ')}`, {stdio: 'inherit', env});
}

async function getInput(name, required) {
  console.log('\n');
  let v = '';

  v = await waitForInput(`${name}: `);

  if (required && v === '') {
    console.error(`${name} is required.`)
    return getInput(name, required);
  }

  return v;
}

function waitForInput(query) {
  return new Promise(resolve => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(query, ans => {
      readline.close();
      resolve(ans.trim());
    })
  })
}

function templateFile(path, searchValue, replaceValue) {
  const template = readFileSync(path, 'utf-8');

  const result = template.replace(searchValue, replaceValue);

  writeFileSync(path, result, 'utf-8');
}
