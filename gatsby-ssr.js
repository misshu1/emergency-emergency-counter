/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
require("firebase/auth")
require("firebase/firestore")
const React = require("react")
const { ProvideAuth } = require("./src/hooks/useAuth")

exports.wrapRootElement = ({ element }) => {
  return <ProvideAuth>{element}</ProvideAuth>
}
