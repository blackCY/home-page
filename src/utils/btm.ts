/**
 * bem 命名生成函数
 * @param b block
 * @param e element
 * @param m modify
 */
function bem(b: string, e?: string, m?: string) {
  let result: string = b;
  if (e) result += "__" + e;
  if (m) result += "--" + m;

  return result;
}

function addActionClassName(obj?: { [name: string]: boolean | string | undefined }) {
  let actionStr = "";
  if (!obj) return "";
  for (const key in obj) {
    if (obj[key]) {
      actionStr += key + " ";
    }
  }
  return actionStr;
}

/**
 * 高阶命名生成器
 * @param blockName 快级名称
 * @example
 * ```tsx
 * const { block, actBlock } = block('bockName')
 * block('element', 'motify')
 * // 返回结果 blockName__element--motify
 * actBlock('el', 'mo')({'name1': false, 'name2': true})
 * // 返回结果 blockName__el--mo name2
 * multiBlock('el')({ key: true, key2: true })
 * // 返回结果 blockName__el--key blockName__el--key2
 * ```
 */
const genBlock = (blockName: string) => {
  /**
   * ```ts
   * block('element', 'motify')
   * // 返回结果 blockName__element--motify
   * ```
   */
  function block(e?: string, m?: string) {
    return bem(blockName, e, m);
  }

  /**
   * ```ts
   * actBlock('el', 'mo')({'name1': false, 'name2': true})
   * // 返回结果 blockName__el--mo name2
   * ```
   */
  function actBlock(e?: string, m?: string) {
    return function (obj?: { [name: string]: boolean | string | undefined }) {
      return bem(blockName, e, m) + " " + addActionClassName(obj);
    };
  }

  /**
   * ```ts
   * multiBlock('el')({ key: true, key2: true })
   * // 返回结果 blockName__el--key blockName__el--key2
   * ```
   */
  function multiBlock(e?: string) {
    return function (obj?: { [name: string]: boolean | string | undefined }) {
      let str = bem(blockName, e) + " ";
      for (const key in obj) {
        if (obj[key]) {
          str += bem(blockName, e, key) + " ";
        }
      }
      return str;
    };
  }

  return {
    /**
     * ```ts
     * block('element', 'motify')
     * // 返回结果 blockName__element--motify
     * ```
     */
    block,
    /**
     * ```ts
     * actBlock('el', 'mo')({'name1': false, 'name2': true})
     * // 返回结果 blockName__el--mo name2
     * ```
     */
    actBlock,
    /**
     * ```ts
     * multiBlock('el')({ key: true, key2: true })
     * // 返回结果 blockName__el--key blockName__el--key2
     * ```
     */
    multiBlock,
  };
};

export { bem, genBlock };
