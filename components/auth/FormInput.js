import { TextInput, View, Text, StyleSheet } from "react-native";

function FormInput({
  keyboardType,
  label,
  onUpdateValue,
  value,
  secure,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>

      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        onChangeText={onUpdateValue}
        value={value}
        secureTextEntry={secure}
      />
    </View>
  );
}

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  labelInvalid: {
    color: "#f37c13",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: "#fcdcbf",
  },
});
