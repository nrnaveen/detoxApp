import React, { useMemo } from "react";
import { View, SafeAreaView } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
/**
 * ? Local Imports
 */
import createStyles from "./FormScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { Form, FormItem } from "../../components/FormItem";

interface FormScreenProps {}

const FormScreen: React.FC<FormScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [email, onChangeEmail] = React.useState("");
  const [firstName, onChangeFName] = React.useState("");
  const [lastName, onChangeLName] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
    <View testID="form_page" style={styles.container}>
      <Text h1 color={colors.text}>
        Form
      </Text>
      <SafeAreaView style={{ top: "5%", width: "90%" }}>
        <Form
          onButtonPress={() => NavigationService.goBack()}
          testID="submit_form"
        >
          <FormItem
            value={firstName}
            onChangeText={onChangeFName}
            testID="textInput_firstName"
            label="First Name"
            isRequired
            asterik
          />
          <FormItem
            value={lastName}
            onChangeText={onChangeLName}
            label="Last Name"
            testID="textInput_lastName"
            isRequired
            asterik
          />
          <FormItem
            value={email}
            onChangeText={onChangeEmail}
            label="Email"
            testID="textInput_email"
            isRequired
            asterik
          />
          <FormItem
            value={password}
            onChangeText={onChangePassword}
            label="Password"
            secureTextEntry={true}
            isRequired
            testID="textInput_password"
            asterik
          />
        </Form>
      </SafeAreaView>

      <RNBounceable
        style={styles.buttonStyle}
        onPress={() => NavigationService.goBack()}
        testID={"go_back_form"}
      >
        <Text color={colors.white}>Go back to Home</Text>
      </RNBounceable>
    </View>
  );
};

export default FormScreen;
