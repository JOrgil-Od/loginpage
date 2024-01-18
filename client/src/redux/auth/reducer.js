import { message } from "antd";
import { dateLabel } from "../../constants/defaultValues";
import LocalStorageService from "../../helpers/LocalStorageService";
import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from "../actions";
const initialState = {
  data: { roles: [], today: dateLabel },
  role: "",
  isAuth: false,
  loading: false,
  error: "",
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_START:
      return { ...state, loading: true, error: "" };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        isAuth: true,
        data: payload,
      };
    case LOGIN_USER_ERROR:
      // if (payload === 401) {
      //   if (LocalStorageService.getAccessToken()) {
      //     message.warning("Ахин бөглөнө үү");
      //   } else {
      //     message.warning("Бүртгэлгүй хэрэглэгч");
      //   }
      // } else if (payload === 409) {
      //   message.warning("Та өнөөдрийн асуумжаа бөглөсөн байна");
      // } else if (payload === 500) {
      //   message.error("Алдаа гарлаа дахиад нэвтэрч үзнэ үү");
      // } else if (payload === 201) {
      //   message.success("Амжилттай бүртгэгдлээ");
      // } else if (payload === 406) {
      //   message.warning("Та асуумж бөглөх боломжгүй байна");
      // }
      return { ...state, loading: false, error: payload, data: {} };
    case LOGOUT_USER:
      LocalStorageService.clearToken();
      return {
        ...state,
        loading: false,
        error: "",
        isAuth: false,
        loginType: "login",
        data: {},
      };
    default: {
      return { ...state };
    }
  }
};
