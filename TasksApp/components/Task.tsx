import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface Task {
  id: string | number[];
  title: string;
  status: boolean;
  due: Date | null;
  comment: string | null;
}

export function TaskItem({ task }: { task: Task }) {
  return (
    <View>
      <Text>{task.title}</Text>
    </View>
  );
}
