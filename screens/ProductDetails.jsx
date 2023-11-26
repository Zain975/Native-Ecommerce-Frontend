import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import Carousel from "react-native-snap-carousel";
import { Avatar, Button } from "react-native-paper";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getProductDetails } from "../redux/actions/productAction";

// const name = "Rebook";
// const price = 3000;
// const stock = 10;
// const description =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis dui nulla. Sed pulvinar congue eros in semper. Phasellus nisi mauris, aliquet eget fringilla sed, mattis in libero. Morbi ac libero ac lacus tempor elementum eu nec leo. Etiam elementum cursus nunc, a luctus metus pulvinar vel. Sed euismod libero eros, nec venenatis sem volutpat et. Curabitur accumsan bibendum nisl, vel luctus odio lobortis at. Pellentesque congue vel ex vel porttitor.";

// const images = [
//   {
//     id: "01",
//     url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0V-435gF0Z6m12cwvS4127qBjR-UtiDIhw&usqp=CAU",
//   },
//   {
//     id: "01",
//     url: "data:image/jpeg;base64,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",
//   },
// ];

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

export const iconOptions = {
  size: 20,
  style: {
    borderRadius: 5,
    backgroundColor: colors.color5,
    height: 25,
    width: 25,
  },
};

const ProductDetails = ({ route: { params } }) => {
  const {
    product: { name, price, stock, description, images },
  } = useSelector((state) => state.product);

  const isCarousel = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // const incrementQty = () => {
  //   if (stock <= quantity) return;
  //   setQuantity((prev) => prev + 1);
  // };
  // const decrementQty = () => {
  //   if (quantity <= 1) return;
  //   setQuantity((prev) => prev - 1);
  // };

  // const addToCartHandler = () => {
  //   if (stock === 0)
  //     return Toast.show({
  //       type: "error",
  //       text1: "Out Of Stock",
  //       text2: "this dummy text",
  //     });
  //   Toast.show({
  //     type: "success",
  //     text1: "Added To Cart",
  //   });
  //   // console.log("adding to cart", quantity);
  // };

  const incrementQty = () => {
    if (stock <= quantity)
      return Toast.show({
        type: "error",
        text1: "Maximum Value Added",
      });
    setQuantity((prev) => prev + 1);
  };
  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    if (stock === 0)
      return Toast.show({
        type: "error",
        text1: "Out Of Stock",
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: params.id,
        name,
        price,
        image: images[0]?.url,
        stock,
        quantity,
      },
    });
    Toast.show({
      type: "success",
      text1: "Added To Cart",
    });
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, isFocused]);

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: colors.color1,
      }}
    >
      <Header back={true} />
      {/* Carusel */}
      <Carousel
        layout="stack"
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        ref={isCarousel}
        data={images}
        renderItem={CarouselCardItem}
      />
      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          flex: 1,
          marginTop: -380,
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: 25,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          Rs {price}
        </Text>
        <Text
          style={{
            letterSpacing: 1,
            lineHeight: 20,
            marginVertical: 15,
          }}
          numberOfLines={8}
        >
          {description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              color: colors.color3,
              fontWeight: "100",
            }}
          >
            Quantity
          </Text>
          <View
            style={{
              width: 80,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={decrementQty}>
              <Avatar.Icon icon={"minus"} {...iconOptions} />
            </TouchableOpacity>
            <Text style={style.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQty}>
              <Avatar.Icon icon={"plus"} {...iconOptions} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.9} onPress={addToCartHandler}>
          <Button icon={"cart"} style={style.btn} textColor={colors.color2}>
            Add To Cart
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CarouselCardItem = ({ item, index }) => (
  <View style={style.container} key={index}>
    <Image source={{ uri: item.url }} style={style.image} />
  </View>
);

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.color1,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 250,
  },
  quantity: {
    backgroundColor: colors.color4,
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
});
export default ProductDetails;
