import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import db from "../services/SQLiteDatabase";

const CreateHappyListScreen = () => {
  const [catImage, setCatImage] = useState(null);
  const [selectedCatType, setSelectedCatType] = useState(null);
  const [happyReason, setHappyReason] = useState("");
  const [happyList, setHappyList] = useState([]);

  const createTables = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS happy_items (id INTEGER PRIMARY KEY AUTOINCREMENT, reason TEXT, catType TEXT, catImage TEXT)",
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

  const handleAddItem = () => {
    if (happyReason) {
      const newItem = {
        reason: happyReason,
        catType: selectedCatType,
        catImage: catImage,
      };
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO happy_items (reason, catType, catImage) VALUES (?, ?, ?)",
          [newItem.reason, newItem.catType, newItem.catImage],
          () => {
            setHappyReason("");
            setSelectedCatType(null);
            setCatImage(null);
          },
          (error) => {
            console.log("Error inserting item into database:", error);
          }
        );
      });
    }
  };

  useEffect(() => {
    if (selectedCatType) {
      fetch(`https://cataas.com/cat/${selectedCatType}`)
        .then((response) => response.url)
        .then((imageUrl) => setCatImage(imageUrl))
        .catch((error) => console.log("Error fetching cat image:", error));
    }
  }, [selectedCatType]);

  const handleCatTypeSelection = (catType) => {
    setSelectedCatType(catType);
  };

  const handleHappyReasonChange = (text) => {
    setHappyReason(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motivo para ser feliz hoje:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o motivo"
        onChangeText={handleHappyReasonChange}
        value={happyReason}
      />

      <View style={styles.catTypeContainer}>
        <TouchableOpacity
          style={
            selectedCatType === "cute"
              ? styles.selectedCatTypeButton
              : styles.catTypeButton
          }
          onPress={() => handleCatTypeSelection("cute")}
        >
          <Text style={styles.catTypeButtonText}>Gato Fofo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            selectedCatType === "funny"
              ? styles.selectedCatTypeButton
              : styles.catTypeButton
          }
          onPress={() => handleCatTypeSelection("funny")}
        >
          <Text style={styles.catTypeButtonText}>Gato Engraçado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            selectedCatType === "sleepy"
              ? styles.selectedCatTypeButton
              : styles.catTypeButton
          }
          onPress={() => handleCatTypeSelection("sleepy")}
        >
          <Text style={styles.catTypeButtonText}>Gato Sonolento</Text>
        </TouchableOpacity>
      </View>

      {catImage && <Image source={{ uri: catImage }} style={styles.image} />}
      <View style={styles.container}>
        <Button
          style={styles.button}
          title="Adicionar"
          onPress={handleAddItem}
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
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    padding: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 10,
  },
  catTypeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  catTypeButton: {
    backgroundColor: "#e1e1e1",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  selectedCatTypeButton: {
    backgroundColor: "#a6a6a6",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  catTypeButtonText: {
    fontSize: 16,
    color: "black",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
});

export default CreateHappyListScreen;
