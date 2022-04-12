"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const theme = (0, react_1.extendTheme)({
    fonts: {
        heading: "Raleway",
    },
});
function MyApp({ Component, pageProps }) {
    return (<react_1.ChakraProvider theme={theme}>
      <Component {...pageProps}/>
    </react_1.ChakraProvider>);
}
exports.default = MyApp;
//# sourceMappingURL=_app.js.map