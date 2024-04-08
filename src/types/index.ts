// API Types Start
type MongoosePropsOmmited = "_id"|"id"|"createdAt"|"updatedAt"|"__v"
interface IAddress {
  streetLine1?: String;
  streetLine2?: String;
  city: String;
  region: String;
  country: String;
  postalCode: String;
}
interface IContactNumber {
  countryCode?: String;
  number: String;
}
interface IFirmHistory {
  firm: String | IBroker | IInvestor;
  dateOfJoining: Date;
}
interface IUser {
  _id: String;
  id?: String;
  email: String;
  name: String;
  role: "admin" | "member";
  firms?: String[] | IFirm[];
  uniquePasswordToken?: String;
  isPasswordOTPVerified?: boolean;
  passwordResetToken?: String;
  passwordResetTokenExpiry?: Date;
  avatar: String;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: Number;
}

interface IFirm {
  _id: String;
  id?: String;
  name: String;
  locationType: "Domestic" | "Foreign";
  address: IAddress;
  comment: String;
  createdBy: String | IUser;
  members?: String[] | IBrokerMember[] | IInvestorMember[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v?: Number;
}

interface IBroker extends IFirm {
  firmType: "broker";
  sectors?: String[];
  coverages?: String[] | ICoverage[];
}
type IBrokerPostType = Omit<IBroker,keyof MongoosePropsOmmited> & {
  type: "broker"
}
interface IInvestor extends IFirm {
  firmType: "investor";
  sectors?: String[];
  regionSectors?: String[];
  regionFocus?: String[];
  fundSize: {
    globalExposure?: Number;
    indianExposure: Number;
  };
  fundFactSheets?: String[] | IFile[];
}

interface IFile {
  _id: String;
  id?: String;
  firmId: String | IBroker | IInvestor;
  member?: String | IBrokerMember | IInvestorMember;
  originalName: String;
  mimeType: String;
  buffer?: Buffer;
  createdAt: Date;
  updatedAt: Date;
  tags?: String[];
}

type IInvestorPostType = Omit<IInvestor,keyof MongoosePropsOmmited> & {
  type: "investor"
}

interface IMember {
  _id: String;
  id?: String;
  name: String;
  email: String;
  firm: String | IBroker | IInvestor;
  firmHistroy: IFirmHistory[];
  designation: String;
  mobileNumber?: IContactNumber;
  officeNumber?: IContactNumber;
  address: IAddress;
  businessCard?: String | IFile;
  comment?: String;
  interactions?: String[] | IInteraction[];
  isGift: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v?: Number;
}

interface IBrokerMember extends IMember {
  memberType: "BrokerMember";
  sectors?: String[];
}
type IBrokerMemberPostType = Omit<IBrokerMember,MongoosePropsOmmited>
interface IInvestorMember extends IMember {
  memberType: "InvestorMember";
  sectors?: String[];
  regionFocus?: String[];
  fundSize: {
    globalExposure?: Number;
    indianExposure: Number;
  };
  isExistingInvestor: boolean;
  holdingSize?: Number;
  lastHoldingDate?: Date;
}
type IInvestorMemberPostType = Omit<IInvestorMember,MongoosePropsOmmited>
interface ICoverage {
  _id: String;
  id?: String;
  firm: String | IBroker | IInvestor;
  takeProfit: Number;
  coverageFile: String | IFile;
  fiscalYear: Number;
  quarter: 1 | 2 | 3 | 4;
  coverageDate: Date;
  createdAt: Date;
  updatedAt: Date;
  __v?: Number;
}

type ICoveragePostType = Omit<ICoverage,MongoosePropsOmmited>

interface IInteraction {
  _id: String;
  id?: String;
  firm: String | IBroker | IInvestor;
  member: String | IBrokerMember | IInvestorMember;
  content: String;
  dateOfInteraction: Date;
  createdAt: Date;
  updatedAt: Date;
  __v?: Number;
}

type IInteractionPostType = Omit<IInteraction,MongoosePropsOmmited>

interface AxiosReturnType<T>{
  data?: T;
  success: "true" | "false";
  message: String;
}

export type {
  IUser,
  IBroker,
  IMember,
  IBrokerMember,
  IInvestorMember,
  IFile,
  IInteraction,
  ICoverage,
  IBrokerPostType,
  IInvestorPostType,
  IBrokerMemberPostType,
  IInvestorMemberPostType,
  IInteractionPostType,
  ICoveragePostType,
  AxiosReturnType
};
