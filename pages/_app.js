import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes"

export default function CrochetCorner({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return ( 
    <Theme
      accentColor="cyan" 
      grayColor="mauve"
      panelBackground="transparent"
      style={{ backgroundColor: "transparent", minHeight: "100vh", margin: "-8px" }}
    >
      {getLayout(<Component {...pageProps} />)}
    </Theme>
  )
}