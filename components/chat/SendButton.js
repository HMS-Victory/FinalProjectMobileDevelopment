import { Pressable, StyleSheet, Text } from "react-native";

function SendButton({ onPress }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.pressed, styles.button] : styles.button
      }
      onPress={onPress}
    >
      <Text>Send</Text>
    </Pressable>
  );
}

export default SendButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset:{width: 1, height:1},
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: '',
    borderRadius: 4,
  },
});
