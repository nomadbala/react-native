import { StatusBar } from "expo-status-bar";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
  TextInput,
  Modal,
} from "react-native";
import { CheckBox, Button } from "@rneui/themed";
import React, { useRef, useState } from "react";

interface Todo {
  id: number;
  title: string;
  status: boolean;
  due: string | null;
  comment: string | null;
}

const todoMock: Todo[] = [
  {
    id: 1,
    title: "Go to the cinema",
    status: false,
    due: "2024-06-24",
    comment: null,
  },
  {
    id: 2,
    title: "Go to the park",
    status: true,
    due: "2024-06-10",
    comment: null,
  },
  {
    id: 3,
    title: "Wake up",
    status: true,
    due: null,
    comment: "I'm wanna live!",
  },
  {
    id: 4,
    title: "Dinner",
    status: true,
    due: null,
    comment: null,
  },
];

const AnimatedComponent = () => {
  const fontSize = useRef(new Animated.Value(10)).current;

  const changeAnimation = () => {
    Animated.timing(fontSize, {
      toValue: 40,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View>
      <Animated.Text style={{ fontSize: fontSize }}>Anime ^.^</Animated.Text>
      <Button title="Start animation" onPress={changeAnimation} />
    </View>
  );
};

export default function App() {
  const [todos, setTodos] = useState(todoMock);
  const [text, setText] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");

  const toggleCheckbox = (id: number) => {
    setTodos((todoList) =>
      todoList.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const addTodo = () => {
    if (text.trim().length > 0) {
      const newTodo = {
        id: todos.length + 1,
        title: text,
        status: false,
        due: null,
        comment: null,
      };
      setTodos([...todos, newTodo]);
      setText("");
    }
  };

  const startEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.title);
  };

  const saveEdit = () => {
    if (editingTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, title: editText } : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditText("");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.list}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTodo}
          placeholder="Add a new todo..."
        />
        <FlatList
          style={styles.list}
          data={todos}
          renderItem={({ item }) => (
            <View style={styles.rowView}>
              <CheckBox
                checked={item.status}
                onPress={() => toggleCheckbox(item.id)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="coral"
              />
              <Text
                style={
                  item.status ? [styles.checked, styles.todo] : styles.todo
                }
              >
                {item.title}
              </Text>
              <Button
                title="Edit"
                onPress={() => startEdit(item)}
                style={styles.editButton}
              />
            </View>
          )}
        />
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={!!editingTodo}
        onRequestClose={cancelEdit}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={saveEdit} />
              <Button title="Cancel" onPress={cancelEdit} />
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 5,
  },
  input: {
    padding: 20,
    backgroundColor: "lightgray",
    margin: 20,
    borderRadius: 10,
  },
  list: {
    width: "100%",
    height: "100%",
  },
  todo: {
    fontSize: 16,
    flex: 1,
  },
  checked: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "gray",
    flex: 1,
  },
  editButton: {
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
