import { View, Button, StyleSheet, Text } from "react-native";
import React from "react";
import db from "../services/SQLiteDatabase";

const AdminScreen = ({ navigation }) => {
  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT username, password FROM Users",
          [],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              var username = results.rows.item(0).username;
              var password = results.rows.item(0).password;
              setUserName(username);
              setPassword(password);
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCriarListaFeliz = () => {
    navigation.navigate("CreateHappyList");
    //console.log("oi");
  };

  return (
    <View style={styles.container}>
      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Criar lista feliz!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Criar lista feliz!" onPress={handleCriarListaFeliz} />
      </View>

      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Criar lista triste.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Criar lista triste."
          onPress={() => console.log("Opção 2 pressionada")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 10,
  },
  subtitle: {
    //width: "100%",
    //flexDirection: "row",
    //justifyContent: "space-between",
  },
  subtitleText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#000000",
  },
});
export default AdminScreen;
