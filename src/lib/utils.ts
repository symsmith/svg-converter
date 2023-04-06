export function createAttrRegex(name: string, firstOnly = false) {
  return new RegExp(name + '="(?:.)*?"', `${firstOnly ? "" : "g"}m`);
}

function replaceAt(str: string, index: number, replacement: string) {
  return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

export function camelCase(str: string) {
  if (str.length === 0) return str;
  if (!/-/.test(str)) return str;

  const dash = new RegExp("-([a-z])", "g");
  const matches = [...str.matchAll(dash)];

  let newStr = str;
  for (const match of matches) {
    newStr = replaceAt(newStr, (match.index ?? 0) + 1, match[1].toUpperCase());
  }
  newStr = newStr.replace("-", "");

  return newStr;
}

export function convertInput(input: string, addCircledTag: boolean) {
  const xmlDef = new RegExp("<\\?xml(?:.)*>", "gm");
  const xmlComment = new RegExp("<!--(?:.)*?-->", "gm");
  const xmlns = createAttrRegex("xmlns:xlink");
  const xmlspace = createAttrRegex("xml:space");
  const enableBackground = createAttrRegex("enable-background");
  const x = createAttrRegex("\\sx", true);
  const y = createAttrRegex("\\sy", true);
  const id = createAttrRegex("id");
  const dataname = createAttrRegex("data-name");
  const color = new RegExp('"\\#[0-9a-f]{6}"', "gmi");

  let converted = input
    .replace(xmlDef, "")
    .replace(xmlComment, "")
    .replace(xmlns, "width={circled ? '70%' : '100%'} height={circled ? '70%' : '100%'}")
    .replace(xmlspace, "")
    .replace(enableBackground, "")
    .replace(x, "")
    .replace(y, "")
    .replace(id, "")
    .replace(dataname, "");

  const attributesRegex = new RegExp('([a-z-]*)="(?:.)*?"', "gmi");
  const attributes = Array.from(
    new Set([...converted.matchAll(attributesRegex)].map((match) => match[1]))
  );
  for (const attribute of attributes) {
    converted = converted.replaceAll(attribute, camelCase(attribute));
  }

  converted = converted
    .split("\n")
    .filter((l) => l !== "")
    .join("\n");

  return (
    (addCircledTag ? "<CircledIcon {...{ backgroundColor, circled, size, healthIssue }}>\n" : "") +
    converted.replace(color, "{color}") +
    (addCircledTag ? "\n</CircledIcon>" : "")
  );
}
