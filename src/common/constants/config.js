const domain = 'ballerprofile.herokuapp.com';
const handlerDomain = 'ballerprofileapihandler.herokuapp.com';
const port = undefined;
const protocol = 'https://';

const handlerServerUrl = `${protocol}${handlerDomain}`;
const serverUrl = `${protocol}${domain}${port ? `:${port}` : ''}`;

export { domain };
export { handlerServerUrl };
export { port };
export { protocol };
export { serverUrl };
