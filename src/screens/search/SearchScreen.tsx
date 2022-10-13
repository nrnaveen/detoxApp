import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
/**
 * ? Local Imports
 */
import createStyles from "./SearchScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import RNBounceable from "@freakycoder/react-native-bounceable";

interface SearchScreenProps {}

const SearchScreen: React.FC<SearchScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Search
      </Text>
      <RNBounceable
        style={styles.buttonStyle}
        onPress={() => NavigationService.goBack()}
      >
        <Text color={colors.white}>Go back to Home</Text>
      </RNBounceable>
    </View>
  );
};

export default SearchScreen;
