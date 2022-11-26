import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  AuthPage,
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  Icons
} from "@pankod/refine-antd";

import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import routerProvider from "@pankod/refine-react-router-v6";
import { supabaseClient } from "utility";
import "styles/antd.less";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout";
import authProvider from "./authProvider";
import UserList from "pages/users/list";
import CanvasList from "pages/canvases/list";
import SponsorsBanner from "components/banners/sponsors";

const { GoogleOutlined, GithubOutlined } = Icons;

function App() {
  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
      liveProvider={liveProvider(supabaseClient)}
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: "/register",
            element: <AuthPage type="register" />,
          },
          {
            path: "/forgot-password",
            element: <AuthPage type="forgotPassword" />,
          },
          {
            path: "/update-password",
            element: <AuthPage type="updatePassword" />,
          },
        ],
      }}
      resources={[
        {
          name: "users",
          list: UserList,
        },
        {
          name: "canvases",
          list: CanvasList,
        },
      ]}
      LoginPage={() => (
        <AuthPage
          type="login"
          providers={[
            {
              name: "google",
              icon: <GoogleOutlined />,
              label: "Sign in with Google",
            },
            {
              name: "github",
              icon: <GithubOutlined />,
              label: "Sign in with GitHub",
            },
          ]}
          formProps={{
            initialValues: {
              email: "example@example.dev",
              password: "4Goodpas5w@rd",
            },
          }}
          renderContent={(content: React.ReactNode) => (
            <>
              {content}
              <SponsorsBanner />
            </>
          )}
        />
      )}
      notificationProvider={notificationProvider}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      Title={Title}
      Header={Header}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
    />
  );
}

export default App;
