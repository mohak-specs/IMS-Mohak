import { IAddress } from "../types";
const AddressText = ({ address }: { address: IAddress }) => {
  const { streetLine1, streetLine2, state, country, postalCode } = address;
  return (
    <>
      {streetLine1 && streetLine1 + ", "}
      {streetLine2 && streetLine2 + ", "}
      {state}, {country} - {postalCode}
    </>
  );
};

export default AddressText;
