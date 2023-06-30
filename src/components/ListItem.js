import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ListItem = () => {
  const [catImage, setCatImage] = useState(null);
  const [selectedCatType, setSelectedCatType] = useState(null);

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

  return (
    <View>
      <Text>Motivo para ser feliz hoje:</Text>

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
    </View>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  catTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  catTypeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedCatTypeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: "#cdb4db",
  },
  catTypeButtonText: {
    color: "#000",
  },
};

export default ListItem;
