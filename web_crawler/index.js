function main(baseURL) {
  //
}

const args = process.argv.slice(2); // First two arguments are node and the script name

if(args.length < 1){
    console.log("invalid syntax!")
    console.log("npm run start YOUR_URL")
}

const baseURL = args[0]; // The first argument after 'npm run start'

main(baseURL);
