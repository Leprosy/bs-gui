const getClasses = (): string[] => {
  const list = new Set<string>();
  const csss = [...document.styleSheets];

  csss.forEach((css: CSSStyleSheet, i: number) => {
    try {
      const rules = [...css.cssRules];
      console.log("helpers.getClasses: Scanning CSS", i);

      rules.forEach((rule: CSSRule) => {
        if (rule instanceof CSSStyleRule) {
          if (rule.selectorText) {
            const matches = rule.selectorText.matchAll(/[a-z_\-0-9]*\.([a-z_\-0-9]+)/gi);
            let data = matches.next();

            while (!data.done) {
              list.add(data.value[1]);
              data = matches.next();
            }
          }
        }
      });
    } catch (e) {
      console.info("helpers.getClasses: No rules extracted from", css);
      console.warn(e);
    }
  });

  return [...list].sort();
};

export default getClasses;
