import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import db from "../services/SQLiteDatabase";
import ListItem from "../components/ListItem";

const HappyListScreen = ({ navigation }) => {
  const [happyList, setHappyList] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM happy_items",
        [],
        (_, result) => {
          const items = [];
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));
          }
          setHappyList(items);
        },
        (error) => {
          console.log("Error retrieving items from database:", error);
        }
      );
    });
  }, []);

  return (
    <View>
      <Text>HappyListScreen</Text>
      {happyList.map((item) => (
        <ListItem
          key={item.id}
          happyReason={item.happyReason}
          catType={item.catType}
        />
      ))}
    </View>
  );
};

export default HappyListScreen;
