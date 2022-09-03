package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://demouser:mypassword@localhost:27016/demo?replicaSet=rs&directConnection=true"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	database := client.Database("demo")
	stockCollection := database.Collection("stock")

	stockStream, err := stockCollection.Watch(context.TODO(), mongo.Pipeline{})
	if err != nil {
		panic(err)
	}
	defer stockStream.Close(context.TODO())

	for stockStream.Next(context.TODO()) {
		var data bson.M
		if err := stockStream.Decode(&data); err != nil {
			panic(err)
		}
		fmt.Printf("%v\n", data)
	}
}
