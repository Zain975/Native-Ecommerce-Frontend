import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { Button } from "react-native-paper";
import CartItem from "../components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";

// export const cartItems = [
//   {
//     name: "Macbook",
//     image:
//       "data:image/jpeg;base64,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",
//     product: "abcd",
//     stock: 3,
//     price: 60000,
//     quantity: 2,
//   },
//   {
//     name: "Shirt",
//     image:
//       "data:image/jpeg;base64,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",
//     product: "abcde",
//     stock: 30,
//     price: 2999,
//     quantity: 1,
//   },
//   {
//     name: "Macbook",
//     image:
//       "data:image/jpeg;base64,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",
//     product: "abcf",
//     stock: 3,
//     price: 60000,
//     quantity: 2,
//   },
//   {
//     name: "Shirt",
//     image:
//       "data:image/jpeg;base64,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",
//     product: "abcdg",
//     stock: 30,
//     price: 2999,
//     quantity: 1,
//   },
// ];

const Cart = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const incrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity + 1;
    if (stock <= quantity)
      return Toast.show({
        type: "error",
        text1: "Maximum value added",
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };

  const decrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity - 1;

    if (1 >= quantity) return dispatch({ type: "removeFromCart", payload: id });

    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      {/* header */}
      <Header back={true} emptyCart={true} />
      {/* heading */}
      <Heading
        text1="Shopping"
        text2="Cart"
        containerStyle={{
          paddingTop: 70,
          marginLeft: 35,
        }}
      />
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.length > 0 ? (
            cartItems.map((i, index) => (
              <CartItem
                navigate={navigate}
                key={i.product}
                id={i.product}
                name={i.name}
                stock={i.stock}
                amount={i.price}
                imgSrc={i.image}
                index={index}
                qty={i.quantity}
                incrementhandler={incrementHandler}
                decrementHandler={decrementHandler}
              />
            ))
          ) : (
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              No Items Yet
            </Text>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 35,
        }}
      >
        {/* <Text>5 Items</Text>
        <Text>200</Text> */}
        <Text>{cartItems.length} Items</Text>
        <Text>
          Rs
          {cartItems.reduce(
            (prev, curr) => prev + curr.quantity * curr.price,
            0
          )}
        </Text>
      </View>
      <TouchableOpacity
        onPress={
          cartItems.length > 0 ? () => navigate.navigate("confirmorder") : null
        }
      >
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 30,
          }}
          icon={"cart"}
          textColor={colors.color2}
        >
          Checkout
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
