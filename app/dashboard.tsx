import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import {
  clear_user_profile,
  set_user_profile,
} from "@/redux/slices/user_slice";
import { useNavigation } from "expo-router";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [dates, setDates] = useState<string[]>([]);
  const [selected_date, setselected_date] = useState("");
  const [todays_date, settodays_date] = useState(
    new Date().toISOString().split("T")[0]
  );
  const flatListRef = useRef<FlatList<string>>(null);
  console.log(todays_date);

  const navigation = useNavigation();

  const updateProfile = () => {
    dispatch(
      set_user_profile({
        name: "Jane Doe",
        age: 28,
        height: "170",
        weight: "60",
        gender: "female",
        profile_completed: true,
      })
    );
  };

  const clearProfile = () => {
    dispatch(clear_user_profile());
    navigation.navigate("setup-profile" as never);
  };

  // Generate dates starting from 20th December 2024
  useEffect(() => {
    const generateDates = () => {
      const startDate = new Date(2024, 11, 20); // Months are 0-indexed
      const tempDates: string[] = [];

      // Generate the next 1000 days as an example
      for (let i = 0; i < 1000; i++) {
        const nextDate = new Date(startDate);
        nextDate.setDate(startDate.getDate() + i);
        tempDates.push(nextDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
      }

      setDates(tempDates);
    };

    generateDates();
  }, []);

  // Check if the selected date is today
  const isToday = selected_date === new Date().toISOString().split("T")[0];

  // Scroll to today's date
  const scrollToToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setselected_date(today);

    // Find the index of today's date and scroll to it
    const todayIndex = dates.indexOf(today);
    if (flatListRef.current && todayIndex !== -1) {
      flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
    }
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.dateContainer,
        { backgroundColor: selected_date === item ? "#007AFF" : "transparent" },
      ]}
      onPress={() => setselected_date(item)}
    >
      <Text style={styles.dateText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={dates}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        initialScrollIndex={dates.indexOf(selected_date)} // Start from the selected date
        getItemLayout={(data, index) => ({
          length: 100, // Approximate width of each item
          offset: 100 * index,
          index,
        })}
      />
      {!isToday && (
        <TouchableOpacity style={styles.todayButton} onPress={scrollToToday}>
          <Text style={styles.todayButtonText}>Today</Text>
        </TouchableOpacity>
      )}
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.age}</Text>
      <Text>Age: {user.gender}</Text>
      <Text>Height: {user.height}</Text>
      <Text>Weight: {user.weight}</Text>
      <Text>
        Profile Completed: {user.profile_completed === true ? "yes" : "no"}
      </Text>
      <Button title="Update Profile" onPress={updateProfile} />
      <Button title="Clear Profile" onPress={clearProfile} />
      <Button
        title="Go to Setup Profile"
        onPress={() => {
          console.log("go to setup profile");
          navigation.navigate("setup-profile" as never);
        }}
      />
    </View>
  );
};

export default DashboardPage;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 10,
  },
  dateContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 5,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDateContainer: {
    backgroundColor: "#007bff",
  },
  selectedDateText: {
    color: "#fff",
    fontWeight: "bold",
  },
  todayButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  todayButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
