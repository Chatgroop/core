// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { UserProvider } from '@auth0/nextjs-auth0';
import { useEffect } from "react";
import { hop } from "@onehop/client";
import { HOP_PROJECT_ID } from "../utils/config";
import { ThemeProvider } from "next-themes";


const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		hop.init({
			projectId: HOP_PROJECT_ID,
		});
	}, []);

  return (
	  <ThemeProvider attribute="class">
    	<UserProvider>
      		<Component {...pageProps} />
    	</UserProvider>
	  </ThemeProvider>
    )
};

export default MyApp;
