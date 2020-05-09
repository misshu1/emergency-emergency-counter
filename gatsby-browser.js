/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "firebase/auth"
import "firebase/firestore"
import React from "react"
import { ProvideAuth } from "./src/hooks/useAuth"

export const wrapRootElement = ({ element }) => {
  return <ProvideAuth>{element}</ProvideAuth>
}
