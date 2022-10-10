import { remark } from "remark";
import Html from "remark-html";
import Prism from "remark-prism";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(Html, { sanitize: false })
    .use(Prism)
    .process(markdown);
  return result.toString();
}
