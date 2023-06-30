import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import db from "../services/SQLiteDatabase";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    createTables();
    setTimeout(() => {
      getData();
    }, 500);
  }, []);

  const createTables = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS" +
          " Users" +
          " (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);",
        [],
        (_, res) => {
          console.log("Table created");
        },
        (error) => {
          console.log("Error creating table:", error);
        }
      );
    });
  };

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT username, password FROM Users",
          [],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              const userData = results.rows.item(0);
              if (userData.username === "Admin") {
                navigation.navigate("Admin");
              } else if (userData.username === "User") {
                navigation.navigate("User");
              }
            } else {
              Alert.alert("Usuário ou senha inválidos");
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (username.length == 0) {
      Alert.alert("Digite o Login");
    } else {
      try {
        db.transaction(async (tx) => {
          await tx.executeSql(
            "INSERT INTO Users (username, password) VALUES (?, ?)",
            [username, password]
          );
        });

        if (username === "Admin") {
          navigation.navigate("Admin");
        } else if (username === "User") {
          navigation.navigate("User");
        } else {
          Alert.alert("Usuário inválido");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Digite seu login:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        onChangeText={(text) => setUsername(text)}
        value={username}
      ></TextInput>
      <Text style={styles.text}>Digite sua senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      ></TextInput>
      <Button title="Login" onPress={setData} />
      <View style={styles.space}>
        <Text>Login e senha para Administrador: "Admin"</Text>
        <Text>Login e senha para Usuário: "User"</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
  },
  space: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 18,
  },
  text: {
    fontSize: 20,
  },
});

export default LoginScreen;
