const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();
var path = require("path");

const config = {
    user: "deploy@pohodnik.tk",                   // NOTE that this was username in 1.x
    //password: "password",           // optional, prompted if none given
    host: "ftp.fednik.ru",
    port: 21,
    localRoot: path.join(__dirname, '../dist/'),
    remoteRoot: 'new/',///home/thdwdvqs/public_html/pohodnik.tk/
    // include: ['*', '**/*'],      // this would upload everything except dot files
    include: ['*'],
    //exclude: ['dist/**/*.map'],     // e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
    deleteRemote: true,              // delete ALL existing files at destination before uploading, if true
    forcePasv: true                 // Passive mode is forced (EPSV command is not sent)
}

// use with promises
ftpDeploy.deploy(config)
    .then(res => console.log('finished:', res))
    .catch(err => console.log(err))

ftpDeploy.on('uploading', function(data) {
    console.log('Transfer ', data.transferredFileCount, ' from ', data.totalFilesCount, ' current ', data.filename)

});
ftpDeploy.on('uploaded', function(data) {
    console.log(data);         // same data as uploading event
});
ftpDeploy.on('log', function(data) {
    console.log(data);         // same data as uploading event
});

ftpDeploy.on('upload-error', function (data) {
    console.log(data.err); // data will also include filename, relativePath, and other goodies
});