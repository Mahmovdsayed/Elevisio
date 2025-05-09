const SignUpInitialState = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const VerifyInitialState = {
  otp: "",
  email: "",
};

const requestNewOTPInitialState = {
  email: "",
};

const LoginInitialState = {
  email: "",
  password: "",
};

const forgotPasswordInitialState = {
  email: "",
};

const resetPasswordInitialState = {
  password: "",
  confirmPassword: "",
  token: "",
};

const imageUploadInitialState = {
  image: File,
};

const addNewWorkInitialState = {
  companyName: "",
  positionName: "",
  description: "",
  from: "",
  to: "",
  companyImage: null as File | null,
  current: false,
  employmentType: "",
};

const deleteInitialState = {
  ID: "",
};

const addNewEducationInitialState = {
  schoolName: "",
  faculty: "",
  from: "",
  to: "",
  status: "",
  gpa: "",
  location: "",
  certificateURL: "",
  schoolImage: null as File | null,
  description: "",
};

const addNewSkillInitialState = {
  name: [""],
  category: "",
};

const projectInitialState = {
  name: "",
  description: "",
  projectImage: null as File | null,
  clientName: "",
  from: "",
  to: "",
  projectType: "Tech",
  techStack: [],
  designTools: [],
  projectURL: "",
  githubURL: "",
  designFileURL: "",
  status: "completed",
};

const certificateInitialState = {
  title: "",
  date: "",
  certificateURL: "",
  certificateImage: null as File | null,
};

const contactInitialState = {
  platform: "",
  url: "",
};

const addNewProductInitialState = {
  title: "",
  description: "",
  price: "",
  discountPrice: "",
  hasDiscount: false,
  purchaseLink: "",
  category: "",
  productImage: null as File | null,
};

const addNewBlogInitialState = {
  title: "",
  content: "",
  category: "",
  seoKeywords: [],
  blogImage: null as File | null,
  status: "published",
};

const updateBlogInitialState = {
  title: "",
  content: "",
  category: "",
  status: "published",
};

const initialEventValues = {
  name: "",
  description: "",
  shortDescription: "",
  dateTime: {
    start: "",
    end: "",
  },
  location: {
    venue: "",
    address: "",
    city: "",
    country: "",
    onlineEvent: false,
    meetingLink: "",
  },
  eventBanner: null as File | null,
  status: "draft",
  category: "other",
  registration: {
    externalLink: "",
    status: "open",
    closeDate: "",
  },
  ticketTypes: [
    {
      name: "",
      price: 0,
    },
  ],
  isFree: true,
  currency: "",
  views: 0,

  organizer: {
    name: "",
    email: "",
    phone: "",
    website: "",
    socialMedia: {
      facebook: "",
      instagram: "",
    },
    bio: "",
    image: null as File | null,
  },

  speakers: [
    {
      name: "",
      bio: "",
      socialMedia: {
        instagram: "",
        facebook: "",
      },
    },
  ],
  sponsors: [
    {
      name: "",
      tier: "silver",
      website: "",
    },
  ],
  faqs: [
    {
      question: "",
      answer: "",
    },
  ],
  termsConditions: "",
  refundPolicy: "",
  ageRestriction: "all",
};

const noteInitialState = {
  title: "",
  content: "",
  type: "note",
  isCompleted: false,
  priority: "low",
};

const cvInitialState = {
  name: "",
  isMainCV: false,
  CV: null as File | null,
};

export {
  cvInitialState,
  noteInitialState,
  SignUpInitialState,
  VerifyInitialState,
  requestNewOTPInitialState,
  LoginInitialState,
  forgotPasswordInitialState,
  resetPasswordInitialState,
  imageUploadInitialState,
  addNewWorkInitialState,
  deleteInitialState as deleteWorkInitialState,
  addNewEducationInitialState,
  addNewSkillInitialState,
  projectInitialState,
  certificateInitialState,
  contactInitialState,
  addNewProductInitialState,
  addNewBlogInitialState,
  updateBlogInitialState,
  initialEventValues,
};
