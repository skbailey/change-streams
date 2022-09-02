# Mongo Change Streams

1. Create a [keyfile](https://www.mongodb.com/docs/v5.3/tutorial/enforce-keyfile-access-control-in-existing-replica-set/#enforce-keyfile-access-control-on-existing-replica-set)
With keyfile authentication, each mongod instances in the replica set uses the contents of the keyfile as the shared password for authenticating other members in the deployment. Only mongod instances with the correct keyfile can join the replica set
```bash
openssl rand -base64 756 > <path-to-keyfile>
chmod 400 <path-to-keyfile>
```

2. Create a [mongo replica set](https://www.mongodb.com/blog/post/an-introduction-to-change-streams)
```bash
# Run the mongod command with the --replSet and --keyFile flags
mongod --keyFile <path-to-keyfile> --replSet <replicaSetName>
```

3. Authenticate as administrator
```bash
mongosh --port 27016 -u adminuser -p mypassword --authenticationDatabase admin
```

4. Initialize the replica set
```bash
mongosh --port 27017
> rs.initiate()
```
