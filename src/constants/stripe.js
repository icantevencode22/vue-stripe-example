export const purchase = {
  items: [],
};

export const paymentStyle = {
  base: {
    color: "#32325d",
    fontFamily: "Arial, sans-serif",
    fontSmoothing: "antialiased",
    fontSize: "18px",
    "::placeholder": {
      color: "#32325d",
    },
  },
  invalid: {
    fontFamily: "Arial, sans-serif",
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

export const secondCardStyles = {
  base: {
    iconColor: "#c4f0ff",
    color: "#fff",
    fontWeight: 500,
    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
    fontSize: "16px",
    fontSmoothing: "antialiased",

    ":-webkit-autofill": {
      color: "#fce883",
    },
    "::placeholder": {
      color: "#87BBFD",
    },
  },
  invalid: {
    iconColor: "#FFC7EE",
    color: "#FFC7EE",
  },
};

export const mountInterval = 50;

export const msgTimeout = 6000;

export const defMsgStyles =
  "transition-all duration-500 ease-in-out text-center";
export const defHiddenStyles = "h-0 m-0 overflow-hidden";
