# HapiCROW Demo API

Start Base-App: `nx serve base-app`
Start User-Gateway: `nx serve user-gateway`
Start Developer-Gateway: `nx serve dev-gateway`
Swagger endpoint: `http://localhost:3333/api-docs`
Sample request with Json mask selection: `http://localhost:3333/api/todo/find-todos?fields=Id,Title,DateCreated`
Sample request without Json mask selection: `http://localhost:3333/api/todo/find-todos`

[Click to view Json mask Docs](https://github.com/nemtsov/json-mask)

**NOTE**: Check folder `http-tests` for sample requests. For the demo requests in `http-tests` to work you must install `rest-client` vscode extension
