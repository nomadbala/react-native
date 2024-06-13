import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";

import uuid from "react-native-uuid";

import { Task, TaskItem } from "../components/Task";

const [tasks, setTasks] = useState<Task[]>([]);

export function Tasks() {
  const [text, setText] = useState("");

  return (
    <SafeAreaView>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
    </SafeAreaView>
  );
}

export function AddTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const addTodo = () => {
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
      <Pressable onPress={() => addTodo}>
        <Text>Создать таску</Text>
      </Pressable>
    </View>
  );
}
