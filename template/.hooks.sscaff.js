const {execSync} = require('child_process');
const {readFileSync} = require('fs');

exports.post = ctx => {
  // Terraform Cloud configuration settings if the organization name and workspace is set.
  if (ctx.OrganizationName == '') {
    throw new Error("Terraform Cloud organisation name is required.");
  }

  console.log(`\nGenerating Terraform Cloud configuration for '${ctx.OrganizationName}' organization and '${ctx.WorkspaceName}' workspace.....`)

  const npm_cdktf = ctx.npm_cdktf;
  if (!npm_cdktf) {
    throw new Error(`missing context "npm_cdktf"`);
  }

  installDeps([npm_cdktf, `constructs@10`, ' @cdktf/provider-aws']);
  installDeps(['@types/node', 'typescript', 'jest', '@types/jest', "ts-jest", "ts-node"], true);

  console.log(readFileSync('./help', 'utf-8'));
  console.log(`                                                                                                                        
                                                                                                                        
         &&&&&&&&&&&%                                                                                                   
     .&&&&&&&&&&&&&&&&&&                                                                                                
    &&&&&&&&&&&&    %&&&&&         &&(                                                                                  
   &&&&&&&&&&&&/     &&&&&&        &&(                       &&                                                         
  &&&&&&     .&&&&%&&&&&&&&%       &&#&&&&&&&   .&&&&&&&&  &&&&&&& ,&&&&&&&&&.  *&&&&&% %&&&&&&&   &&&%&&&/  &&&%&&&    
  &&&&&&   , #&&&&&&&&&&&&&&       &&&     ,&& *&&     ,&&   &&    ,&&      &&* *&&    &&%#####&&  &&&#*    .&&&(,      
   &&&&&&&&&&&&/     &&&&&&        &&&     *&& *&&     /&&   &&    ,&&      &&* *&&    &&(              #&&       &&%   
    &&&&&&&&&&&%    ,&&&&&         &&(&&&&&&%    &&&&&&&#    #&&&& ,&&%&&&&&&   *&&     /&&&&&&&   #&&&&&&#  &&&&&&&    
     #&&&&&&&&&&&&&&&&&&,                                          ,&&                                                  
        (&&&&&&&&&&&&/                                             .((                                                  
                                                                                                                        
                                                                                                                        `)
};

function installDeps(deps, isDev) {
  const devDep = isDev ? '-D' : '';
  // make sure we're installing dev dependencies as well
  const env = Object.assign({}, process.env)
  env['NODE_ENV'] = 'development'

  execSync(`yarn add ${devDep} ${deps.join(' ')}`, {stdio: 'inherit', env});
}
