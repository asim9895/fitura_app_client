import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/theme/colors";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { font_family } from "@/theme/font_family";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { set_calorie_selected_date } from "@/redux/slices/calorie_slice";
import { set_steps_selected_date } from "@/redux/slices/steps_slice";
import { set_water_selected_date } from "@/redux/slices/water_slice";
import { set_selected_date } from "@/redux/slices/user_slice";

const DatesList: React.FC<{ route: "Calorie" | "Steps" | "Water" }> = ({
  route,
}) => {
  const todays_date = new Date().toISOString().split("T")[0];
  const dispatch = useAppDispatch();
  const { colors }: { colors: Colors } = useAppSelector(
    (state: AppRootState) => state.theme
  );
  const { selected_date } = useAppSelector((state) => state.user);

  const [dates, setDates] = useState<string[]>([]);

  const flatListRef = useRef<FlatList<string>>(null);
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
  const isToday = selected_date === todays_date;

  // Scroll to today's date
  const scrollToToday = () => {
    dispatch(set_selected_date({ selected_date: todays_date }));

    // Find the index of today's date and scroll to it
    const todayIndex = dates.indexOf(todays_date);
    if (flatListRef.current && todayIndex !== -1) {
      flatListRef.current.scrollToIndex({ index: todayIndex, animated: true });
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    const formatDate = (dateString: any) => {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const date = new Date(dateString);

      const day = date.getDate(); // Day of the month
      const weekDay = daysOfWeek[date.getDay()]; // Day of the week
      const month = months[date.getMonth()]; // Month name
      const year = date.getFullYear().toString().slice(-2); // Last two digits of the year

      return [day, weekDay, month, year];
    };

    const result = formatDate(item);
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor:
              selected_date === item ? "#007AFF" : colors.background,
            padding: 10,
            marginHorizontal: 5,
            borderRadius: 10,
            alignItems: "center",
          },
        ]}
        onPress={() => {
          dispatch(set_selected_date({ selected_date: item }));
        }}
      >
        <Text
          style={{
            fontFamily: font_family.poppins_medium,
            fontSize: 17,
            color: selected_date === item ? colors.text_white : colors.text,
          }}
        >
          {result[0]}
        </Text>
        <Text
          style={{
            fontFamily: font_family.poppins_medium,
            fontSize: 13,
            color: selected_date === item ? colors.text_white : colors.text,
          }}
        >
          {result[1]}
        </Text>
        <Text
          style={{
            fontFamily: font_family.poppins_medium,
            fontSize: 8,
            color: selected_date === item ? colors.text_white : colors.text,
          }}
        >
          {result[2]} - {result[3]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ marginTop: Platform.OS === "ios" ? 30 : 20 }}>
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
          length: 55, // Approximate width of each item
          offset: 55 * index,
          index,
        })}
      />
      {!isToday && (
        <TouchableOpacity style={styles.todayButton} onPress={scrollToToday}>
          <Text style={styles.todayButtonText}>Today</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
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

export default DatesList;
