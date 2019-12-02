# aws-lambda-examples

Example starter projects for AWS lambda.

Each folder contains a single function example of a Greetings API
- [Go 1.x Basic](go1x/README.md)
- [Go 1.x Echo API](go1x-echo/README.md)
- [Node 12.x Basic](node12x/README.md)
- [Node 12.x Express](node12x-express/README.md)
- [Python 3.8 Basic](python38/README.md)
- [Python 3.8 Flask](python38-flask/README.md)

## Getting Started

Each project can be initialized (download dependencies, etc.) with `make init`. If done at the root this will initialize all the projects.

## Build & Run

To build an run any function example, in its root use `make run` to run the function in a local lambda docker container.

## Packaging

To package any function example, use `make package` in its root.
