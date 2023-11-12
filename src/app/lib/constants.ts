export const DEFAULT_AVSC_SCHEMA = JSON.stringify(
  {
    type: "record",
    name: "User",
    namespace: "com.example",
    fields: [
      {
        name: "id",
        type: "string",
      },
      {
        name: "name",
        type: "string",
      },
      {
        name: "email",
        type: "string",
      },
    ],
  },
  null,
  2
)

export const DEFAULT_AVDL_SCHEMA = `@namespace("com.example")
  
protocol UserProtocol {
  record User {
    string id;
    string name;
    string email;
  }
}`

export const DEFAULT_JSON =
  '{\n  "id": "123",\n  "name": "Homer Simpson",\n  "email": "homer@aol.com"\n}'
