import { TextInput, TextInputProps, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons"
import { Controller, UseControllerProps, FieldError } from "react-hook-form"

import { styles } from "./style";
type Props = {
  icon: keyof typeof Feather.glyphMap;
  formProps: UseControllerProps;
  inputProps: TextInputProps;
  errorMessage?: string | FieldError;
}

export function Input({ icon, formProps, inputProps, errorMessage }: Props) {
  return (
    <Controller
      {...formProps}
      render={({ field }) => (
        <View>
          <View style={styles.group}>
            <View style={styles.icon}>
              <Feather name={icon} size={24} color="#008400" />
            </View>
            <TextInput
              style={styles.control}
              placeholderTextColor={"#fff"}
              value={field.value}
              onChangeText={field.onChange}
              {...inputProps}
            />
          </View>
          {errorMessage && typeof errorMessage === 'string' && (
            <Text style={{
              color: '#FF4C4C', fontSize: 12, marginLeft: 20, fontWeight: 'bold',
              textShadowColor: '#000',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 1
            }}>
              {errorMessage}
            </Text>
          )}

        </View>
      )}
    />
  )
}