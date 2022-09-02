conn = new Mongo("mongodb://localhost:27016/demo?replicaSet=rs&directConnection=true");
demo = conn.getDB("demo")
demo.auth("demouser", "mypassword");
collection = demo.stock;

const changeStreamCursor = collection.watch(
   [],
   { fullDocumentBeforeChange: "whenAvailable" }
);

pollStream(changeStreamCursor);

//this function polls a change stream and prints out each change as it comes in
function pollStream(cursor) {
  while (!cursor.isClosed()) {
    if (cursor.hasNext()) {
      change = cursor.next();
      print(JSON.stringify(change));
    }
  }
  pollStream(cursor);
}
