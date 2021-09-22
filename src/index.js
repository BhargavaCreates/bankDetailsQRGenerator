import React from "react";
import ReactDOM from "react-dom";
import {
  Center,
  Box,
  Input,
  Text,
  ChakraProvider,
  Button,
  Heading,
  Stack,
  Container
} from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { useFormik } from "formik";
import { Copyright } from "./Copyright";

function App() {
  const [details, setDetails] = React.useState({});
  const [qrGenerated, setQrGenerated] = React.useState(false);

  // const handleClick = () => {
  //   setQrGenerated(true);
  //   console.log(JSON.stringify(details));
  // };

  const validate = (values) => {
    const errors = {};
    if (!values.accountNo) {
      errors.accountNo = "Account Number Required";
    }

    if (!values.confirmAccountNo) {
      errors.confirmAccountNo = "Confirm Account Number Required";
    }

    if (values.accountNo !== values.confirmAccountNo) {
      errors.accountNo = "Account Number does not match";
      errors.confirmAccountNo = "Account Number does not match";
    }

    if (!values.ifscCode) {
      errors.ifscCode = "IFSC Code Required";
    }

    if (!values.name) {
      errors.name = "Name is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      accountNo: "",
      confirmAccountNo: "",
      ifscCode: "",
      name: ""
    },
    validate,
    onSubmit: (values) => {
      setQrGenerated(true);
      setDetails(values);
      // alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <ChakraProvider>
      <Container style={{ height: "100vh" }}>
        <Box padding={4}>
          <Center>
            <Heading>BANK DETAILS QR GENERATOR</Heading>
          </Center>
          <Center>
            <Text as="cite">Ideator: Mayank Kumar Goyal</Text>
          </Center>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          {/* Account Number  */}
          <Box paddingX={5}>
            <Input
              id="accountNo"
              name="accountNo"
              type="number"
              placeholder="Account Number"
              onChange={formik.handleChange}
              value={formik.values.accountNo}
            />
            <Box padding={1} color="red">
              {formik.touched.accountNo && formik.errors.accountNo ? (
                <div>{formik.errors.accountNo}</div>
              ) : null}
            </Box>
          </Box>

          {/* Confirm Account Number  */}
          <Box paddingX={5}>
            <Input
              id="confirmAccountNo"
              name="confirmAccountNo"
              type="number"
              placeholder="Confirm Account Number"
              onChange={formik.handleChange}
              value={formik.values.confirmAccountNo}
            />
            <Box padding={1} color="red">
              {formik.touched.confirmAccountNo &&
              formik.errors.confirmAccountNo ? (
                <div>{formik.errors.confirmAccountNo}</div>
              ) : null}
            </Box>
          </Box>

          {/* IFSC Code  */}
          <Box paddingX={5}>
            <Input
              id="ifscCode"
              name="ifscCode"
              placeholder="IFSC Code"
              onChange={formik.handleChange}
              value={formik.values.ifscCode}
            />
            <Box padding={1} color="red">
              {formik.touched.ifscCode && formik.errors.ifscCode ? (
                <div>{formik.errors.ifscCode}</div>
              ) : null}
            </Box>
          </Box>

          {/* Name  */}
          <Box paddingX={5}>
            <Input
              id="name"
              name="name"
              placeholder="Account Holder's Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <Box padding={1} color="red">
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </Box>
          </Box>
          <Box padding={5}>
            <Button colorScheme="blue" type="submit">
              Generate
            </Button>
          </Box>
        </form>
        <Box padding={5}>
          <Center>
            {qrGenerated && <QRCode value={JSON.stringify(details)} />}
          </Center>
        </Box>
        <Box
          as="footer"
          role="contentinfo"
          mx="auto"
          maxW="7xl"
          py="12"
          px={{ base: "4", md: "8" }}
          style={{ position: "absolute", bottom: 0 }}
        >
          <Stack>
            <Copyright alignSelf={{ base: "center", sm: "start" }} />
          </Stack>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
