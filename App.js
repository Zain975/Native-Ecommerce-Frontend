import { Provider } from "react-redux";
import Main from "./Main";
import { store } from "./redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const stripeKey =
  "pk_test_51MygRyCS9XKwOJEhsdpj1qBQcyaddJcjVYXcyKaE5DzpIPmsQ1iNv73WEOKjKUBAgZ1Ts3dZsFJHx7eF093eGwWz00FY8dzrWg";

export default function App() {
  return (
    <StripeProvider
      threeDSecureParams={{
        backgroundColor: "#fff",
        timeout: 5,
      }}
      merchantIdentifier="zain-1998.com"
      publishableKey={stripeKey}
    >
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
}
