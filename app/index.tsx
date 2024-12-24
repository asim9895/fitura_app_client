import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import {
  clear_user_profile,
  set_user_profile,
} from "@/redux/slices/user_slice";
import { Redirect, useNavigation } from "expo-router";

const IndexPage = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <View>
      {user.profile_completed ? (
        <Redirect href={"/dashboard"} />
      ) : (
        <Redirect href={"/setup-profile"} />
      )}
    </View>
  );
};

export default IndexPage;

const styles = StyleSheet.create({});
