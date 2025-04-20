import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OderPage from "../pages/OderPage/OderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPages/SignInPage";
import SignUpPage from "../pages/SignUpPages/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import AdminPage from "../pages/AdminPage/AdminPage";
export const routes = [
  { path: "/", page: HomePage, isShowHeader: true },
  { path: "/order", page: OderPage, isShowHeader: true },
  { path: "/products", page: ProductsPage, isShowHeader: true },
  { path: "/type", page: TypeProductPage, isShowHeader: true },
  { path: "/sign-in", page: SignInPage, isShowHeader: false },
  { path: "/sign-up", page: SignUpPage, isShowHeader: false },
  { path: "/product-detail", page: ProductDetailsPage, isShowHeader: true },
  { path: "/profile", page: ProfilePage, isShowHeader: true },
  { path: "/system/admin", page: AdminPage, isShowHeader: false, isPrivate: true },
  { path: "*", page: NotFoundPage }
];