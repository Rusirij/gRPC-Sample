// server.js
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "service.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).example;

function sayHello(call, callback) {
  callback(null, { message: `Hello ${call.request.name}` });
}

function main() {
  const server = new grpc.Server();
  server.addService(proto.Greeter.service, { sayHello: sayHello });
  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Server running at http://127.0.0.1:${port}`);
      server.start();
    }
  );
}

main();
