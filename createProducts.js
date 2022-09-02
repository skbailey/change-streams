conn = new Mongo("mongodb://localhost:27016/demo?replicaSet=rs&directConnection=true");
demo = conn.getDB("demo")
demo.auth("demouser", "mypassword");
collection = demo.stock;

var docToInsert = {
  name: "pineapple",
  quantity: 10
};

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}

function create() {
  sleepFor(1000);
  print("inserting doc...");
  docToInsert.quantity = 10 + Math.floor(Math.random() * 10);
  res = collection.insert(docToInsert);
  print(res)
}

while (true) {
  create();
}
