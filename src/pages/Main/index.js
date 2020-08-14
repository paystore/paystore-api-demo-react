import React from "react";
import { FlatList } from "react-native";

import { Container, Button, ButtonText, StatusBar } from "./styles";

export default function Main({ navigation }) {
  const options = [{ id: "1", title: "FAZER PAGAMENTO DE PONTA A PONTA", navigateTo: "FormPayment" }];
  return (
    <Container>
      <StatusBar />
      <FlatList
        data={options}
        renderItem={({ item }) => (
          <Button key={item.id} onPress={() => navigation.navigate(item.navigateTo)}>
            <ButtonText>{item.title}</ButtonText>
          </Button>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: "PayStore Api Demo",
};
