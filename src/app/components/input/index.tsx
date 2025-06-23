import { TextInput, TextInputProps } from "react-native";

import { styles } from "./style";
type Props = TextInputProps & {
  place: string
}

export function Input({ place }: Props) {
  return (
    <TextInput style={styles.input} placeholder={place} placeholderTextColor={"#000"} />
  )
}