import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import {
  clear_user_profile,
  set_user_profile,
} from "@/redux/slices/user_slice";
import { useNavigation } from "expo-router";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

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

  return (
    <View>
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

const styles = StyleSheet.create({});
