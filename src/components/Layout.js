/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from "react"
import PropTypes from "prop-types"
import ToolbarApp from "./toolbar/ToolbarApp"
import { GlobalStyle } from "./style"
import { Helmet } from "react-helmet"

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Emergency Counter</title>
      </Helmet>
      <GlobalStyle />
      <ToolbarApp />
      <main>{children}</main>
      <footer>{""}</footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
