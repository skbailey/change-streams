db.createUser(
  {
    user: "demouser",
    pwd: "mypassword",
    roles: [ { role: "readWrite", db: "demo" } ]
  }
)
db.createCollection(
   "stock",
   { changeStreamPreAndPostImages: { enabled: true } }
)
