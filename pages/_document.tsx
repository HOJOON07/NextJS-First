import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRederPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRederPage({
          // 전체 React 트리를 래핑
          enhanceApp: (App) => (props) =>
            // 각 페이지에 대해 래핑하는데 유용
            sheet.collectStyles(<App {...props}></App>),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
}
