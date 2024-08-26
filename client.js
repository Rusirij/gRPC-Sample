// client.js
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "service.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).example;

function main() {
  const client = new proto.Greeter(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
  client.sayHello({ name: "World" }, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("Greeting:", response.message);
  });
}

main();
