const fs   = require('fs')
const zlib = require('zlib')
const path = require('path')

const {
    name,
    version,
    outputPath,
    filename
} = require('./config')

async function install() {
    const extractDir = path.join(outputPath, name)
    
    const zipPath = path.join(outputPath, filename)

   /**
    if(fs.existsSync(extractDir)){
        return;
    }

    */
    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath)
    }
    
    const fileContents = fs.createReadStream('./files/grpcurl_linux_x86_64.gz')
    const writeStream = fs.createWriteStream(`${outputPath}/grpcurl`);
    const unzip = zlib.createGunzip();

    fileContents.pipe(unzip).pipe(writeStream);

}

install()
   .then(() => process.exit(0))
   .catch(ex => {
      console.dir(ex, {depth: 1})
      process.exit(1)
   });