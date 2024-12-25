import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStylesWrapper } from "@/styles/global.style";
import { Colors } from "@/theme/colors";
import { useSelector } from "react-redux";
import { AppRootState } from "@/redux/store";
import { Theme } from "@/redux/slices/theme_slice";
import DatesList from "@/components/DatesList";
import { useAppSelector } from "@/hooks/redux_hooks";

const CalorieTrackerPage = () => {
  const { colors, theme } = useAppSelector(
    (state: AppRootState) => state.theme
  );

  const globalStyles = globalStylesWrapper(colors);

  return (
    <View style={[globalStyles.background]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <DatesList route="Calorie" />
      <Text style={{ color: colors.text }}>Index</Text>
    </View>
  );
};

export default CalorieTrackerPage;
