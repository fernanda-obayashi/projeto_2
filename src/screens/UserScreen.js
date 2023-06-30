import { View, Button, StyleSheet, Text } from "react-native";
import React from "react";

const UserScreen = ({ navigation }) => {
  const handleVerListaFeliz = () => {
    navigation.navigate("HappyList");
  };

  return (
    <View style={styles.container}>
      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Ver lista feliz!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Ver lista feliz!" onPress={handleVerListaFeliz} />
      </View>

      <View style={styles.subtitle}>
        <Text style={styles.subtitleText}>Ver lista triste.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Ver lista triste."
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

export default UserScreen;
