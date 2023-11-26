import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import { Avatar, Button } from "react-native-paper";
import SerachModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSetCategories } from "../utils/hooks";
import { getAllProducts } from "../redux/actions/productAction";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import SearchModal from "../components/SearchModal";

// const categories = [
//   { category: "Men", _id: "0a" },
//   { category: "Women", _id: "0b" },
//   { category: "Kid", _id: "0c" },
//   { category: "Mobile", _id: "0d" },
//   { category: "Mobile", _id: "0e" },
//   { category: "Mobile", _id: "0f" },
// ];
// export const products = [
//   {
//     price: 2000,
//     stock: 20,
//     name: "earbuds",
//     _id: "01",
//     category: "abcdef",
//     images: [
//       {
//         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0V-435gF0Z6m12cwvS4127qBjR-UtiDIhw&usqp=CAU",
//       },
//     ],
//   },
//   {
//     price: 2000,
//     stock: 20,
//     name: "lorem ipsum",
//     _id: "02",
//     category: "abcdefgh",
//     images: [
//       {
//         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0V-435gF0Z6m12cwvS4127qBjR-UtiDIhw&usqp=CAU",
//       },
//     ],
//   },
// ];

const Home = () => {
  const [category, setCategory] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { products } = useSelector((state) => state.product);

  const categoryButtonHandler = (id) => {
    setCategory(id);
  };

  const addToCardHandler = (id, name, price, image, stock) => {
    if (stock === 0)
      return Toast.show({
        type: "error",
        text1: "Out Of Stock",
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: 1,
      },
    });
    Toast.show({
      type: "success",
      text1: "Added To Cart",
    });
  };

  useSetCategories(setCategories, isFocused);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllProducts(searchQuery, category));
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, searchQuery, category, isFocused]);

  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}
      <View style={defaultStyle}>
        <Header />

        {/* Heading Row */}
        <View
          style={{
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Heading */}
          <Heading text1="Our" text2="Products" />

          {/* Search Bar */}

          <View>
            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Avatar.Icon
                icon={"magnify"}
                size={50}
                color={"gray"}
                style={{ backgroundColor: colors.color2, elevation: 12 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}

        <View
          style={{
            flexDirection: "row",
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? colors.color1 : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item._id ? colors.color2 : "gray",
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Products */}

        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCardHandler={addToCardHandler}
                id={item._id}
                key={item._id}
                i={index}
                navigate={navigate}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <Footer activeRoute={"home"} />
    </>
  );
};

export default Home;