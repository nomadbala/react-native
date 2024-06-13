import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { Task } from "../components/Task";
import uuid from "react-native-uuid";

const todoMock: Task[] = [
  {
    id: uuid.v4.toString(),
    title: "Go to the cinema",
    status: false,
    due: null,
    comment: null,
  },
];

export default function AddTask() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [title, setTitle] = React.useState<string>("");

  const addTodo = async () => {
    if (title.trim().length > 0) {
      const newTodo: Task = {
        id: uuid.v4(),
        title: title,
        status: false,
        due: null,
        comment: null,
      };
      setTasks([...tasks, newTodo]);
      console.log("qwe");
      setTitle("");
    }
  };

  return (
    <View>
      <Text>Title</Text>
      <TextInput
        onChangeText={(title) => setTitle(title)}
        value={title}
        style={{ borderWidth: 1, height: 60 }}
      />
      <Pressable onPress={addTodo}>
        <Text>Создать таску</Text>
      </Pressable>
    </View>
  );
}
