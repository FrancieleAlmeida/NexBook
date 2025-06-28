import { TextInput, TextInputProps, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons"
import { Controller, UseControllerProps } from "react-hook-form"

import { styles } from "./style";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  formProps: UseControllerProps;
  inputProps: TextInputProps;
}

export function Input({ icon, formProps, inputProps }: Props) {
  return (
    <Controller
      rules={{ required: true }}
      render={({ field }) => (
        <View style={styles.group}>
          <View style={styles.icon}>
            <Feather name={icon} size={24} color="red" />
          </View>
          <TextInput style={styles.control}
            placeholderTextColor={"#000"}
            value={field.value}
            onChangeText={field.onChange}
            {...inputProps} />
        </View>
      )}
      {...formProps}
    />

  )
}